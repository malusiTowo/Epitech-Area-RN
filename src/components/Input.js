import React from 'react'
import { View, StyleSheet } from 'react-native'

const Input = (props) => {
  return (
    <View
      {...props.inputWrapper}
      style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        {...props.input}
        onChangeText={txt => props.onChangeText(txt)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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

export default Input
