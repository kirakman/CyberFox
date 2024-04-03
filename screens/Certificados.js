import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
   {/* ver se nao vai apresentar erro o indicador e o botao */}
import IndicadorTela from "../components/indicadorTela/IndicadorTela"
import IniciarQuiz from "../components/botaoQuiz/BotaoQuiz";

import ModulosCertificados from "../components/modulosCertificados";


const Certificados = () => {
    return (
    <View style={{ flex: 1}}>
      <SafeAreaView  style={{ flex: 1}}>
        <ImageBackground
          source={require("../assets/BackgroundHomePage.png")}
          style={styles.backgroundImage}
        >
          {/* ver se nao vai apresentar erro o indicador */}
          <IndicadorTela nomeTela= "Certificados"></IndicadorTela>

          {/* ver se nao vai apresentar erro os modulos do quiz, e olha os componentes que ta chamando */}
          <ModulosCertificados tituloQuiz= "Certificado - Modulo 1">
            <IniciarQuiz iconQuiz= "unlock"></IniciarQuiz>
          </ModulosCertificados>

          <ModulosCertificados tituloQuiz = "Certificado - modulo 2 ">
          <IniciarQuiz iconQuiz= "lock"></IniciarQuiz>
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