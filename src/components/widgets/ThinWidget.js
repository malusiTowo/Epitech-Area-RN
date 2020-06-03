import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const ThinWidget = (props) => {
  const preview = () => props.navigation.navigate('PreviewWidget', {
    widgetName: props.text,
    widgetIcon: props.icon,
    color: props.backgroundColor,
    serviceId: props.serviceId
  });

  return (
    <TouchableOpacity onPress={() => preview()} style={styles.container}>
      <View style={[styles.widgetWrapper, { backgroundColor: props.backgroundColor }]}>
        <View style={styles.icon}>
          {props.icon}
        </View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  widgetWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderRadius: 7,
    width: '90%'
  }
});

export default ThinWidget
