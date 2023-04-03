import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import Contacts from '../components/Home';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Contacts">
        <Stack.Screen name="Contacts" component={Contacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
