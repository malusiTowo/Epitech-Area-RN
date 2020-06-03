import React, { useState, useContext } from 'react'
import { View, Image, TextInput, ScrollView, StyleSheet, SafeAreaView, Keyboard } from 'react-native'
import { Button, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import DialogComponent from '../../components/DialogComponent';
import { healthCheck } from '../../api/Services';
import { StoreContext } from '../../store/Context';

const SyncOptions = () => {
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
      })
      .catch(e => {
        setIsError(true);
        setIsVisible(true);
        setMessage(e.message);
      })
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: '90%' }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
          <Image
            style={{ width: 180, height: 180 }}
            source={require('../../assets/sync.png')}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.text}>Change server address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={txt => setUrl(txt)}
              placeholder="127.0.0.1:3000"
            />
          </View>
        </View>

        <Button onPress={connectServer} style={{ backgroundColor: '#000' }}>
          <Text style={{ width: '100%', textAlign: 'center' }}>Save</Text>
        </Button>

      </ScrollView>
      <DialogComponent
        isVisible={isVisible}
        closeDialog={() => setIsVisible(false)}
        title={isError ? "Error" : "Success"}
        message={message}
      />
    </SafeAreaView>
  )
}

SyncOptions.navigationOptions = ({ navigation }) => ({
  title: 'Sync Options',
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  headerStyle: {
    backgroundColor: '#fff',
    height: 150,
    borderWidth: 0,
    borderColor: '#fff'
  },
  headerLeft: () => <Ionicons onPress={() => navigation.goBack()} name="ios-arrow-back" size={40} color="black" />,
  headerLeftContainerStyle: {
    paddingLeft: 30,
    width: 300,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  inputBox: {
    display: 'flex',
    paddingLeft: 10,
    marginVertical: 10
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 3,
    paddingLeft: 5,
    width: '90%',
    marginTop: 10,
    height: 60,
    fontSize: 18,
    paddingLeft: 10,
    color: 'black'
  },
});

export default SyncOptions
