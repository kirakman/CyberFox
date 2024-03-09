import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Home from './screens/Home';

export default function App() {

  return (
    <ImageBackground 
      source={require('./assets/VsnSy25aRTuBJx3-83GrKQ.png')} 
      style={styles.backgroundImage}
    >

      <View style={styles.logoContainer}>
       <Home/>
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  logoImage: {
    width: 250,
    height: 250,
  },
   primaryText: {
    fontSize: 50,
    fontFamily: 'modern-rebel',
    color: 'white',
  },
   secondaryText: {
    fontSize: 50,
    fontFamily: 'modern-rebel',
    color: '#CA7745',
  },
  primaryButton: {
    fontSize: 40,
    color: 'white', 
  }
});
