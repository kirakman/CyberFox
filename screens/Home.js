import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';


const Home = () => {

    const navigation = useNavigation();

    return (
        <ImageBackground 
        source={require('../assets/VsnSy25aRTuBJx3-83GrKQ.png')} style={styles.backgroundImage}>
  
        <View style={styles.logoContainer}>
        <View style={styles.logoContainer}>
            <Image 
                source={require('../assets/7j2QCS-QTOeQwWbbzVId3w-removebg-preview.png')} 
                style={styles.logoImage}
            />
            <Image
              source={require('../assets/CyberFox.png')}
              style={{ width: 350, height: 206, bottom: 10 }}
            />
        </View>
         <PrimaryButton/>
         <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Já possui uma conta?</Text>
            <TouchableOpacity
                 onPress={()=>navigation.navigate("Login")}
            >
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
        color: 'white',
        marginBottom: -35,
    },
    secondaryText: {
        fontSize: 80,
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
      textImage: {
       width: 400,
       height: 206
      }
});

export default Home;
