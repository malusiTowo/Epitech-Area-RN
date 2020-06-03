import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'

const PreviewWidget = (props) => {
  const widgetName = props.navigation.getParam('widgetName', 'widgetName');
  const WidgetIcon = props.navigation.getParam('widgetIcon', 'widgetName');
  const color = props.navigation.getParam('color', 'widgetName');
  const serviceId = props.navigation.getParam('serviceId', 'serviceId');
  const goToSettings = () => props.navigation.navigate('WidgetSettings', {
    widgetName,
    WidgetIcon,
    color,
    serviceId
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <View style={[styles.headerBox,]}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="md-arrow-round-back" size={40} color="white" />
        </TouchableOpacity>

        <View>
          <View style={styles.iconBox}>
            {WidgetIcon}
            <Text style={styles.text}>{widgetName}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => goToSettings()}>
          <Ionicons name="ios-settings" size={30} color="white" />
        </TouchableOpacity>
      </View>


      <Text style={styles.text}>Start connecting your world.</Text>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={require('../../assets/ifttt_connections.png')} />
      </View>
    </SafeAreaView>
  )
}

PreviewWidget.navigationOptions = {
  headerShown: false
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
  },
  headerBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconBox: {
    alignItems: 'center'
  },
  text: {
    fontWeight: '800',
    fontSize: 22,
    width: '100%',
    textAlign: 'center',
    color: 'white'
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain'
  }
});


export default PreviewWidget
