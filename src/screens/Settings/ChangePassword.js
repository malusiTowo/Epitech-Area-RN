import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Button, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const ChangePassword = (props) => {
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: '90%' }}>
        <View style={styles.inputBox}>
          <Text style={styles.text} >Set new password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="New password"
              onChangeText={txt => setPwd(txt)}
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.text} >Confirm new password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={txt => setConfirmPwd(txt)}
              placeholder="Confirm password"
              secureTextEntry
            />
          </View>
        </View>
        <Button style={{ backgroundColor: '#000' }}>
          <Text style={{ width: '100%', textAlign: 'center' }} >Save</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

ChangePassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  email: PropTypes.string
};

ChangePassword.navigationOptions = ({ navigation }) => ({
  title: 'Change Password',
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
  changePwd: {
    marginTop: 5
  },
  linkedActsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10
  },

});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center'
//   },
//   inputBox: {
//     display: 'flex',
//     paddingLeft: 10,
//     marginVertical: 10
//   },
//   inputWrapper: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   input: {
//     borderRadius: 10,
//     borderColor: '#ccc',
//     borderWidth: 3,
//     paddingLeft: 5,
//     width: '90%',
//     marginTop: 10,
//     height: 60,
//     fontSize: 18,
//     paddingLeft: 10,
//     color: 'black'
//   },
//   text: {
//     color: 'black',
//     fontSize: 20,
//     fontWeight: '800',
//   },
// });
export default ChangePassword
