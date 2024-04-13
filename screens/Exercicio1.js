import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, StatusBar } from 'react-native';
import Modal from "react-native-modal";
import TituloExercicio from '../components/TituloExercicio';
import TituloAula from '../components/TituloAula';
import TituloQuiz from '../components/TituloQuiz';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, onValue, off } from "firebase/database";

const Exercicio1 = () => {
    const [modulo, setModulo] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalsVisibility, setModalsVisibility] = useState({
        isModalVisible1: true,
        isModalVisible2: false,
        isModalVisible3: false,
        isModalVisible4: false,
        isModalVisible5: false,
    });

    const toggleModal = (modalNumber) => {
        setModalsVisibility(prevState => ({
            ...prevState,
            [`isModalVisible${modalNumber}`]: !prevState[`isModalVisible${modalNumber}`]
        }));
    };

    useEffect(() => {
        const db = getDatabase();
        const moduloRef = ref(db, 'modulo01');

        const handleData = (snapshot) => {
            const moduloData = snapshot.val();
            setModulo(moduloData);
        };

        onValue(moduloRef, handleData);

        // Cleanup
        return () => {
            off(moduloRef, handleData);
        };
    }, []);

    const handleSubmit = (selectedQuestionIndex) => {
        const question = modulo[`pergunta0${selectedQuestionIndex + 1}`];
        if (selectedOption === question.respostaCerta) {
            Alert.alert(
                "Parabéns!",
                "Você acertou!",
                [
                    { text: "OK", onPress: () => closeModal(selectedQuestionIndex + 1) }
                ]
            );
        } else {
            Alert.alert(
                "Resposta Incorreta",
                "Por favor, tente novamente."
            );
        }
    };

    const closeModal = (questionIndex) => {
        toggleModal(questionIndex);
        setSelectedOption(null);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="#67311C" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground source={require('../assets/background_aulas_invertido.png')} style={styles.backgroundImage}>
                    <View style={{ alignItems: 'center' }}>
                        <TituloExercicio nomeExercicio={modulo ? modulo.textoModulo.titulo : "Carregando..."} onPress={() => toggleModal(1)} />
                        <Modal isVisible={modalsVisibility.isModalVisible1}>
                            <View style={{ flex: 1, backgroundColor: '#67311C', borderColor: 'white', borderRadius: 15, alignItems: 'center' }}>
                                <View style={styles.modalContainer}>
                                    <ScrollView style={{ width: '90%' }}>
                                        {modulo && Object.keys(modulo.textoModulo.txt).map((key, index) => {
                                            if (key.startsWith('paragrafo')) {
                                                return <Text style={styles.paragraph} key={index}>{modulo.textoModulo.txt[key]}</Text>;
                                            }
                                            return null;
                                        })}
                                    </ScrollView>
                                    <TouchableOpacity onPress={() => toggleModal(1)} style={styles.closeButton}>
                                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Voltar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <View style={{ flex: 1, alignItems: 'flex-start', top: '50%', gap: 15 }}>

                            {/* Quizzes */}
                            {modulo && Object.keys(modulo).map((key, index) => {
                                if (key.startsWith('pergunta')) {
                                    const questionIndex = parseInt(key.slice(-2)) - 1;
                                    const question = modulo[key];
                                    return (
                                        <View key={index}>
                                            <TituloQuiz nomeQuiz={question.enunciadoQuestao} onPress={() => toggleModal(questionIndex + 2)} />
                                            <Modal isVisible={modalsVisibility[`isModalVisible${questionIndex + 2}`]}>
                                                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderColor: 'white', borderRadius: 15 }}>
                                                    <TituloAula nomeAula={question.enunciadoQuestao} />
                                                    <Image source={require('../assets/foxCA7745.png')} style={{ resizeMode: 'contain', height: 100 }} />
                                                    <View style={styles.definicoes}>
                                                        <Text style={{ fontSize: 18 }}>{`A: ${question.respostaCerta}`}</Text>
                                                        <Text style={{ fontSize: 18 }}>{`B: ${question.respostaErrada01}`}</Text>
                                                        <Text style={{ fontSize: 18 }}>{`C: ${question.respostaErrada02}`}</Text>
                                                        <Text style={{ fontSize: 18 }}>{`D: ${question.respostaErrada03}`}</Text>
                                                    </View>
                                                    <Picker
                                                        selectedValue={selectedOption}
                                                        onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)} style={styles.pickerStyles}>
                                                        <Picker.Item label="Opção A" value={question.respostaCerta} />
                                                        <Picker.Item label="Opção B" value={question.respostaErrada01} />
                                                        <Picker.Item label="Opção C" value={question.respostaErrada02} />
                                                        <Picker.Item label="Opção D" value={question.respostaErrada03} />
                                                    </Picker>
                                                    <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(questionIndex)}>
                                                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Submeter</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => closeModal(questionIndex + 2)} style={styles.closeButton}>
                                                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Voltar</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </Modal>
                                        </View>
                                    );
                                }
                                return null;
                            })}
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
