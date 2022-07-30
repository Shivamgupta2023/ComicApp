import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './Screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SecondScreen from './Screens/SecondScreen';
import ThirdScreen from './Screens/ThirdScreen';
// import NewScreen from './Screens/NewScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
        {/* <Stack.Screen name= "NewScreen" components={NewScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
