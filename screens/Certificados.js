import React, { useEffect } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import IndicadorTela from "../components/indicadorTela/IndicadorTela"
import IniciarQuiz from "../components/botaoQuiz/BotaoQuiz";
import ModulosCertificados from "../components/modulosCertificados";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Certificados = () => {
    const navigation = useNavigation();

    useEffect(() => {
      checkIfLoggedIn(); // Verifica se o usuário está logado ao montar a tela
    }, []); 

    const checkIfLoggedIn = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        navigation.navigate('Login'); // Redireciona para a tela de Login se não estiver logado
      }
    };

    return (
    <View style={{ flex: 1}}>
      <SafeAreaView  style={{ flex: 1}}>
        <ImageBackground
          source={require("../assets/BackgroundHomePage.png")}
          style={styles.backgroundImage}
        >
          <IndicadorTela nomeTela= "Certificado"></IndicadorTela>

          <ModulosCertificados tituloQuiz= "Certificado - Cyber Fox">
            <IniciarQuiz iconQuiz= "unlock"></IniciarQuiz>
          </ModulosCertificados>

        </ImageBackground>
      </SafeAreaView>
    </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        flexDirection: "column",
        alignItems: "center",
      },
})
export default Certificados;
