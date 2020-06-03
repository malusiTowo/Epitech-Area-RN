import React, { useState, useContext } from 'react'
import { View, SafeAreaView, StyleSheet, TextInput, Keyboard } from 'react-native'
import { Text, Button } from 'native-base';

import DialogComponent from '../../components/DialogComponent';
import { healthCheck } from '../../api/Services';
import { StoreContext } from '../../store/Context';

const ConnectServer = (props) => {
  const [url, setUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(true);
  const { updateUrl } = useContext(StoreContext);

  const connectServer = () => {
    healthCheck(url)
      .then(response => response.json())
      .then(() => {
        setIsError(false);
        setMessage('Health check passed!')
        setIsVisible(true);
        updateUrl(url);
        Keyboard.dismiss();
        setTimeout(() => {
          props.navigation.navigate('Home');
        }, 1000);
      })
      .catch(e => {
        setIsError(true);
        setIsVisible(true);
        setMessage("Unable to connect to " + `http://${url}`);
      })
  }

  return (
    <SafeAreaView>
      <View style={styles.emailWrapper}>

        <Text style={styles.text}>Enter server address</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Server address"
            style={styles.input}
            onChangeText={txt => setUrl(txt.trim())}
          />
        </View>


        <View style={[styles.inputWrapper, { marginTop: '10%' }]}>
          <Button
            style={styles.nextBtn}
            onPress={connectServer}
          >
            <Text style={styles.nextBtnText}>Continue</Text>
          </Button>
        </View>
      </View>

      <DialogComponent
        isVisible={isVisible}
        closeDialog={() => setIsVisible(false)}
        title={isError ? "Error" : "Success"}
        message={message}
      />

    </SafeAreaView>
  )
}

ConnectServer.navigationOptions = {
  headerShown: false
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
    justifyContent: 'center',
    alignItems: 'center'
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

export default ConnectServer
