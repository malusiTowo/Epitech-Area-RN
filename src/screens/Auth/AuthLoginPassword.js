import React, { useState, useContext } from 'react'
import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { loginWithPassword } from '../../api/Auth';
import DialogComponent from '../../components/DialogComponent';
import { StoreContext } from '../../store/Context';

const AuthLoginPassword = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const { updateName } = useContext(StoreContext);

  const login = () => {
    loginWithPassword(email, password)
      .then(() => {
        updateName(email);
        props.navigation.navigate('AppStack')
      })
      .catch(e => {
        setMessage(e);
        setIsVisible(true);
      });
  }

  const goToCreateScreen = () => props.navigation.replace('AuthCreate');

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.emailWrapper}>

        <TouchableOpacity onPress={() => props.navigation.navigate('Auth')} style={styles.backBtn}>
          <Ionicons name="md-arrow-round-back" size={40} color="black" />
        </TouchableOpacity>

        <Text style={styles.text}>Welcome back! Enter your credentials</Text>


        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your email"
            style={styles.input}
            textContentType="emailAddress"
            onChangeText={txt => setEmail(txt.trim())}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your password"
            style={styles.input}
            secureTextEntry
            textContentType="password"
            onChangeText={txt => setPassword(txt.trim())}
          />

        </View>

        <View style={[styles.inputWrapper, { marginTop: '10%' }]}>
          <Button
            onPress={login}
            style={styles.nextBtn}
            disabled={password.trim().length > 0 && email.trim().length > 0 ? false : true}>
            <Text style={styles.nextBtnText}>Continue</Text>
          </Button>
        </View>
        <TouchableOpacity onPress={goToCreateScreen} style={styles.loginBtnWrapper}>
          <Text style={styles.loginText}>Don't have an account yet! Sign up</Text>
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
}

AuthLoginPassword.navigationOptions = {
  headerShown: false
};


AuthLoginPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  email: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  emailWrapper: {
    height: '100%',
    display: 'flex',
    marginTop: '10%'
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'

  },
  text: {
    color: 'black',
    fontSize: 30,
    width: '100%',
    textAlign: 'center',
    fontWeight: '800',
    marginTop: '5%',
    marginBottom: '10%'
  },
  input: {
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 3,
    paddingLeft: 5,
    width: '90%',
    marginTop: 25,
    height: 60,
    fontSize: 18,
    paddingLeft: 10,
    color: 'black'
  },
  backBtn: {
    marginLeft: '10%',
  },
  nextBtn: {
    backgroundColor: 'black',
    width: '90%',
    borderRadius: 10,
    height: 50,
  },
  nextBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  loginBtnWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
  }
});


export default AuthLoginPassword;
