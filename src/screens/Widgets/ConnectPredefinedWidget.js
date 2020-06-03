import React, { useState, useContext } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button-fix-lifecycle-hooks';

import { addService } from '../../api/Services';
import { StoreContext } from '../../store/Context'
import firebase from '../../config/firebase';

const ConnectPredefinedWidget = ({ navigation }) => {
  const [btnText, setBtnText] = useState('Slide to Connect');
  const { url } = useContext(StoreContext);
  const { color, data, text } = navigation.state.params;

  const onComplete = () => {
    if (data.reaction.serviceName === "send_email") {
      const user = firebase.auth().currentUser;
      if (user)
        data.reaction.mail = user.email;
    }

    addService(url, data.action, data.reaction)
      .then(res => {
        setBtnText('Connected');
      })
      .catch(e => {
        setBtnText('Not Connected. Try again.')
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ backgroundColor: color }, styles.widgetHeader]} >
        <Text style={styles.widgetHeaderText}>{text}</Text>
      </View>
      <View style={styles.slidinButtonWrapper}>
        <RNSlidingButton
          style={[{ backgroundColor: color }, styles.slidinButton]}
          height={60}
          onSlidingSuccess={onComplete}
          slideDirection={SlideDirection.RIGHT}>
          <View>
            <Text numberOfLines={1} style={styles.titleText}>
              {btnText}
            </Text>
          </View>
        </RNSlidingButton>
      </View>
    </SafeAreaView>
  )
}

ConnectPredefinedWidget.navigationOptions = ({ navigation }) => {
  return {
    title: 'Connect Widget',
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#fff'
    },
    headerStyle: {
      backgroundColor: navigation.state.params.color,
      height: 150,
      borderWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
    },
    headerLeft: () => <Ionicons onPress={() => navigation.goBack()} name="ios-arrow-back" size={40} color="white" />,
    headerLeftContainerStyle: {
      paddingLeft: 30,
      width: 300,
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
    color: '#ffffff'
  },
  widgetHeader: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  widgetHeaderText: {
    color: 'white',
    fontSize: 35,
    fontWeight: '900',
    width: 290
  },
  slidinButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40
  },
  slidinButton: {
    width: 280,
    borderRadius: 7,
  }
});

export default ConnectPredefinedWidget;
