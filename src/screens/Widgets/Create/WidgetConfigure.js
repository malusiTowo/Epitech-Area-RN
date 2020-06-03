import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button-fix-lifecycle-hooks';
import { Entypo } from '@expo/vector-icons';
import { Icon, Picker, Form } from 'native-base'

import { StoreContext } from '../../../store/Context';
import DialogComponent from '../../../components/DialogComponent';

const WidgetConfigure = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(true);
  const { data, stageName } = navigation.state.params;
  const { updateActionConfig, updateReactionConfig } = useContext(StoreContext);
  const [btnText, setBtnText] = useState('Slide to Connect');
  const firstOption = data.params[0].type === 'list' ? data.params[0].options[0] : '';
  const [optionSelected, setOptionSelected] = useState(firstOption);

  const initInputs = data.params.map(({ name }) => ({ name, val: "" }));
  const [input, setInput] = useState(initInputs);

  const handleInput = (txt, nameInput) => {
    const inputTxt = txt.trim();
    const newInput = input.map(input => {
      if (input.name === nameInput) {
        return { name: input.name, val: inputTxt };
      }
      return input;
    });
    setInput(newInput);
  }

  const onComplete = () => {
    let hasError = false;
    let configuration = {};
    input.map(({ name, val }) => {
      const isList = data.params.some(param => param.name === name && param.type === 'list')
      const isNumber =
        data.params.some(param => param.name === name && param.type === 'number');
      if (name === 'checked')
        configuration[name] = false
      else if (isList)
        configuration[name] = optionSelected;
      else if (isNumber) {
        hasError = val.length === 0;
        configuration[name] = +val;
      }
      else {
        hasError = val.length === 0;
        configuration[name] = val;
      }
    });

    if (hasError) {
      setIsError(true);
      setIsVisible(true);
      setMessage("Please fill in all inputs.");
      return;
    }

    configuration.color = data.color;
    configuration.description = data.description;
    configuration.iconName = data.icon.props.name;
    configuration.name = data.name;
    configuration.text = data.title;

    if (configuration.money) {
      const moneySplit = configuration.money.split('/');
      configuration['money1'] = moneySplit[0];
      configuration['money2'] = moneySplit[1];
    }

    if (stageName === 'Actions')
      updateActionConfig(configuration);
    else
      updateReactionConfig(configuration);

    navigation.navigate('CreateWidget');

    setBtnText('Connected');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ backgroundColor: data.color }, styles.widgetHeader]} >
        <Text style={styles.widgetHeaderText}>{data.title}</Text>
        <Text style={styles.widgetSubText}>{data.description}</Text>

      </View>
      <View>
        {
          data.params.map(({ name, type, options }, idx) => {
            if (name === 'checked') return;

            return (
              <View key={idx}>
                {
                  type === 'number' || type === 'text' ? (
                    <View style={styles.inputWrapper}>
                      <TextInput
                        placeholder={name}
                        style={styles.input}
                        keyboardType={type === 'number' ? "number-pad" : "default"}
                        returnKeyType="done"
                        scrollEnabled
                        spellCheck={false}
                        clearButtonMode='while-editing'
                        onChangeText={txt => handleInput(txt, name)}
                      />
                    </View>
                  ) : (
                      <Form>
                        <Picker
                          mode="dropdown"
                          iosHeader="Select stock type"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          selectedValue={optionSelected}
                          onValueChange={val => setOptionSelected(val)}
                        >
                          {
                            options.map((option, idx) => <Picker.Item key={idx} label={option} value={option} />)
                          }
                        </Picker>
                      </Form>
                    )
                }
              </View>
            );
          })
        }
      </View>
      <View style={styles.slidinButtonWrapper}>
        <RNSlidingButton
          style={[{ backgroundColor: data.color }, styles.slidinButton]}
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
      <DialogComponent
        isVisible={isVisible}
        closeDialog={() => setIsVisible(false)}
        title={isError ? "Error" : "Success"}
        message={message}
      />
    </SafeAreaView>
  )
}

WidgetConfigure.navigationOptions = ({ navigation }) => ({
  title: 'Configuration',
  headerTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  headerStyle: {
    backgroundColor: navigation.state.params.data.color,
    height: 150,
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.pop()} style={styles.backBtn}>
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
  },
  titleText: {
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
    color: '#ffffff'
  },
  widgetHeader: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  widgetHeaderText: {
    color: 'white',
    fontSize: 35,
    fontWeight: '900',
    marginBottom: 15
  },
  widgetSubText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
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
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'

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
    color: 'black'
  },
});

export default WidgetConfigure
