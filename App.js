import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home , Login, Register, HomePage, Modulos, Quiz, Perfil } from './screens/index';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName='HomePage'
    // initialRouteName = 'Home'
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
       <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name="Modulos"
        component={Modulos}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          headerShown:false
        }}
      />
       <Stack.Screen
        name="Perfil"
        component={Perfil}
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
