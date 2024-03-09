import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Home from './screens/Home';
import PrimaryButton from './components/PrimaryButton';

export default function App() {

  return (
    <ImageBackground 
      source={require('./assets/VsnSy25aRTuBJx3-83GrKQ.png')} style={styles.backgroundImage}>

      <View style={styles.logoContainer}>
       <Home/>
       <PrimaryButton/>
       <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Já possui uma conta?</Text>
          <TouchableOpacity>
            <Text style={styles.titleText}>Login</Text>
          </TouchableOpacity>
      </View>    
      </View>    

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover', 
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingBottom: 25
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  titleText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold', 
    marginLeft: 5,
  },
});
