import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="Home" style={{fontSize: 30, color: 'black'}} />
          ),
        }}
      />
      <Tab.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="SecondScreen" style={{fontSize: 30, color: 'black'}} />
          ),
        }}
      />

      <Tab.Screen
        name="ThirdScreen"
        component={ThirdScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="ThirdScreen" style={{fontSize: 30, color: 'black'}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
