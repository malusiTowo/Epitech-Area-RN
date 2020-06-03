import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthLoading from '../screens/Auth/AuthLoading';
import Auth from '../screens/Auth/Auth';
import AuthCreate from '../screens/Auth/AuthCreate';
import AuthLoginPassword from '../screens/Auth/AuthLoginPassword';
import Profile from '../screens/Settings/Profile';

import Home from '../screens/Home';
import PreviewWidget from '../screens/Widgets/PreviewWidget';
import WidgetSettings from '../screens/Widgets/WidgetSettings';
import CreateWidget from '../screens/Widgets/Create/CreateWidget';
import ServiceSelection from '../screens/Widgets/Create/ServiceSelection';
import Services from '../screens/Settings/Services';
import ChangePassword from '../screens/Settings/ChangePassword';
import SyncOptions from '../screens/Settings/SyncOptions';
import ConnectPredefinedWidget from '../screens/Widgets/ConnectPredefinedWidget';
import WidgetConfigure from '../screens/Widgets/Create/WidgetConfigure';
import ConnectServer from '../screens/Auth/ConnectServer';

const AuthStack = createStackNavigator(
  {
    Auth: {
      screen: Auth,
    },
    AuthCreate: {
      screen: AuthCreate,
    },
    AuthLoginPassword: {
      screen: AuthLoginPassword
    },
  },
  {
    initialRouteName: 'Auth'
  }
);

const AppStack = createStackNavigator({
  ConnectServer: ConnectServer,
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile
  },
  PreviewWidget: {
    screen: PreviewWidget
  },
  WidgetSettings: {
    screen: WidgetSettings
  },
  CreateWidget: {
    screen: CreateWidget
  },
  ServiceSelection: {
    screen: ServiceSelection
  },
  Services: {
    screen: Services,
  },
  ChangePassword: {
    screen: ChangePassword
  },
  SyncOptions: SyncOptions,
  ConnectPredefinedWidget: ConnectPredefinedWidget,
  WidgetConfigure: WidgetConfigure,

});


const AppNavigator = createSwitchNavigator({
  AuthLoading,
  AuthStack,
  AppStack
});

export default createAppContainer(AppNavigator);