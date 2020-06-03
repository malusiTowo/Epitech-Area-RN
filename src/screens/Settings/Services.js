import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { getUserServices } from '../../api/Services';
import { StoreContext } from '../../store/Context';

const Services = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [services, setServices] = useState([]);
  const { url } = useContext(StoreContext);

  const handleGetUserServices = async () => {
    try {
      const services = await getUserServices(url);
      setServices(services);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleGetUserServices();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleGetUserServices()
    setRefreshing(false);
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={false}
        style={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {
          services.map((service, idx) => (
            <View key={idx} style={[styles.listItem, { backgroundColor: service.color }]}>
              {service.icon}
              <Text style={styles.text}>{service.text || service.title}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

Services.navigationOptions = ({ navigation }) => ({
  title: 'My Services',
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
    paddingLeft: 30
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {

  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 3,
    height: 100,
  },
  text: {
    color: 'black',
    fontWeight: '700',
    fontSize: 25,
    paddingLeft: 20
  }
});

export default Services
