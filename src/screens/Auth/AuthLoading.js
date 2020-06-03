import React, { useEffect, useState } from 'react'
import { View, StatusBar, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';

import firebase from '../../config/firebase';

const AuthLoading = (props) => {
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      props.navigation.navigate('AppStack');
    }
    else {
      props.navigation.navigate('AuthStack');
    }

  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <Image style={styles.image} source={require('../../assets/ifttt_splash.png')} />
    </View>
  )
}

AuthLoading.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

export default AuthLoading
