import firebase from '../config/firebase';
import { actions } from '../config/defaultServices';

export const addService = async (url, action, reaction) => {
  try {
    const user = firebase.auth().currentUser;
    if (!user) return new Promise.reject('USER_NOT_LOGGED_IN');

    const userToken = await firebase.auth().currentUser.getIdToken();
    if (!userToken) return new Promise.reject('An error occured during the operation.');

    const endpoint = `${url}/services/add-service`;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ action, reaction, token: userToken }),
    }

    return fetch(endpoint, options);

  } catch (err) {
    return new Promise.reject('Unable to add service');
  }
}

export const removeService = async (url, serviceId) => {
  try {
    const user = firebase.auth().currentUser;
    if (!user) return new Promise.reject('USER_NOT_LOGGED_IN');

    const userToken = await firebase.auth().currentUser.getIdToken();
    if (!userToken) return new Promise.reject('An error occured during the operation.');

    const endpoint = `${url}/services/delete-service`;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ service_id: serviceId, token: userToken }),
    }

    return fetch(endpoint, options);

  } catch (err) {
    return new Promise.reject('Unable to add service');
  }
}

export const healthCheck = async url => {
  try {
    const endpoint = `http://${url}/healthcheck`
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    return fetch(endpoint, options);
  } catch (err) {
    console.log(err, "error")
    return new Promise.reject({ message: 'Unable to contact to ' + endpoint });
  }
}

export const getUserServices = async url => {
  try {
    const user = firebase.auth().currentUser;
    if (!user) return new Promise.reject('USER_NOT_LOGGED_IN');

    const userToken = await firebase.auth().currentUser.getIdToken();
    if (!userToken) return new Promise.reject('An error occured during the operation.');

    const endpoint = `${url}/services/list-service`
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ token: userToken })
    }
    return fetch(endpoint, options)
      .then(response => response.json())
      .then(({ services }) => {
        const servicesArr = [];
        services.map(({ action, id }) => {
          const act = actions.find(({ name }) => name === action.name || action.serviceName);
          if (act)
            servicesArr.push({ ...action, ...act, id });
        });
        return new Promise.resolve(servicesArr);
      })
      .catch(e => {
        console.log(e);
        return new Promise.reject("testing");
      })
  } catch (err) {
    console.log(err, "error")
    return new Promise.reject('Unable to contact the server.');
  }
}

export const addDeviceId = async (deviceId, url) => {
  const user = firebase.auth().currentUser;
  if (!user) return new Promise.reject('USER_NOT_LOGGED_IN');

  const userToken = await firebase.auth().currentUser.getIdToken();
  if (!userToken) return new Promise.reject('An error occured during the operation.');

  const endpoint = `${url}/token/add-expo-token`
  console.log("end", endpoint);
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      token: userToken,
      expo_token: deviceId
    })
  }
  return fetch(endpoint, options);
}