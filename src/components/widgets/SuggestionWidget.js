import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const SuggestionWidget = (props) => {

  const goToPredefinedWidget = () => {
    props.closeRbSheet();
    setTimeout(() => {
      props.navigation.navigate('ConnectPredefinedWidget', {
        color: props.backgroundColor,
        data: props.data,
        text: props.text,
      });
    }, 500);
  }

  return (
    <TouchableOpacity onPress={goToPredefinedWidget} style={styles.container}>
      <View style={[{ backgroundColor: props.backgroundColor }, styles.widgetWrapper]}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
        <View style={styles.iconsWrapper}>
          <View >{props.iconOne}</View>
          <View style={{ marginHorizontal: 10 }} >{props.iconTwo}</View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textWrapper: {
    margin: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 20
  },
  iconsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  widgetWrapper: {
    width: '95%',
    borderRadius: 7,
  }
});

export default SuggestionWidget
