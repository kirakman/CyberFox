import React, { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View, TextInput, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import IndicadorTela from "../components/indicadorTela/IndicadorTela";
import BotaoCertificado from "../components/BotaoCertificado";
import ModulosCertificados from "../components/modulosCertificados";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

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

    let [name, setName] = useState("");

    const imageUri = Image.resolveAssetSource(require('../assets/background-certificado.jpg')).uri;

    const html = `

  <html>
  <head>
    <style>
      body {
        font-family: 'Arial, sans-serif';
        margin: 0;
        padding: 0;
        background-color: #f3f3f3;
        overflow: hidden; 
      }
      .all-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
      }
      .certificate-container {
        width: 100%;
        text-align: center;
        position: relative; 
        z-index: 1; 
        margin: 0; 
        top: 50%; 
        transform: translateY(-50%);
      }
      .certificate-title {
        font-size: 40px;
        font-weight: bold;
        color: #333;
      }
      .certificate-body {
        margin-top: 20px;
        font-size: 18px;
        line-height: 1.5;
        color: #555;
      }
      .certificate-footer {
        margin-top: 30px;
        font-size: 16px;
        color: #777;
      }
      .certificate-image {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;
      }
    </style>
  </head>
  <body>
    <div class="certificate-container">
      <div class="certificate-body">
        <h1 class="certificate-title">CERTIFICADO DE CONCLUSÃO</h1>
        <p>Parabéns ao aluno(a)</p>
        <h1>${name}</h1>
        <p>concluiu com sucesso o curso de <strong>Cyber Fox</strong>.</p>
        <p>com o total de <strong>20 horas<strong>.</p>
      </div>
      <div class="certificate-footer">
        <p>&copy; 2024 Cyber Fox. Todos os direitos reservados.</p>
      </div>
    </div>
    <div class="all-container">
      <img src="${imageUri}" alt="background" class="certificate-image">
    </div>
  </body>
</html>

    `;
    

    let generatePdf = async () => {
      const file = await Print.printToFileAsync({
        html: html,
        base64: false
      });

      await Sharing.shareAsync(file.uri);
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
            <TextInput placeholder="Nome para o certificado" value={name} onChangeText={(value) => setName(value)} style={styles.input}/>
            <BotaoCertificado onPress={generatePdf} title="Gerar Certificado"/>
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
  input: {
    width: '90%',
    textAlign: 'center',
    color: '#ffff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CA7745',
    borderRadius: 15,
    marginBottom: 15
  }
});

export default Certificados;
