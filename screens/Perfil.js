import React, { useEffect, useState } from "react";
import {Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import IndicadoTela from "../components/indicadorTela/IndicadorTela";
import BotaoCertificado from "../components/botaoCertificado/BotaoCertificado";
import BotaoSair from "../components/botaoSair/BotaoSair";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Perfil = ()=>{
     const navigation = useNavigation();
     const [nomeUsuario, setNomeUsuario] = useState("Usuario");
     const [novoNome, setNovoNome] = useState("")

     useEffect(() => {
      fetchNomeUsuario();
     }, [])

     const fetchNomeUsuario = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      const userName = await AsyncStorage.getItem(`userName_${userToken}`);
      if(userName) {
        setNomeUsuario(userName);
      }
     }

    const atualizarNome = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      await AsyncStorage.setItem(`userName_${userToken}`, novoNome);
      setNomeUsuario(novoNome);
      Alert.alert(
          "Sucesso!",
          "Nome de usuário atualizado com sucesso!",
          [{ text: "OK", onPress: () => navigation.navigate('HomePage') }],
          { cancelable: false }
      );
  }

    const logout = async () => {
      await AsyncStorage.removeItem('userToken'); //limpa o estado de logado
      navigation.navigate('Login');
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
              <Text style = {styles.textoInput}>Nome de usuário</Text>
              <TextInput
                style={styles.inputTexto}
                placeholder="Nome de usuario"
                placeholderTextColor="#000000"
                value={novoNome}
                onChangeText={setNovoNome}
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

             <BotaoSair onPress={logout}
             
             >

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
    height: "60%",
    width: "90%",
    marginTop: "10%",
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
  },
  inputTexto: {
    backgroundColor: "#CA7745",
    width: 300,
    height: 40,
    marginTop: 0,
    borderRadius: 20,
    padding: 10,

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
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
   
  },
  nomeBotaoSalvar:{
    fontSize: 20,
    color: "#FFFFFF",
  },
  textoInput:{
    color: "#FFFFFF",
    fontSize: 22, 
    marginLeft: 10
  },
 
});

export default Perfil;