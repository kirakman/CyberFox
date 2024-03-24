import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text } from "react-native";
import ModulosQuiz from "../components/modulosQuiz/ModulosQuiz";
   {/* ver se nao vai apresentar erro o indicador e o botao */}
import IndicadorTela from "../components/indicadorTela/IndicadorTela"
import IniciarQuiz from "../components/botaoQuiz/BotaoQuiz";


const Quiz = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/BackgroundHomePage.png")}
          style={styles.backgroundImage}
        >
          {/* ver se nao vai apresentar erro o indicador */}
          <IndicadorTela nomeTela= "Quiz"></IndicadorTela>

          {/* ver se nao vai apresentar erro os modulos do quiz, e olha os componentes que ta chamando */}
          <ModulosQuiz tituloQuiz= "Quiz - Modulo 1">
            <IniciarQuiz iconQuiz= "unlock"></IniciarQuiz>
          </ModulosQuiz>

          <ModulosQuiz tituloQuiz = "Quiz - modulo 2 ">
          <IniciarQuiz iconQuiz= "lock"></IniciarQuiz>
          </ModulosQuiz>

        </ImageBackground>
      </SafeAreaView>
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
export default Quiz;