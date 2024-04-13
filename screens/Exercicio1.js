import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, StatusBar } from 'react-native';
import Modal from "react-native-modal";
import TituloExercicio from '../components/TituloExercicio';
import TituloAula from '../components/TituloAula';
import TituloQuiz from '../components/TituloQuiz';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, onValue, off } from "firebase/database";

const Exercicio1 = () => {
    const [isModalVisible1, setModalVisible1] = useState(true); 
    const [isModalVisible2, setModalVisible2] = useState(false); 
    const [isModalVisible3, setModalVisible3] = useState(false); 
    const [isModalVisible4, setModalVisible4] = useState(false); 
    const [isModalVisible5, setModalVisible5] = useState(false); 
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [modulo, setModulo] = useState(null);

    const toggleModal1 = () => setModalVisible1(!isModalVisible1);
    const toggleModal2 = () => setModalVisible2(!isModalVisible2);
    const closeModal2 = () => setModalVisible2(!isModalVisible2);
    const toggleModal3 = () => setModalVisible3(!isModalVisible3);
    const closeModal3 = () => setModalVisible3(!isModalVisible3);
    const toggleModal4 = () => setModalVisible4(!isModalVisible4);
    const closeModal4 = () => setModalVisible4(!isModalVisible4);
    const toggleModal5 = () => setModalVisible5(!isModalVisible5);
    const closeModal5 = () => setModalVisible5(!isModalVisible5);

    useEffect(() => {
        const db = getDatabase();
        const moduloRef = ref(db, 'modulo01');

        const handleData = (snapshot) => {
            const moduloData = snapshot.val();
            //console.log('Modulo:', moduloData)
            setModulo(moduloData);
            //console.log('Modulo:', modulo);
            //console.log('Parágrafos:', modulo && modulo.textoModulo);
        };

        onValue(moduloRef, handleData);

        // Cleanup
        return () => {
            off(moduloRef, handleData);
        };
    }, []);

    const handleSubmit = () => {
        if (selectedOption1 === "option1") {
            Alert.alert(
                "Parabéns!",
                "Você acertou!",
                [
                    { text: "OK", onPress: closeModal2 }
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
                        <TituloExercicio nomeExercicio={modulo ? modulo.textoModulo.titulo : "Carregando..."} onPress={toggleModal1} />
                        <Modal isVisible={isModalVisible1}>
                        <View style={{ flex: 1,  backgroundColor: '#67311C', borderColor: 'white', borderRadius: 15, alignItems: 'center'}}>
                            <View style={styles.modalContainer}>
                            <ScrollView style={{ width: '90%' }}>
                                {modulo && Object.keys(modulo.textoModulo.txt).map((key, index) => {
                                    if (key.startsWith('paragrafo')) {
                                        return <Text style={styles.paragraph} key={index}>{modulo.textoModulo.txt[key]}</Text>;
                                }
                                    return null;
                                })}
                            </ScrollView>

                                <TouchableOpacity onPress={toggleModal1} style={styles.closeButton}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
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
