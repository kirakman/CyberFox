import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, StatusBar } from 'react-native';
import Modal from "react-native-modal";
import TituloExercicio from '../components/TituloExercicio';
import TituloAula from '../components/TituloAula';
import TituloQuiz from '../components/TituloQuiz';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Exercicio1 = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { moduleName } = route.params;

    const [modulo, setModulo] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentModal, setCurrentModal] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState(null);
    const [answeredCorrectly, setAnsweredCorrectly] = useState([]);
    const [showCheckmark, setShowCheckmark] = useState(false);
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); //Controla o estado SE todas as 5 perguntas foram respondidas corretamente

    useEffect(() => {
        checkIfLoggedIn(); // Verifica se o usuário está logado ao montar a tela
    
        const fetchModulo = async () => {
            try {
                const db = getDatabase();
                const moduloRef = ref(db, `modulos-geral/${moduleName}`);
    
                onValue(moduloRef, (snapshot) => {
                    const moduloData = snapshot.val();
                    setModulo(moduloData);
                });
    
                // Cleanup
                return () => {
                    off(moduloRef);
                };
            } catch (error) {
                console.error("Erro ao buscar o módulo:", error);
            }
        };
    
        fetchModulo();
    }, [moduleName]);
    
    useEffect(() => {
        checkAnsweredQuestions(); // Verifica quantas questões foram respondidas corretamente ao entrar na tela
        checkIfShowCheckmark(); // Verifica se a imagem deve ser exibida
    }, [moduleName]);

    useEffect(() => {
        if (currentModal && currentModal > 1) {
            shuffleOptions();
        }
    }, [currentModal]);

    useEffect(() => {
        // Atualiza as questões respondidas corretamente no AsyncStorage sempre que a lista answeredCorrectly muda
        const updateAnsweredCorrectly = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                await AsyncStorage.setItem(`${moduleName}_${userToken}_answeredCorrectly`, JSON.stringify(answeredCorrectly));
            }
        };
        updateAnsweredCorrectly();
    }, [answeredCorrectly]);

    const shuffleOptions = () => {
        const question = modulo[`pergunta0${currentModal - 1}`];
        const options = [
            question.respostaCerta,
            question.respostaErrada01,
            question.respostaErrada02,
            question.respostaErrada03
        ];
        const shuffled = options.sort(() => Math.random() - 0.5);
        setShuffledOptions(shuffled);
    };

    const handleSubmit = async (selectedQuestionIndex) => {
        const question = modulo[`pergunta0${selectedQuestionIndex + 1}`];
        if (selectedOption === question.respostaCerta) {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                let acertos = await AsyncStorage.getItem(`${moduleName}_${userToken}_acertos`);
                acertos = acertos ? JSON.parse(acertos) : 0;
                acertos += 1;
                await AsyncStorage.setItem(`${moduleName}_${userToken}_acertos`, JSON.stringify(acertos));
                setAnsweredCorrectly(prevState => [...prevState, selectedQuestionIndex]);
    
                // Verifica se todas as perguntas foram respondidas corretamente
                if (answeredCorrectly.length === 4) {
                    setAllQuestionsAnswered(true);
                    setShowCheckmark(true);
                    AsyncStorage.setItem(`${moduleName}_${userToken}_showCheckmark`, JSON.stringify(true));
                }
            } catch (error) {
                console.error('Erro ao armazenar o acerto:', error);
            }
            Alert.alert(
                "Parabéns!",
                "Você acertou!",
                [
                    { text: "OK", onPress: () => setCurrentModal(null) }
                ]
            );
        } else {
            Alert.alert(
                "Resposta Incorreta",
                "Por favor, tente novamente."
            );
        }
    };

    const closeModal = () => {
        setCurrentModal(null);
        setSelectedOption(null);
        setShuffledOptions(null);
    };

    const checkIfLoggedIn = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
            navigation.navigate('Login'); // Redireciona para a tela de Login se não estiver logado
        }
    };

    const checkAnsweredQuestions = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const answeredQuestions = await AsyncStorage.getItem(`${moduleName}_${userToken}_answeredCorrectly`);
            if (answeredQuestions) {
                const parsedAnsweredQuestions = JSON.parse(answeredQuestions);
                setAnsweredCorrectly(parsedAnsweredQuestions);
            }
        } catch (error) {
            console.error('Erro ao verificar questões respondidas:', error);
        }
    };

    const checkIfShowCheckmark = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const showCheckmarkValue = await AsyncStorage.getItem(`${moduleName}_${userToken}_showCheckmark`);
            if (showCheckmarkValue !== null) {
                setShowCheckmark(JSON.parse(showCheckmarkValue));
            }
        } catch (error) {
            console.error('Erro ao verificar se deve mostrar a marca de verificação:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="#67311C" />
                <ImageBackground source={require('../assets/background_aulas_invertido.png')} style={styles.backgroundImage}>

                    <View style= {styles.containerTitulo}>
                        <TituloExercicio nomeExercicio={modulo ? modulo.topico01.titulo : "Carregando..."} onPress={() => setCurrentModal(1)} />
                    </View>
                    
                      {/* modal de introducao dos modulos */}
                        <Modal isVisible={currentModal === 1}>
                            <View style={{ flex: 1, backgroundColor: '#67311C', borderRadius: 15, alignItems: 'center', marginTop: "10%", marginBottom: "10%"  }}>
                                <View style={styles.modalContainer}>
                                    <ScrollView style={{ width: '90%' }}>
                                        {modulo && Object.keys(modulo).map((key, index) => {
                                            if (key.startsWith('topico')) {
                                                const topico = modulo[key];
                                                return (
                                                    <View key={index}>
                                                        <TituloAula nomeAula={topico.titulo} />
                                                        <Text style={styles.paragraph}>{topico.txt}</Text>
                                                    </View>
                                                );
                                            }
                                            return null;
                                        })}
                                    </ScrollView>
                                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Voltar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                    <View style={{flex: 1}}>

                        {/* imagem da raposa quando concluir as perguntas  */}                
                        {showCheckmark && (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: "50%" }}>
                                <Image source={require('../assets/raposacheckmark.png')} />
                            </View>
                        )}

                        {!allQuestionsAnswered && (
                            // container das questoes, container pai
                            <View style={styles.containerQuestoes}>
                            <ScrollView Style={{flex:1}}>

                                {/* Quizzes */}
                                {modulo && Object.keys(modulo).map((key, index) => {
                                    if (key.startsWith('pergunta')) {
                                        const questionIndex = parseInt(key.slice(-2)) - 1;
                                        const question = modulo[key];
                                        // Verifica se a pergunta já foi respondida corretamente
                                        if (answeredCorrectly.includes(questionIndex)) {
                                            return null; // Não exibe a pergunta
                                            }
                                            return (
                                                // container dos exerciocios 
                                                <View key={index} style={styles.questoesExercicios}>
                                                {/* Adicione a condição allQuestionsAnswered aqui */}
                                                {!allQuestionsAnswered && (
                                                    <TituloQuiz nomeQuiz={question.enunciadoQuestao} onPress={() => setCurrentModal(questionIndex + 2)} />
                                                )}
                                                {/* Adicione a condição allQuestionsAnswered aqui */}
                                                {!allQuestionsAnswered && (
                                                    <Modal isVisible={currentModal === questionIndex + 2}>
                                                        <View style={styles.modalQuestoes}>
                                                            <TituloAula nomeAula={question.enunciadoQuestao} />
                                                            <Image source={require('../assets/foxCA7745.png')} style={{ resizeMode: 'contain', height: 120, marginTop: -10  }} />
                                                        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                                                        <View style= {styles.containerPerguntaResposta}>
                                                            <View style={styles.definicoes}>
                                                                <Text style={{ fontSize: 16 }}>{`A) ${shuffledOptions ? shuffledOptions[0] : ''}`}</Text>
                                                                <Text style={{ fontSize: 16 }}>{`B) ${shuffledOptions ? shuffledOptions[1] : ''}`}</Text>
                                                                <Text style={{ fontSize: 16 }}>{`C) ${shuffledOptions ? shuffledOptions[2] : ''}`}</Text>
                                                                <Text style={{ fontSize: 16 }}>{`D) ${shuffledOptions ? shuffledOptions[3] : ''}`}</Text>
                                                            </View>

                                                            <View style={styles.modalResposta}>
                                                                    <Text style={{fontSize: 18, fontWeight: '600'}}>
                                                                        Escolha a opção correta:
                                                                    </Text>
                                                                
                                                                <Picker
                                                                    selectedValue={selectedOption}
                                                                    onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)} style={styles.pickerStyles}>
                                                                    <Picker.Item label="Opção A" value={shuffledOptions ? shuffledOptions[0] : ''} />
                                                                    <Picker.Item label="Opção B" value={shuffledOptions ? shuffledOptions[1] : ''} />
                                                                    <Picker.Item label="Opção C" value={shuffledOptions ? shuffledOptions[2] : ''} />
                                                                    <Picker.Item label="Opção D" value={shuffledOptions ? shuffledOptions[3] : ''} />
                                                                </Picker>

                                                            </View>

                                                            <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(questionIndex)}>
                                                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Responder</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Voltar</Text>
                                                            </TouchableOpacity>
                                                            </View>
                                                        </ScrollView>
                                                        </View>
                                                    </Modal>
                                                )}
                                            </View>
                                        );
                                    }
                                    return null;
                                })}
                            </ScrollView>
                            </View>
                        )}
                    </View>
                </ImageBackground>
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
        fontSize: 16,
        color: '#fff'
    },
    closeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        width: 160,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 16,
        backgroundColor: '#CA7745',
        marginTop: 12
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: 50,
        width: 160,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 16,
        backgroundColor: '#021E1F',
        marginTop: 40,
        marginBottom: 6
    },
    pickerStyles: {
        height: 50,
        width: 200,
        // marginTop: -40,
        marginBottom: 26,
        paddingVertical: 6
    },
    definicoes: {
        gap: 18,
        marginTop: 25,
        paddingBottom: 2,
        textAlign:'justify',
    },
    modalContainer:{
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom: 15,
        marginBottom: 5,
        marginTop: 1
    },
    containerPerguntaResposta:{
        alignItems: 'center',
        flexDirection:'column', 
        paddingBottom: 12,
    },
    modalResposta:{
        marginTop: 40,
        alignItems: 'center',
    },
    containerTitulo:{
        alignItems: 'center',
        marginBottom: 10,
        marginTop: "5%"
    }, 
    containerQuestoes:{
        flex: 1, 
        marginBottom: 0, 
        paddingTop: "60%"
    },
    questoesExercicios:{
        paddingLeft: 5, 
        paddingRight: 5,
        marginBottom: 15, 
        marginHorizontal: 10,
    }, 
    modalQuestoes:{
        alignItems: 'center',
        backgroundColor: 'white', 
        borderColor: 'white', 
        borderRadius: 16,
        paddingHorizontal:16,
        flexDirection:'column',
        flex: 0.9
    }
});

export default Exercicio1;
