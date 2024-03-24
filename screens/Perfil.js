import React, { useState } from "react";
import {Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import IndicadoTela from "../components/indicadorTela/IndicadorTela";
import BotaoCertificado from "../components/botaoCertificado/BotaoCertificado";
import BotaoSair from "../components/botaoSair/BotaoSair";



const Perfil = ()=>{
     const [nomeUsuario, setNomeUsuario] = useState("Usuario");
     const [novoNome, setNovoNome] = useState("")

    const atualizarNome = ()=>{
        setNomeUsuario(novoNome);
        setNovoNome("");
    }

    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/BackgroundHomePage.png")}
          style={styles.backgroundImage}
        >
          <IndicadoTela nomeTela="Perfil"></IndicadoTela>

          <View style={styles.containerPerfil}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Image
                source={require("../assets/fotoDePerfil.png")}
                style={styles.fotoPerfil}
              ></Image>
              <Text style={styles.nomeUsuario}>{nomeUsuario}</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Text style = {styles.textoInput}>Nome de usuario</Text>
              <TextInput
                style={styles.inputTexto}
                placeholder="Nome de usuario"
                placeholderTextColor="#000000"
                value={novoNome}
                onChangeText={(text) => setNovoNome(text)}
              />

              <View style={styles.containerBotaoSalvar}>
                <TouchableOpacity
                  style={styles.botaoSalvar}
                  onPress={atualizarNome}
                >
                  <Text style={styles.nomeBotaoSalvar}>Salvar</Text>
                </TouchableOpacity>
              </View>

            </View>

            
            <View
              style={{
                flexDirection: "column"
              }}
            >
              <Text style = {styles.textoInput}>Meus certificados</Text>
              
              {/* chamando o botao dos certificados */}
             <BotaoCertificado>

             </BotaoCertificado>

             {/* chamando o botao de Sair */}

             <BotaoSair>

             </BotaoSair>

            </View>

          </View>
        </ImageBackground>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    flexDirection: "column",
    alignItems: "center",
  },
  containerPerfil: {
    backgroundColor: "rgba(2, 30, 31, 0.5)",
    height: "70%",
    width: "90%",
    marginTop: "5%",
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "column",
  },
  fotoPerfil: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginBottom: 15,
  },
  nomeUsuario: {
    color: "#FFFFFF",
    fontSize: 22,
    // fontWeight: "500",
  },
  inputTexto: {
    backgroundColor: "#CA7745",
    width: 300,
    height: 40,
    marginTop: 0,
    borderRadius: 20,
    padding: 10,
    // justifyContent: "center",
    // alignItems:  "center",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18
  },
  containerBotaoSalvar: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:10,
  },
  botaoSalvar: {
    height: 40,
    width: 100,
    backgroundColor: "#CA7745",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
   
  },
  nomeBotaoSalvar:{
    fontSize: 20,
    color: "#000000",
    // fontWeight: "500"
  },
  textoInput:{
    color: "#FFFFFF",
    fontSize: 22, 
    // fontWeight: 400,
    marginLeft: 10
  },
 
});

export default Perfil;