import Axios from 'axios';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import { AuthSession } from 'expo';
import { AsyncStorage } from 'react-native';

import firebase from '../config/firebase';
import {
  GOOGLE_ANDROID_CLIENT_ID_STAND,
  GOOGLE_IOS_CLIENT_ID_STAND,
  GOOGLE_IOS_CLIENT_EXPO,
  GOOGLE_ANDROID_CLIENT_EXPO,
  GITHUB_KEY,
  GITHUB_SECRET,
  WEB_KEY,
  WEB_SECRET
} from '../config/providers';
import { addDeviceId } from './Services';

export const checkUser = async navigation => {
  if (firebase.auth().currentUser) return navigation.navigate('AppStack');
  return navigation.navigate('AuthStack');
};

/**
 * Method to log the user with email and password
 * @param {String} email email of user
 * @param {String} password password of user
 */
export const loginWithPassword = async (email, password) => {
  try {
    if (!email || !password)
      return new Promise.reject('Invalid data provided');

    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    return new Promise.resolve(user);
  } catch ({ code }) {
    let message = 'An error occured during the operation.';

    if (code === 'auth/user-not-found')
      message = 'This email is not associated with a user.';
    if (code === 'auth/wrong-password')
      message = 'The combination of credentials are incorrect.';
    if (code === 'auth/invalid-email')
      message = 'The email provided is invalid.';

    return new Promise.reject(message);
  }
};

/**
 * Method to create user and log the user in with email and password
 * @param {String} email email of user
 * @param {String} password password of user
 */
export const createUserWithPassword = async (email, password) => {
  try {
    if (!email || !password)
      return new Promise.reject('Invalid data provided');

    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return new Promise.resolve(user);
  } catch ({ code }) {
    let message = 'An error occured during the operation.';

    if (code === 'auth/email-already-in-use')
      message = 'This email is already associated with a user.';
    if (code === 'auth/operation-not-allowed')
      message = 'Email authentication is not allowed at the moment.';
    if (code === 'auth/weak-password')
      message = 'The password provided is not strong enough.';
    if (code === 'auth/invalid-email')
      message = 'The email provided is invalid.';

    return new Promise.reject(message);
  }
}

/**
 * Method to log the user in with Google in apk env
 */
export const loginWithGoogleStandAlone = async (updateName, updateProfileImage) => {
  try {
    // if (firebase.auth().currentUser) logout();
    const configGoogleInit = {
      clientId: GOOGLE_IOS_CLIENT_ID_STAND,
      isOfflineEnabled: true,
      webClientId: WEB_KEY
    };
    let data = await GoogleSignIn.initAsync(configGoogleInit);
    console.log(data);

  } catch (err) {
    console.log(err);
  }

  try {

    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();

    if (type === 'success') {
      fetch(
        `https://oauth2.googleapis.com/token?code=${user.serverAuthCode}&client_id=${WEB_KEY}&client_secret=${WEB_SECRET}&grant_type=authorization_code`,
        {
          method: 'POST',
        }
      )
        .then(response => response.json())
        .then(async ({ access_token, idToken }) => {

          const credential = firebase.auth.GoogleAuthProvider.credential(idToken, access_token);
          await firebase.auth().signInWithCredential(credential);

          const userInfo = firebase.auth().currentUser;

          updateName(userInfo.displayName || userInfo.email);
          updateProfileImage(userInfo.photoURL);
        });
    }
  } catch ({ code }) {
    console.log(code)
    let message = 'An error occured during the operation.';

    if (code === "-3")
      message = 'Operation cancelled';
    if (code === 'auth/account-exists-with-different-credential')
      message = 'This email is already associated with a user.';

    return new Promise.reject(message);
  }
}

/**
 * Method to log the user in with Google in expo env
 */
export const loginGoogleExpo = async (updateName, updateProfileImage, serverUrl) => {
  try {
    // if (firebase.auth().currentUser) {
    //   logout();
    //   // return new Promise.resolve('LOGGED_IN_ALREADY');
    // }

    const config = {
      iosClientId: GOOGLE_IOS_CLIENT_EXPO,
      androidClientId: GOOGLE_ANDROID_CLIENT_EXPO,
      scopes: ['email', 'profile'],
    };

    const { type, accessToken, idToken } = await Google.logInAsync(config);

    if (type !== 'success') return new Promise.reject('SIGNIN_CANCEL');

    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    await firebase.auth().signInWithCredential(credential);
    const user = firebase.auth().currentUser;
    updateName(user.displayName || user.email);
    updateProfileImage(user.photoURL);

    return new Promise.resolve('LOGGED_IN');
  } catch ({ code }) {
    let message = 'An error occured during the operation.';

    if (code === "-3")
      message = 'Operation cancelled';
    if (code === 'auth/account-exists-with-different-credential')
      message = 'This email is already associated with a user.';

    return new Promise.reject(message);
  }
};

/**
 * Method to log the user in with Github
 */
export const loginWithGithub = async (updateName, updateProfileImage, serverUrl) => {
  try {
    // if (firebase.auth().currentUser) {
    //   logout()
    //   // return new Promise.resolve('LOGGED_IN_ALREADY');
    // }

    const redirectUrl = AuthSession.getRedirectUrl();
    const url = 'https://github.com/login/oauth/authorize';
    const authorizeUrl = 'https://github.com/login/oauth/access_token';

    const { type, params } = await AuthSession.startAsync({
      authUrl: `${url}` +
        `?client_id=${GITHUB_KEY}` +
        `&scope=user,repo` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    if (type !== 'success') return new Promise.reject('Operation cancelled');

    const { status, data } = await Axios
      .post(`${authorizeUrl}?client_id=${GITHUB_KEY}&client_secret=${GITHUB_SECRET}&code=${params.code}`);

    if (status !== 200) return new Promise.reject('Unable to authenticate with Github.');

    const token = data.split('&')[0].split('=')[1];
    const credential = firebase.auth.GithubAuthProvider.credential(token);
    let userInfo = await firebase.auth().signInWithCredential(credential);
    const user = userInfo.user;
    userInfo = userInfo.additionalUserInfo;

    if (!user) throw new Error('NO_USER');
    updateProfileImage(user.photoURL);
    updateName(userInfo.profile.login || user.displayName || user.email);

    return new Promise.resolve(user);

  } catch (err) {
    const code = err.code;
    let message = 'An error occured during the operation.';

    if (code === "-3")
      message = 'Operation cancelled';
    if (code === 'auth/account-exists-with-different-credential')
      message = 'This email is already associated with a user.';

    return new Promise.reject(message);
  }
}

/**
 * Method to get device Id for push notifications
 */
export const getDeviceId = async (url) => {
  try {
    const value = await AsyncStorage.getItem('expo_token_set');
    if (!value)
      await AsyncStorage.setItem('expo_token_set', 'true');
    if (value)
      return;
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted')
      return new Promise.reject('Notification permission was not granted.');

    const token = await Notifications.getExpoPushTokenAsync();
    const res = await addDeviceId(token, url);
    return new Promise.resolve(token);

  } catch (err) {
    return new Promise.reject('Error while retrieving the device token for notifications.');
  }
}

/**
 * Method to log the user out
 */
export const logout = async () => {
  await firebase.auth().signOut();
}

export const sendPasswordResetEmail = async email => {

}