import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, SafeAreaView, TouchableOpacity, Image, Pressable, ScrollView, StatusBar } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../services/firebaseConnection";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TertiaryButton from '../components/TertiaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(true);
  
    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            if (user.emailVerified) {
                // Salvar estado de login do usuário
                await AsyncStorage.setItem('userToken', user.email);
                
                // Verificar se há um nome de usuário associado a este email
                const userName = await AsyncStorage.getItem(`userName_${user.email}`);
                //console.log('userName:', userName); // Adiciona um log para verificar o valor de userName
    
                if (userName && userName.trim() !== '') {
                    // Se houver, navegue para a HomePage
                    //console.log('Redirecionando para HomePage');
                    navigation.navigate('HomePage');
                } else {
                    // Se não houver, navegue para a tela de Perfil para que o usuário possa inserir seu nome
                    console.log('Redirecionando para Perfil');
                    navigation.navigate('Perfil');
                }
            } else {
                Alert.alert('Erro', 'Por favor, verifique seu e-mail para fazer login.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
           <StatusBar backgroundColor="#3E8B93" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground source={require('../assets/-4reGoE9SKm8B11_KmfIwQ.png')} style={styles.backgroundImage}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/Login.png')} 
                            style={{width: 350, height: 100, top: 80}}
                        />
                    </View>
                    <View style={styles.text}>
                        <Text style={styles.textInput}>Endereço de Email</Text>
                        <View style={styles.inputs}>
                            <TextInput 
                                placeholder='Insira o seu endereço de email'
                                placeholderTextColor={'white'}
                                keyboardType='email-address'
                                color='white'
                                value={email}
                                onChangeText={value => setEmail(value)}
                                style={{textAlign: 'center'}}/>
                        </View>
                    </View>
                    <View style={styles.text}>
                        <Text style={styles.textInput}>Senha</Text>
                        <View style={styles.inputs}>
                            <TextInput 
                                placeholder='Insira sua senha'
                                placeholderTextColor={'white'}
                                secureTextEntry={isPasswordShown}
                                color='white'
                                value={password}
                                onChangeText={value => setPassword(value)}
                                style={{textAlign: 'center'}}/>
                                

                            <TouchableOpacity style={styles.icons} onPress={() => setIsPasswordShown(!isPasswordShown)}>
                                {isPasswordShown ? (
                                    <Ionicons name='eye-off' size={24} color={'white'}/>
                                ) : (
                                    <Ionicons name='eye' size={24} color={'white'}/>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.secondContainer}>
                            <View style={styles.button}>
                                <TertiaryButton onPress={login} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 120, top: 20}}>
                        <View style={styles.bar}/>
                        <Text style={{color: 'white'}}>Ou faça Login com</Text>
                        <View style={styles.bar}/>
                    </View>
                    <View style={{flexDirection: 'column', alignContent: 'center', alignItems: 'center', bottom: 50, gap: 15, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress={() => console.log("Pressionou!")}
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    height: 52,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    marginRight: 18,
                                    marginLeft: 18,
                                    borderRadius: 10
                                }}
                            >
                                <Image
                                    source={require("../assets/icons8-facebook-novo-100.png")}
                                    style={{
                                        height: 36,
                                        width: 36,
                                        marginRight: 8
                                    }}
                                    resizeMode='contain'
                                />
                                <Text style={{color: 'white'}}>Facebook</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress={() => console.log("Pressionou!")}
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    height: 52,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    marginRight: 18,
                                    marginLeft: 18,
                                    borderRadius: 10
                                }}
                            >
                                <Image
                                    source={require("../assets/icons8-google-logo-100.png")}
                                    style={{
                                        height: 36,
                                        width: 36,
                                        marginRight: 8
                                    }}
                                    resizeMode='contain'
                                />
                                <Text style={{color: 'white'}}>Google</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 22, bottom: 20 }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>Ainda não possui uma conta?</Text>
                            <Pressable onPress={() => navigation.navigate("Register")}>
                                <Text style={{ fontSize: 16, color: 'white', marginLeft: 6, fontWeight: 'bold' }}>Registrar</Text>
                            </Pressable>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    backgroundImage: {
        flex: 1,
        width: '100%', 
        height: '100%', 
        resizeMode: 'cover', 
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        fontSize: 70,
        color: 'white',
        top: 100
    },
    text: {
        top: 150,
        marginLeft: 15
    },
    textInput: {
        marginBottom: 12,
        fontSize: 16,
        marginVertical: 15,
        color: 'white'
    },
    inputs: {
        width: "95%",
        height: 48,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.4)'    
    },
    icons: {
        position: "absolute",
        right: 12
    },
    secondContainer: {
        marginVertical: 35,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 16,
        color: 'white',
        marginLeft: 1,
    },
    button: {
        top: 30,
        left: 100
    },
    bar: {
        flex: 1,
        height: 1,
        backgroundColor: 'white',
        marginHorizontal: 10
    }
});

export default Login;
