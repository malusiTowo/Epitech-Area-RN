import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import DialogComponent from '../../components/DialogComponent'
import { StoreContext } from '../../store/Context';
import { removeService } from '../../api/Services';

const WidgetSettings = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(true);
  const { url } = useContext(StoreContext);

  const widgetName = props.navigation.getParam('widgetName', 'widgetName');
  const widgetIcon = props.navigation.getParam('WidgetIcon', 'widgetName');
  const color = props.navigation.getParam('color', 'widgetName');
  const serviceId = props.navigation.getParam('serviceId', 'widgetName');

  const handleRemoveService = async () => {
    try {
      await removeService(url, serviceId);
      setIsError(false);
      setMessage('Service remove successfuly!')
      setIsVisible(true);
      setTimeout(() => {
        props.navigation.navigate('Home');
      }, 400);
    } catch (err) {
      setIsError(true);
      setIsVisible(true);
      setMessage("Unable to remove service at this time.");
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={{ backgroundColor: '#fff', marginTop: '10%', flex: 1 }} >
        <View style={[styles.headerBox, { backgroundColor: color }]}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="md-arrow-round-back" size={40} color="white" />
          </TouchableOpacity>

          <View style={styles.iconBoxWrapper}>
            <View style={styles.iconBox}>
              {widgetIcon}
            </View>
            <Text style={styles.mainText} >{widgetName}</Text>
          </View>

        </View>
        <View style={styles.settings}>
          <Text style={styles.subtext}>Account Info</Text>
          <View style={styles.statusWrapper}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#ccc', marginRight: 10 }}>Status</Text>
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#000' }} >Active</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleRemoveService} style={{ marginTop: 150 }}>
          <Text style={[styles.subtext, { width: '100%', textAlign: 'center' }]}>Remove</Text>
        </TouchableOpacity>
      </View>

      <DialogComponent
        isVisible={isVisible}
        closeDialog={() => setIsVisible(false)}
        title={isError ? "Error" : "Success"}
        message={message}
      />

    </View>
  )
}

WidgetSettings.navigationOptions = {
  headerShown: false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    display: 'flex',
    backgroundColor: 'tomato',
    height: '40%'
  },
  iconBoxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  iconBox: {
    alignItems: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    marginTop: 20
  },
  subtext: {
    fontWeight: '700',
    color: 'black',
    fontSize: 22,
    marginBottom: 20
  },
  settings: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomColor: "#ddd",
    borderBottomWidth: 2,
    padding: 20
  },
  statusWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  backBtn: {
    // position: 'absolute',
    marginLeft: 20,
    marginTop: 20
  }
});


export default WidgetSettings
