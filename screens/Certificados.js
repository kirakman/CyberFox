import React, { useEffect } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View, Alert, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import IndicadorTela from "../components/indicadorTela/IndicadorTela";
import BotaoCertificado from "../components/BotaoCertificado";
import ModulosCertificados from "../components/modulosCertificados";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';

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

    const generatePDF = async () => {
      if (Platform.OS === 'android') {
        const granted = await requestExternalStoragePermission();
        if (!granted) {
          return;
        }
      }

      let options = {
        html: `
          <h1>Certificado - Cyber Fox</h1>
          <p>Este é um certificado de exemplo.</p>
        `,
        fileName: 'certificado',
        directory: 'Documents',
      };

      try {
        let file = await RNHTMLtoPDF.convert(options);
        Alert.alert("Sucesso", `PDF gerado em: ${file.filePath}`);
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível gerar o PDF.");
      }
    };

    const requestExternalStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Permissão para acessar o armazenamento",
            message: "Este aplicativo precisa de acesso ao seu armazenamento para salvar PDFs.",
            buttonNeutral: "Perguntar depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert("Permissão negada", "Não foi possível obter a permissão para acessar o armazenamento.");
          return false;
        }
      } catch (err) {
        console.warn(err);
        Alert.alert("Erro", "Ocorreu um erro ao solicitar a permissão.");
        return false;
      }
    };

    return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/BackgroundHomePage.png")}
          style={styles.backgroundImage}
        >
          <IndicadorTela nomeTela="Certificado" />

          <ModulosCertificados tituloQuiz="Certificado - Cyber Fox">
            <BotaoCertificado iconQuiz="unlock" onGeneratePDF={generatePDF} />
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
});

export default Certificados;
