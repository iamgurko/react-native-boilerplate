import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, YellowBox } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import {
  Icon,
  Button,
  Header,
  Left,
  Body,
  Right,
  Title,
  Item,
  Input
} from 'native-base';

import Login from './screens/Login';
import Home from './screens/Home';
import CarCreate from './screens/CarCreate';
import CarEdit from './screens/CarEdit';
import StockQuery from "./screens/StockQuery";
import StockResult from "./screens/StockResult";
import LoginNew from "./screens/login/index";

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import colors from './styles/colors';




const MainScreen = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    CarCreate: {
      screen: CarCreate,
      navigationOptions: {
        title: 'Oluştur',
      }
    },
      StockQuery: {
          screen: StockQuery,
          navigationOptions: {
              headerStyle: {
                  backgroundColor: colors.default,
                  elevation: 0
              },
              title: 'Stok Sorgu',
          }
      },
      StockResult: {
          screen: StockResult,
          navigationOptions: {
              headerStyle: {
                  backgroundColor: colors.default,
                  elevation: 0
              },
              title: 'Sorgu Sonuç',
          }
      },
    CarEdit: {
      screen: CarEdit,
      navigationOptions: {
          headerStyle: {
              backgroundColor: colors.default,
              elevation: 0
          },
        title: 'Düzenle',
      }
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.default,
        elevation: 0
      },
      headerTintColor: colors.white,
    }
  }
);

export default createSwitchNavigator(

  {
    AuthLoading: AuthLoadingScreen,
    App: MainScreen,
    Auth: createStackNavigator(
    {
      Login: {
        screen: LoginNew,
      }
    },
        {
            headerMode: 'none'
        }
        )
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
