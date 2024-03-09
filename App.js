import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';
import * as Font from 'expo-font';

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'modern-rebel': require('./assets/fonts/MBFModernRebel.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // Renderizar algo enquanto a fonte está sendo carregada
  }

  return (
    <ImageBackground 
      source={require('./assets/VsnSy25aRTuBJx3-83GrKQ.png')} 
      style={styles.backgroundImage}
    >

      <View style={styles.logoContainer}>
        <Image 
          source={require('./assets/7j2QCS-QTOeQwWbbzVId3w-removebg-preview.png')} 
          style={styles.logoImage}
        />
        <Text style={styles.primaryText}>CYBER</Text>
        <Text style={styles.secondaryText}>FOX</Text>
      </View>

      <View style={styles.primaryButton}>
        <Button>Teste</Button>
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
