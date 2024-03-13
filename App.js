import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home , Login, Register } from './screens/index';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName = 'Home'
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown:false
        }}

      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown:false
        }}

      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown:false
        }}

      />
    </Stack.Navigator>
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  
});
