import React, { useState, useContext } from 'react'
import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { createUserWithPassword } from '../../api/Auth';
import DialogComponent from '../../components/DialogComponent';
import { StoreContext } from '../../store/Context';

const AuthLogin = ({ navigation }) => {
  const { updateName } = useContext(StoreContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const create = () => {
    // TODO - create user
    createUserWithPassword(email, password)
      .then(() => {
        updateName(email);
        navigation.navigate('AppStack')
      })
      .catch(e => {
        setMessage(e);
        setIsVisible(true);
      });
  }

  const goToLogin = () => navigation.navigate('AuthLoginPassword');

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.emailWrapper}>

        <TouchableOpacity onPress={() => navigation.navigate('Auth')} style={styles.backBtn}>
          <Ionicons name="md-arrow-round-back" size={40} color="black" />
        </TouchableOpacity>

        <Text style={styles.text}>Welcome to the IFTTT family!</Text>


        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your email"
            textContentType="emailAddress"
            style={styles.input}
            onChangeText={txt => setEmail(txt.trim())}
          />

        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your password"
            style={styles.input}
            textContentType="newPassword"
            secureTextEntry
            onChangeText={txt => setPassword(txt.trim())}
          />

        </View>
        <Button transparent style={{ marginTop: '5%' }}>
          <Text style={styles.forgotPwd}>Forgot your password?</Text>
        </Button>

        <View style={[styles.inputWrapper, { marginTop: '10%' }]}>
          <Button
            onPress={create}
            style={styles.nextBtn}
            disabled={email.trim().length > 0 && password.trim().length > 0 ? false : true}>
            <Text style={styles.nextBtnText}>Sign up!</Text>
          </Button>
        </View>
        <TouchableOpacity onPress={goToLogin} style={styles.loginBtnWrapper}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>

      </View>

      <DialogComponent
        isVisible={isVisible}
        closeDialog={() => setIsVisible(false)}
        title="Error"
        message={message}
      />

    </SafeAreaView>
  )
}

AuthLogin.navigationOptions = {
  headerShown: false
};

AuthLogin.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
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
  },
  forgotPwd: {
    color: 'black',
    width: '100%',
    textAlign: 'center',
    fontWeight: '700',
    height: 30
  },
});


export default AuthLogin
