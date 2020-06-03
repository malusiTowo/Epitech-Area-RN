import React, { useContext } from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Text, Thumbnail } from 'native-base'
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { logout } from '../../api/Auth';
import { StoreContext } from '../../store/Context';

const Profile = (props) => {
  const { name, profileImage } = useContext(StoreContext);
  const signOut = () => {
    logout();
    props.navigation.navigate('AuthStack');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>

        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.cancelBtn}>
          <Entypo name="cross" size={45} color="black" />
        </TouchableOpacity>

        <View style={styles.profileImage}>
          {
            profileImage ?
              <Thumbnail style={{ width: 100, height: 100 }} source={{ uri: profileImage }} /> : <Thumbnail source={require('../../assets/profile.png')} style={{ width: 100, height: 100 }} />
          }
        </View>

        <Text style={styles.userHandleText}>{name}</Text>

      </View>

      <ScrollView >
        <Button onPress={() => props.navigation.navigate('Services')} style={styles.settingsBtn}>
          <Text style={styles.settingsBtnText}>My Services</Text>
        </Button>
        <Button onPress={() => props.navigation.navigate('SyncOptions')} style={styles.settingsBtn}>
          <Text style={styles.settingsBtnText}>Sync Options</Text>
        </Button>
        <Button onPress={signOut} style={styles.settingsBtn}>
          <Text style={styles.settingsBtnText}>Sign Out</Text>
        </Button>

      </ScrollView>


    </SafeAreaView>
  )
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  userName: PropTypes.string
};

Profile.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    flex: 1
  },
  headerBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '50%',
    borderBottomColor: '#eee',
    borderBottomWidth: 3
  },
  userHandleText: {
    color: 'black',
    fontSize: 25,
    fontWeight: '800',
    width: '100%',
    textAlign: 'center'
  },
  activityBtnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: '10%'
  },
  activityBtn: {
    backgroundColor: 'white',
    borderColor: '#eee',
    borderWidth: 3,
    width: '40%',
    borderRadius: 25
  },
  activityBtnText: {
    color: 'black'
  },
  cancelBtn: {
    marginLeft: '10%',
  },
  profileImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '10%'
  },
  settingsBtn: {
    backgroundColor: 'white',
    height: 60
  },
  settingsBtnText: {
    color: 'black',
    fontWeight: '900',
    fontSize: 30,
    paddingLeft: '14%'
  },

});

export default observer(Profile);
