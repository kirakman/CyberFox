// Exercicio1.js

import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, StatusBar } from 'react-native';
import Modal from "react-native-modal";
import TituloExercicio from '../components/TituloExercicio';
import TituloAula from '../components/TituloAula';
import TituloQuiz from '../components/TituloQuiz';
import { Picker } from '@react-native-picker/picker';

const Exercicio1 = () => {
    const [isModalVisible1, setModalVisible1] = useState(true); 
    const [isModalVisible2, setModalVisible2] = useState(false); 
    const [isModalVisible3, setModalVisible3] = useState(false); 
    const [isModalVisible4, setModalVisible4] = useState(false); 
    const [isModalVisible5, setModalVisible5] = useState(false); 

    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };

    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };

    const closeModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };

    const closeModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const toggleModal4 = () => {
        setModalVisible4(!isModalVisible4);
    };

    const closeModal4 = () => {
        setModalVisible4(!isModalVisible4);
    };
    const toggleModal5 = () => {
        setModalVisible5(!isModalVisible5);
    };

    const closeModal5 = () => {
        setModalVisible5(!isModalVisible5);
    };

    const [selectedOption1, setSelectedOption1] = useState(null);

    const handleSubmit = () => {
        if (selectedOption1 === "option1") {
            Alert.alert(
                "Parabéns!",
                "Você acertou!",
            [
                {
                    text: "OK",
                    onPress: () => {
                        closeModal2();
                    }
                }
            ]
        );
        } else {
            Alert.alert(
                "Opção incorreta",
                "Por favor, tente novamente."
             
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="#67311C" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground source={require('../assets/background_aulas_invertido.png')} style={styles.backgroundImage}>
                    <View style={{alignItems: 'center'}}>
                        <TituloExercicio nomeExercicio="Módulo 1: Introdução a Cibersegurança" style={{alignItems: 'center'}} onPress={toggleModal1}/>
                        <Modal isVisible={isModalVisible1}>
                            <View style={{ flex: 1,  backgroundColor: '#67311C', borderColor: 'white', borderRadius: 15, alignItems: 'center'}}>
                                <ScrollView style={{ width: '90%' }}>
                                    <TituloAula nomeAula="O que é Phishing?"/>
                                    <Text style={styles.paragraph}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius eros eget enim aliquet, ac hendrerit orci volutpat. Sed convallis velit nec libero vestibulum, sit amet feugiat lacus vulputate. Fusce a magna eros. Proin nec consectetur sapien. Duis vel diam eget ex convallis vulputate. Cras congue mi eu libero ultricies, ut cursus odio vehicula. Integer condimentum eleifend malesuada. Sed placerat mi a odio malesuada, et convallis velit bibendum. Duis nec ligula in odio ultrices fringilla. Curabitur ac felis nec nulla posuere consequat. Pellentesque in arcu nunc.
                                    </Text>
                                    <TituloAula nomeAula="Onde é aplicado o Phishing?"/>
                                    <Text style={styles.paragraph}>
                                        Morbi non est in justo dapibus tempor. Mauris vel tortor sed leo accumsan convallis vel a elit. Aliquam id magna libero. Vestibulum finibus ligula a felis lacinia, ut accumsan leo vehicula. Nullam finibus tempus erat, sit amet mattis ex blandit id. Donec non tempor libero. Pellentesque non magna vitae ligula dapibus lacinia. Nullam ac eros odio. Maecenas laoreet odio quis eleifend efficitur. Phasellus vitae est a nisi malesuada blandit. Nulla facilisi.
                                    </Text>
                                    <TituloAula nomeAula="Como identificar o Phishing via E-mail?"/>
                                    <Text style={styles.paragraph}>
                                        Praesent id odio vel felis commodo eleifend nec eget lorem. Nam fermentum purus sed vehicula volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam suscipit velit ut justo fermentum, ac vestibulum neque sodales. Ut commodo arcu id posuere convallis. Proin vel elit faucibus, pharetra lorem sit amet, placerat libero. Aenean ut accumsan leo, non pharetra magna. Nam rhoncus rhoncus vestibulum. Nulla sit amet tortor nisi. Sed consectetur, ante sed ultrices fringilla, quam odio varius lorem, sed luctus orci magna nec nisi. Etiam rutrum enim nec orci fermentum, id bibendum lacus pharetra. Sed ac efficitur velit, sit amet fringilla justo.
                                    </Text>
                                    <TituloAula nomeAula="Evitando o Phishing..."/>
                                    <Text style={styles.paragraph}>
                                        Duis at congue felis. Praesent sagittis tristique nulla nec lacinia. Vivamus suscipit auctor massa, id fringilla orci posuere in. Fusce vulputate mi ut diam pharetra, id bibendum ex dictum. Curabitur sed nisl sit amet nunc tempus tempor a ac neque. Integer at leo sed magna faucibus commodo. Curabitur euismod enim eget ex pretium, et dictum ipsum aliquet. Phasellus nec vestibulum elit. Nulla luctus vehicula augue, ac tempor lorem pharetra a. Vivamus dictum, dolor vel ullamcorper volutpat, odio ligula auctor velit, nec gravida ipsum quam ut libero. Vivamus condimentum nunc nec mauris fringilla, in volutpat metus tristique. Sed ullamcorper, mauris a varius mattis, urna purus laoreet dolor, eu laoreet elit ante at sem. Donec venenatis, lorem nec interdum tincidunt, metus arcu sollicitudin libero, et bibendum eros libero a justo. In hac habitasse platea dictumst. Ut efficitur scelerisque magna, nec dictum sapien consequat in. Sed hendrerit malesuada turpis, at tincidunt nisl elementum a. Sed sed eros nec libero placerat convallis.
                                    </Text>
                                </ScrollView>
                                <TouchableOpacity onPress={toggleModal1} style={styles.closeButton}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <View style={{ flex: 1, alignItems: 'flex-start', top: '50%', gap: 15}}>

                            {/* Primeira pergunta */}
                            <View>
                            <TituloQuiz nomeQuiz="O que é Phishing?" onPress={toggleModal2}/>
                            <Modal isVisible={isModalVisible2}>
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderColor: 'white', borderRadius: 15}}>
                            <TituloAula nomeAula="O que é Phishing?"/>
                            <Image source={require('../assets/foxCA7745.png')}
                                    style={{resizeMode: 'contain', height: 200}}
                            />
                        
                            <View style={styles.definicoes}>
                                <Text style={{fontSize: 18}}>A: Um ataque que tenta roubar informações pessoais, como números de cartão de crédito e senhas, fingindo ser legítimo.</Text>
                                <Text style={{fontSize: 18}}>B: Uma técnica para cultivar algas marinhas.</Text>
                                <Text style={{fontSize: 18}}>C: Desenvolver habilidades de pescaria recreativa em áreas marinhas protegidas.</Text>
                                <Text style={{fontSize: 18}}>D: Um jogo de RPG.</Text>
                            </View>

                            <Picker
                                selectedValue={selectedOption1}
                                onValueChange={(itemValue, itemIndex) => setSelectedOption1(itemValue)} style={styles.pickerStyles}>
                                <Picker.Item label="Opção A" value="option1" />
                                <Picker.Item label="Opção B" value="option2" />
                                <Picker.Item label="Opção C" value="option3" />
                                <Picker.Item label="Opção D" value="option4" />
                            </Picker>

                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Submeter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal2} style={styles.closeButton}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Voltar</Text>
                            </TouchableOpacity>
                            </View>
                            </Modal>
                            </View>

                            {/* Segunda pergunta */}
                            <View>
                            <TituloQuiz nomeQuiz="Onde é aplicado o Phishing?" onPress={toggleModal3}/>
                            <Modal isVisible={isModalVisible3}>
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderColor: 'white', borderRadius: 15}}>
                            <TituloAula nomeAula="Onde é aplicado o Phishing?"/>
                            <TouchableOpacity onPress={closeModal3} style={styles.closeButton}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Voltar</Text>
                            </TouchableOpacity>
                            </View>
                            </Modal>
                            </View>

                            {/* Terceira pergunta */}
                            <View>
                            <TituloQuiz nomeQuiz="Como identificar o Phishing via E-mail?" onPress={toggleModal4}/>
                            <Modal isVisible={isModalVisible4}>
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderColor: 'white', borderRadius: 15}}>
                            <TituloAula nomeAula="Como identificar o Phishing via E-mail?"/>
                            <TouchableOpacity onPress={closeModal4} style={styles.closeButton}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Voltar</Text>
                            </TouchableOpacity>
                            </View>
                            </Modal>
                            </View>

                            {/* Quarta pergunta */}
                            <View>
                            <TituloQuiz nomeQuiz="Evitando o Phishing..." onPress={toggleModal5}/>
                            <Modal isVisible={isModalVisible5}>
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderColor: 'white', borderRadius: 15}}>
                            <TituloAula nomeAula="Evitando o Phishing..."/>
                            <TouchableOpacity onPress={closeModal5} style={styles.closeButton}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Voltar</Text>
                            </TouchableOpacity>
                            </View>
                            </Modal>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    paragraph: {
        textAlign: 'justify',
        marginBottom: 10,
        fontSize: 15,
        color: '#fff'
    },
    closeButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        width: 160,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        backgroundColor: '#CA7745',
        marginTop: 20
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        width: 160,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        backgroundColor: '#021E1F',
        marginTop: 20
    },
    pickerStyles: {
        height: 50,
        width: 200,
        marginTop: 20,
        marginBottom: 20
      },
      definicoes: {
        gap: 16,
        marginTop: 25,
        paddingBottom: 25
      }
});

export default Exercicio1;
