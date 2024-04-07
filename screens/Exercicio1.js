// Exercicio1.js

import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import TituloExercicio from '../components/TituloExercicio';
import TituloAula from '../components/TituloAula';
import TituloQuiz from '../components/TituloQuiz';

const Exercicio1 = () => {
    const [isModalVisible, setModalVisible] = useState(true); 

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground source={require('../assets/background_aulas_invertido.png')} style={styles.backgroundImage}>
                    <View style={{alignItems: 'center'}}>
                        <TituloExercicio nomeExercicio="Módulo 1: Introdução a Cibersegurança" style={{alignItems: 'center'}} onPress={toggleModal}/>
                        <Modal isVisible={isModalVisible}>
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderColor: 'white', borderRadius: 15}}>
                                <ScrollView style={{ width: '90%' }}>
                                    <TituloAula nomeAula="O que é Pishing?"/>
                                    <Text style={styles.paragraph}>
                                        {'\u2022'} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius eros eget enim aliquet, ac hendrerit orci volutpat. Sed convallis velit nec libero vestibulum, sit amet feugiat lacus vulputate. Fusce a magna eros. Proin nec consectetur sapien. Duis vel diam eget ex convallis vulputate. Cras congue mi eu libero ultricies, ut cursus odio vehicula. Integer condimentum eleifend malesuada. Sed placerat mi a odio malesuada, et convallis velit bibendum. Duis nec ligula in odio ultrices fringilla. Curabitur ac felis nec nulla posuere consequat. Pellentesque in arcu nunc.
                                    </Text>
                                    <TituloAula nomeAula="Onde é aplicado o Pishing?"/>
                                    <Text style={styles.paragraph}>
                                        {'\u2022'} Morbi non est in justo dapibus tempor. Mauris vel tortor sed leo accumsan convallis vel a elit. Aliquam id magna libero. Vestibulum finibus ligula a felis lacinia, ut accumsan leo vehicula. Nullam finibus tempus erat, sit amet mattis ex blandit id. Donec non tempor libero. Pellentesque non magna vitae ligula dapibus lacinia. Nullam ac eros odio. Maecenas laoreet odio quis eleifend efficitur. Phasellus vitae est a nisi malesuada blandit. Nulla facilisi.
                                    </Text>
                                    <TituloAula nomeAula="Como identificar o Pishing via E-mail?"/>
                                    <Text style={styles.paragraph}>
                                        {'\u2022'} Praesent id odio vel felis commodo eleifend nec eget lorem. Nam fermentum purus sed vehicula volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam suscipit velit ut justo fermentum, ac vestibulum neque sodales. Ut commodo arcu id posuere convallis. Proin vel elit faucibus, pharetra lorem sit amet, placerat libero. Aenean ut accumsan leo, non pharetra magna. Nam rhoncus rhoncus vestibulum. Nulla sit amet tortor nisi. Sed consectetur, ante sed ultrices fringilla, quam odio varius lorem, sed luctus orci magna nec nisi. Etiam rutrum enim nec orci fermentum, id bibendum lacus pharetra. Sed ac efficitur velit, sit amet fringilla justo.
                                    </Text>
                                    <TituloAula nomeAula="Evitando o Pishing..."/>
                                    <Text style={styles.paragraph}>
                                        {'\u2022'} Duis at congue felis. Praesent sagittis tristique nulla nec lacinia. Vivamus suscipit auctor massa, id fringilla orci posuere in. Fusce vulputate mi ut diam pharetra, id bibendum ex dictum. Curabitur sed nisl sit amet nunc tempus tempor a ac neque. Integer at leo sed magna faucibus commodo. Curabitur euismod enim eget ex pretium, et dictum ipsum aliquet. Phasellus nec vestibulum elit. Nulla luctus vehicula augue, ac tempor lorem pharetra a. Vivamus dictum, dolor vel ullamcorper volutpat, odio ligula auctor velit, nec gravida ipsum quam ut libero. Vivamus condimentum nunc nec mauris fringilla, in volutpat metus tristique. Sed ullamcorper, mauris a varius mattis, urna purus laoreet dolor, eu laoreet elit ante at sem. Donec venenatis, lorem nec interdum tincidunt, metus arcu sollicitudin libero, et bibendum eros libero a justo. In hac habitasse platea dictumst. Ut efficitur scelerisque magna, nec dictum sapien consequat in. Sed hendrerit malesuada turpis, at tincidunt nisl elementum a. Sed sed eros nec libero placerat convallis.
                                    </Text>
                                </ScrollView>
                                <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <View style={{ flex: 1, alignItems: 'flex-start', top: '100%', gap: 15}}>
                            <TituloQuiz nomeQuiz="O que é Pishing?"/>
                            <TituloQuiz nomeQuiz="Onde é aplicado o Pishing?"/>
                            <TituloQuiz nomeQuiz="Como identificar o Pishing via E-mail?"/>
                            <TituloQuiz nomeQuiz="Evitando o Pishing..."/>
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
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 15
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
    }
});

export default Exercicio1;
