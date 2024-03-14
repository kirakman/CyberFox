import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';


const Register = () => {

    // const [fontLoaded, setFontLoaded] = useState(false); 

    // useEffect(() => {
    //     async function loadFont() {
    //         await Font.loadAsync({
    //             'modern-rebel': require('../assets/fonts/MBFModernRebel.ttf'),
    //         });
    //         setFontLoaded(true);
    //     }
    //     loadFont();
    // }, []);

    // if (!fontLoaded) {
    //     return null; 
    // }

    const navigation = useNavigation();

  return (
    <ImageBackground 
        source={require('../assets/-4reGoE9SKm8B11_KmfIwQ.png')} style={styles.backgroundImage}>

        <View style={styles.logoContainer}>
            <Text style={styles.primaryText}>Registrar</Text>
        </View>
        <View style={styles.text}>
            <Text style={styles.textInput}>Endereço de Email</Text>
        </View>

      </ImageBackground>
  )
  
  };


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
    primaryText: {
        fontSize: 70,
        // fontFamily: 'modern-rebel',
        color: 'white',
        bottom: 250
    },
    text: {
        marginBottom: 12
    },
    textInput: {
        marginBottom: 12,
        fontSize: 16,
        // fontWeight: 400,
        marginVertical: 8,
        color: 'white'
    },
});

export default Register;