import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Image, StatusBar, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import { Button, Text, Spinner } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av'
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

import {
  loginWithGoogleStandAlone,
  loginGoogleExpo,
  loginWithGithub,
} from '../../api/Auth';
import DialogComponent from '../../components/DialogComponent';
import { StoreContext } from '../../store/Context';

const Auth = (props) => {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const { updateName, updateProfileImage, url } = useContext(StoreContext);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        Roboto: require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setIsReady(true);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadFonts();
  }, []);

  const loginWithGoogle = () => {
    const { navigation } = props;

    if (Constants.appOwnership === 'expo') {
      loginGoogleExpo(updateName, updateProfileImage)
        .then(() => {
          navigation.navigate('AppStack')
        })
        .catch(e => {
          if (e !== 'Operation cancelled') {
            setMessage(e);
            setIsVisible(true);
          }
        })
    }
    else {
      loginWithGoogleStandAlone(updateName, updateProfileImage)
        .then(() => navigation.navigate('AppStack'))
        .catch(() => setIsVisible(true))
    }
  }

  const loginGithub = async () => {
    const { navigation } = props;
    loginWithGithub(updateName, updateProfileImage)
      .then(data => {
        navigation.navigate('AppStack')
      })
      .catch(e => {
        console.log(e);
        if (e !== 'Operation cancelled') {
          setMessage(e);
          setIsVisible(true);
        }
      });

  }

  const goToCreate = () => props.navigation.navigate('AuthCreate');

  return (
    !isReady ? (
      <Spinner color="black" />
    ) : (

        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
          <Image style={styles.logo} source={require('../../assets/ifttt_logo.png')} />

          <View style={styles.videoWrapper} >
            <Video
              source={require('../../assets/connection_video.mp4')}
              isMuted
              shouldPlay
              isLooping
              rate={1.0}
              style={styles.videoBox}
            />
          </View>

          <View style={styles.loginBox}>

            <View style={styles.centerTextWrapper} >
              <Text style={styles.centerText}>Sign in with</Text>
            </View>

            <View style={styles.buttonWrapper}>
              <Button
                style={[styles.btn, { backgroundColor: '#DB4437' }]}
                onPress={loginWithGoogle}
              >
                <Text style={styles.btnText}>Google</Text>
              </Button>
              <Button
                style={[styles.btn, { backgroundColor: '#3b5998' }]}
                onPress={loginGithub}
              >
                <Text style={styles.btnText}>Github</Text>
              </Button>
            </View>

            <TouchableOpacity style={[styles.centerTextWrapper, { height: 20 }]}
              onPress={goToCreate}>
              <Text style={styles.centerText}>or Use Email</Text>
            </TouchableOpacity>

          </View>
          <DialogComponent
            isVisible={isVisible}
            closeDialog={() => setIsVisible(false)}
            title="Error"
            type="error"
            message={message}
          />
        </SafeAreaView>
      )
  )
}

Auth.navigationOptions = {
  headerShown: false,
};

Auth.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'cover',
    marginTop: 30,
    marginLeft: 25
  },
  loginBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 25
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15
  },
  btn: {
    borderRadius: 28,
    marginRight: 15,
    width: 150,
    height: 60
  },
  btnText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 20,
    textAlign: 'center',
    width: '100%'
  },
  centerTextWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  centerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  videoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    flex: 1,
    height: '100%',
    width: '100%'
  },
  videoBox: {
    flex: 1,
    width: 350,
    height: 350
  }
});

export default Auth;
