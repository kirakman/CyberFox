import React, { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View, TextInput } from "react-native";
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

    const html = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial, sans-serif';
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f3f3f3;
          }
          .certificate-container {
            width: 80%;
            padding: 20px;
            border: 10px solid #CA7745;
            border-radius: 15px;
            background-color: white;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            background-image: url('/assets/VsnSy25aRTuBJx3-83GrKQ.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
          .certificate-title {
            font-size: 36px;
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
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="certificate-title">Certificado de Conclusão</div>
          <div class="certificate-body">
            <p>Este é para certificar que</p>
            <h1>${name}</h1>
            <p>concluiu com sucesso o curso de <strong>Cyber Fox</strong>.</p>
            <p>com o total de <strong>20 horas<strong>.</p>
          </div>
          <div class="certificate-footer">
            <p>&copy; 2024 Cyber Fox. Todos os direitos reservados.</p>
          </div>
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
            <TextInput placeholder="Nome para certificado" value={name} onChangeText={(value) => setName(value)}/>
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
});

export default Certificados;
