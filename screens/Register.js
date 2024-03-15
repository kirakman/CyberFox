import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import SecondaryButton from '../components/SecondaryButton';


const Register = () => {
    const navigation = useNavigation();
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setChecked] = useState(false);

    return (

    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground source={require('../assets/-4reGoE9SKm8B11_KmfIwQ.png')} style={styles.backgroundImage}>
            <View style={styles.logoContainer}>
                    <Image
                     source={require('../assets/Cadastro.png')} 
                     style={{width: 350, height: 80, top: 80}}
                    />
                     
            </View>
                <View style={styles.text}>
                    <Text style={styles.textInput}>Endereço de Email</Text>
                    <View style={styles.inputs}>
                        <TextInput
                            placeholder='Insira o seu melhor email'
                            placeholderTextColor={'white'}
                            keyboardType='email-address'
                            color='white'/>
                    </View>
                </View>
                <View style={styles.text}>
                    <Text style={styles.textInput}>Número de Celular</Text>
                    <View style={styles.inputs}>
                        <TextInput 
                            placeholder='Insira o número do seu celular'
                            placeholderTextColor={'white'}
                            keyboardType='numeric'
                            color='white'
                            />
                    </View>
                </View>
                <View style={styles.text}>
                    <Text style={styles.textInput}>Senha</Text>
                    <View style={styles.inputs}>
                        <TextInput 
                            placeholder='Insira sua senha'
                            placeholderTextColor={'white'}
                            secureTextEntry={isPasswordShown}
                            color='white'/>

                            <TouchableOpacity style={styles.icons}
                            onPress={() => setIsPasswordShown (!isPasswordShown)}
                            >
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name='eye-off' size={24} color={'white'}/>
                                       ) : (
                                        <Ionicons name='eye' size={24} color={'white'}/>
                                        )
                                }
                                
                            </TouchableOpacity>
                    </View>
                    <View style={styles.secondContainer}>
                        <View style={styles.section}>
                            <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? '#000' : undefined}
                            />
                            <Text style={styles.paragraph}>Concordo com os termos e condições de uso e privacidade.</Text>
                        </View>
                        <View style={styles.button}>
                            <SecondaryButton/>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 120}}>
                    <View style={styles.bar}/>
                    <Text style={{color: 'white'}}>Ou cadastre com</Text>
                    <View style={styles.bar}/>
                </View>
                <View style={{flexDirection: 'column', alignContent: 'center', alignItems: 'center', bottom: 100, gap: 15, justifyContent: 'center'}}>
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
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 22,
                    bottom: 30
                }}>
                    <Text style={{fontSize: 16, color: 'white'}}>Já possui uma conta?</Text>
                    <Pressable onPress={() =>navigation.navigate("Login")}>
                        <Text style={{
                            fontSize: 16,
                            color: 'white',
                            marginLeft: 6,
                            fontWeight: 'bold'
                        }}>Login</Text>
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
        marginLeft: 15,
    },
    textInput: {
        marginBottom: 12,
        fontSize: 16,
        marginVertical: 15,
        color: 'white',
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

export default Register;
