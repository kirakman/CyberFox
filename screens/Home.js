import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import PrimaryButton from '../components/PrimaryButton';


const Home = () => {

    const [fontLoaded, setFontLoaded] = useState(false); 

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'modern-rebel': require('../assets/fonts/MBFModernRebel.ttf'),
            });
            setFontLoaded(true);
        }
        loadFont();
    }, []);

    if (!fontLoaded) {
        return null; 
    }

    return (
        <ImageBackground 
        source={require('../assets/VsnSy25aRTuBJx3-83GrKQ.png')} style={styles.backgroundImage}>
  
        <View style={styles.logoContainer}>
        <View style={styles.logoContainer}>
            <Image 
                source={require('../assets/7j2QCS-QTOeQwWbbzVId3w-removebg-preview.png')} 
                style={styles.logoImage}
            />
            <Text style={styles.primaryText}>CYBER</Text>
            <Text style={styles.secondaryText}>FOX</Text>
        </View>
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
        marginBottom: -30,
    },
    primaryText: {
        fontSize: 80,
        fontFamily: 'modern-rebel',
        color: 'white',
        marginBottom: -35,
    },
    secondaryText: {
        fontSize: 80,
        fontFamily: 'modern-rebel',
        color: '#CA7745',
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

export default Home;
