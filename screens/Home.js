import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';

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
        <View style={styles.logoContainer}>
            <Image 
                source={require('../assets/7j2QCS-QTOeQwWbbzVId3w-removebg-preview.png')} 
                style={styles.logoImage}
            />
            <Text style={styles.primaryText}>CYBER</Text>
            <Text style={styles.secondaryText}>FOX</Text>
        </View>
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
    }
});

export default Home;
