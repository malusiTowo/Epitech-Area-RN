import React, { useRef, useState, useContext, useEffect } from 'react'
import { View, ScrollView, StyleSheet, TextInput, StatusBar, Image, RefreshControl, Dimensions } from 'react-native'
import { Button, Text } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import RBSheet from "react-native-raw-bottom-sheet";
import { observer } from 'mobx-react';
const { width } = Dimensions.get('screen');

import defaultServices from '../config/defaultServices';
import ThinWidget from '../components/widgets/ThinWidget';
import SuggestionWidget from '../components/widgets/SuggestionWidget';
import { StoreContext } from '../store/Context';
import { getUserServices } from '../api/Services';
import { getDeviceId } from '../api/Auth'

const Home = (props) => {
  const [defaultWidgets, setDefaultWidgets] = useState(defaultServices);
  const [refreshing, setRefreshing] = useState(false);
  const [services, setServices] = useState([]);
  const { name, url } = useContext(StoreContext);

  const handleGetUserServices = async () => {
    try {
      const services = await getUserServices(url);
      setServices(services);
    } catch (err) {
      console.log("err", err);
    }
  }

  const handleSendDeviceId = async () => {
    try {
      await getDeviceId(url);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleSendDeviceId();
    handleGetUserServices();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleGetUserServices()
    setRefreshing(false);
  }, [refreshing]);
  let RbSheet = useRef(null);


  const closeRbSheet = () => RbSheet.close();

  const goToCreateWidget = async () => {
    closeRbSheet();
    setTimeout(() => {
      props.navigation.navigate('CreateWidget')
    }, 500);
  }

  const searchWidget = txt => {
    const input = txt.trim().toLowerCase();
    if (input.length === 0) return setDefaultWidgets(defaultServices);

    const widgets = defaultServices.filter(({ title }) => title.toLowerCase().search(input) > -1);
    setDefaultWidgets(widgets);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 130,
        alignItems: 'center',
        width: '100%',
        marginTop: 10
      }} >
        <Image style={{ width: 140, height: 70, marginLeft: 20 }} source={require('../assets/ifttt_logo.png')} />
        <Text style={{ fontSize: 20, fontWeight: '500', marginRight: 20 }}
          onPress={() => props.navigation.navigate('Profile')} >
          {name ? name : 'Settings'}
        </Text>
      </View>

      <ScrollView
        horizontal={false}
        style={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {
          services.map((service, idx) => (
            <View key={idx} style={styles.listItem}>
              <ThinWidget
                icon={service.icon}
                text={service.text || service.title}
                backgroundColor={service.backgroundColor || service.color || 'red'}
                navigation={props.navigation}
                serviceId={service.id}
              />
            </View>
          ))
        }

      </ScrollView>

      <View style={styles.btnWrapper}>
        <Button onPress={() => RbSheet.open()} style={styles.btn}>
          <Text style={styles.btnText}>Get more</Text>
        </Button>
      </View>

      <RBSheet
        ref={ref => RbSheet = ref}
        height={600}
        animationType="fade"
        closeOnDragDown
        customStyles={{
          container: styles.rbSheetContainer,
          wrapper: styles.rbSheetWrapper,
          draggableIcon: styles.rbSheetDragIcon
        }}
      >
        <ScrollView>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Search"
              style={styles.input}
              placeholderTextColor="#ddd"
              onChangeText={searchWidget}
            />
          </View>
          <View style={styles.diyWrapper}>
            <Text style={styles.diyText}>Make your own Applets from scratch</Text>
            <Button onPress={goToCreateWidget} style={styles.diyBtn}>
              <Entypo name="plus" size={25} color="white" />
            </Button>
          </View>

          {
            defaultWidgets.map(({ title, iconOne, iconTwo, color, data }, idx) => {
              return (
                <View style={styles.rbListItem} key={idx}>
                  <SuggestionWidget
                    closeRbSheet={closeRbSheet}
                    navigation={props.navigation}
                    text={title}
                    iconOne={iconOne}
                    iconTwo={iconTwo}
                    backgroundColor={color}
                    data={data}
                  />
                </View>
              )
            })
          }

        </ScrollView>
      </RBSheet>
    </View>
  )
}

Home.navigationOptions = ({ navigation }) => ({
  headerShown: false,
});


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    flex: 1,
  },
  listItem: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  btnWrapper: {
    backgroundColor: 'black',
    height: 120,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: 'grey',
    borderRadius: 25,
    marginTop: 20,
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    width: 150,
    textAlign: 'center'
  },
  // behind of modal
  rbSheetWrapper: {
  },
  // background of modal
  rbSheetContainer: {
    // paddingTop: 20
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  rbSheetDragIcon: {
    backgroundColor: 'black'
  },
  rbListItem: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  diyWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width - 20,
  },

  diyText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'black',
    padding: 20,
  },
  diyBtn: {
    backgroundColor: 'black',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 35,
    alignSelf: 'center'
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 3,
    paddingLeft: 5,
    width: '90%',
    marginTop: 25,
    height: 60,
    fontSize: 18,
    paddingLeft: 10,
    color: 'black',
    fontWeight: 'bold'
  },
})

export default observer(Home);
