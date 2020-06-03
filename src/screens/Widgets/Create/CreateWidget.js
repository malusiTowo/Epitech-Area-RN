import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import PropTypes from 'prop-types';
import { observer } from 'mobx-react'
import { ConfirmDialog } from 'react-native-simple-dialogs';

import { StoreContext } from '../../../store/Context'
import { addService } from '../../../api/Services';

const CreateWidget = ({ navigation }) => {
  const { actionConfig, reactionConfig, url, updateActionConfig, updateReactionConfig } = useContext(StoreContext);
  const [isFirstStage, setIsFirstStage] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (actionConfig)
      setIsFirstStage(false);
    if (actionConfig && reactionConfig) {
      setIsVisible(true);
      console.log(actionConfig, reactionConfig);
    }
  }, [actionConfig, reactionConfig]);

  const handleAddService = async () => {
    try {
      const serviceStatus = await addService(url, actionConfig, reactionConfig);
      handleResetWidgetCreate();
    } catch (err) {
      setIsError(true);
      setIsVisible(true);
      setMessage("Unable to add service at this time.");
      console.log(err)
    }
  }

  const handleResetWidgetCreate = () => {
    updateActionConfig('');
    updateReactionConfig('');
    setIsVisible(false);
    setIsFirstStage(true);
    console.log(actionConfig, reactionConfig);
  }

  const goToConfigure = stage => {
    navigation.navigate('ServiceSelection', {
      stageName: stage,
      setStage: setIsFirstStage
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="light-content" />

      <View style={{ flexDirection: 'column', alignItems: 'center', height: '50%' }}>
        <Text style={styles.text}>If</Text>
        {
          isFirstStage ? (
            <TouchableOpacity
              onPress={() => goToConfigure('Actions')}
              style={styles.activeTextWrapper}>
              <MaterialIcons name="add-box" size={70} color="black" />
              <Text style={styles.activeText}>This</Text>
            </TouchableOpacity>
          ) : (
              <Text style={styles.text}>This</Text>
            )
        }

        <Text style={styles.text}>Then</Text>
        {
          !isFirstStage ? (
            <TouchableOpacity
              onPress={() => goToConfigure('Reactions')}
              style={styles.activeTextWrapper}>
              <MaterialIcons name="add-box" size={70} color="black" />
              <Text style={styles.activeText}>That</Text>
            </TouchableOpacity>
          ) : (
              <Text style={styles.text}>That</Text>
            )
        }
      </View>
      <ConfirmDialog
        title={isError ? "Error" : "Activate Service"}
        message={message ? message : "Click Yes to activate service."}
        visible={isVisible}
        onTouchOutside={() => setIsVisible(false)}
        positiveButton={{
          title: "YES",
          onPress: () => handleAddService()
        }}
        negativeButton={{
          title: "NO",
          onPress: () => handleResetWidgetCreate()
        }}
      />
    </View>
  )
}
CreateWidget.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
  email: PropTypes.string
};

CreateWidget.navigationOptions = ({ navigation }) => ({
  title: 'Create your own',
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  headerStyle: {
    backgroundColor: '#000',
    height: 150,
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
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    fontWeight: '900',
    fontSize: 70,
    width: '100%',
    paddingLeft: '30%'
  },
  activeText: {
    color: '#ddd',
    fontWeight: '900',
    fontSize: 70,
    width: '100%',
  },
  activeTextWrapper: {
    paddingLeft: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

});

export default observer(CreateWidget);