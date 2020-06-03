import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons'

const { width } = Dimensions.get('screen');

import {
  actions,
  reactions
} from '../../../config/defaultServices';

const ServiceSelection = ({ navigation }) => {
  const { stageName, setStage } = navigation.state.params;
  const initialState = stageName === 'Actions' ? actions : reactions;
  const [data, setData] = useState(initialState);

  const handleSetup = idx => {
    navigation.navigate('WidgetConfigure', { data: data[idx], stageName });
  }

  const handleSearch = txt => {
    setStage(true);
    const input = txt.trim().toLowerCase();
    if (input.length === 0) return setData(initialState);

    const searchResponse = data.filter(({ title }) => title.toLocaleLowerCase().search(input) > -1);
    setData(searchResponse);
  }

  return (
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Search services"
            placeholderTextColor="#ccc"
            onChangeText={handleSearch}
          />
        </View>
        <View style={styles.serviceWrapper}>
          {
            data && data.map((d, idx) => (
              <TouchableOpacity onPress={() => handleSetup(idx)} key={idx}
                style={[styles.service, { backgroundColor: d.color }]}>
                {d.icon}
                <Text style={styles.text} >{d.title}</Text>
              </TouchableOpacity>
            ))
          }

        </View>
      </ScrollView>

    </View>
  )
}

ServiceSelection.navigationOptions = ({ navigation }) => ({
  title: 'Create your own',
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  headerStyle: {
    backgroundColor: '#000',
    height: 150,
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
      <Entypo name="cross" size={40} color="white" />
    </TouchableOpacity>
  ),
  headerLeftContainerStyle: {
    paddingLeft: 30,
    width: 300,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: '#000',
    borderWidth: 3,
    paddingLeft: 5,
    width: '90%',
    marginTop: 10,
    height: 60,
    fontSize: 18,
    paddingLeft: 10,
    color: '#000'
  },
  serviceWrapper: {
    flexDirection: 'row',
    marginTop: 15,
    flexWrap: 'wrap',
    // width: '98%',
  },
  service: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    height: 150,
    width: width / 3
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center'
  }
})
export default ServiceSelection
