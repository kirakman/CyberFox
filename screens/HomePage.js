import React from 'react';
import { ImageBackground, StyleSheet, View, Text, SafeAreaView, Image} from 'react-native';

import ModulosCurso from '../components/modulosCurso/ModulosCurso';
import BotaoContinuar from '../components/botaoContinuar/BotaoContinuar';





const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/BackgroundHomePage.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Text style={styles.Textheader}>Seja bem vindo</Text>
          <Image
            source={require("../assets/fotoDePerfil.png")}
            style={styles.fotoPerfil}
          ></Image>
        </View>

        <View // Container do progresso do curso
          style={{
            backgroundColor: "rgba(2, 30, 31, 0.5)", // cor do container de fundo
            height: "20%",
            width: "90%",
            marginTop: "10%",
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <View style={styles.containerProgresso}>
            <Text style={styles.textoProgressoCurso}>Progresso do curso</Text>
          </View>
        </View>

        {/* chamando o modulo */}

        <ModulosCurso tituloModulo= " Modulo 1" nomeCurso="Introdução a Cibersegurança">
          <BotaoContinuar></BotaoContinuar>
        </ModulosCurso>
        
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
  header: {
    backgroundColor: "#021E1F",
    width: "90%",
    height: 90,
    marginTop: "10%",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  Textheader: {
    color: "#FFFFFF",
    fontSize: 25,
    marginLeft: 10,
  },
  fotoPerfil: {
    height: 60,
    width: 60,
  },
  containerProgresso: {
    backgroundColor: "#CA7745",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  textoProgressoCurso: {
    color: "#000000",
    fontWeight: '700',
    fontSize: 28,
  },
 
 
});

export default HomePage;
