import React from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import IndicadoTela from "../components/indicadorTela/IndicadorTela";

// ficar atentento que pode aparecer erro nessa importacao 
import ModulosCurso from "../components/modulosCurso/ModulosCurso";
import IniciarCurso from "../components/botaoInicarCurso/InicarCurso";


const Modulos = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/BackgroundHomePage.png")}
          style={styles.backgroundImage}
        >
          <IndicadoTela nomeTela="Módulos"></IndicadoTela>

          <ScrollView style={{ flex: 1}}>

            <ModulosCurso tituloModulo="Módulo 1" nomeCurso="Introdução a Cibersegurança">
              <IniciarCurso icon="unlock"></IniciarCurso>
            </ModulosCurso>

            <ModulosCurso tituloModulo="Módulo 2" nomeCurso="Tipos de ataques">
              <IniciarCurso icon="lock"></IniciarCurso>
            </ModulosCurso>

            <ModulosCurso tituloModulo="Módulo 3" nomeCurso="Decidir módulos">
              <IniciarCurso icon="lock"></IniciarCurso>
            </ModulosCurso>
            <ModulosCurso tituloModulo="Módulo 4" nomeCurso="Decidir módulos">
              <IniciarCurso icon="lock"></IniciarCurso>
            </ModulosCurso>
            <ModulosCurso tituloModulo="Módulo 5" nomeCurso="Decidir módulos">
              <IniciarCurso icon="lock"></IniciarCurso>
            </ModulosCurso>
            <ModulosCurso tituloModulo="Módulo 6" nomeCurso="Decidir módulos">
              <IniciarCurso icon="lock"></IniciarCurso>
            </ModulosCurso>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
        backgroundImage: {
            flex:1,
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            flexDirection: "column",
            alignItems: "center",
          },
    })
 


export default Modulos;