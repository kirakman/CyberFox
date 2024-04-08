import React, { useEffect, useState } from "react";
import {Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import IndicadoTela from "../components/indicadorTela/IndicadorTela";
import BotaoCertificado from "../components/botaoCertificado/BotaoCertificado";
import BotaoSair from "../components/botaoSair/BotaoSair";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';




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

    
      // Após a atualização do nome de usuário, navegue de volta para a HomePage
      //navigation.navigate('Perfil');

     
      navigation.navigate('HomePage');
    }

    const logout = async () => {
      await AsyncStorage.removeItem('userToken'); //limpa o estado de logado
      navigation.navigate('Login');
    }

    const [image, setImage] = useState('https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png');

    const handleImagePicker = async ()=>{
    // aqui serve para pedir a permisao para entrar na galeria
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissao.status === 'granted') {
        console.log("Permissão aceita");
        //aqui entra na galeria, quando a permisao for aceita
        const resultado = await ImagePicker.launchImageLibraryAsync({
          aspect:[4,4],
          allowsEditing: true,
          base64: true,
          quality: 1
        });
  
        if(!resultado.canceled){
          console.log(resultado.assets[0].uri)
          setImage(resultado.assets[0].uri)
        } else {
        console.log("Permissão negada ou não aceita");
        return;
      }
    }
  };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/BackgroundHomePage.png")}
          style={styles.backgroundImage}
        >
          <IndicadoTela nomeTela="Perfil"></IndicadoTela>

          <View style={styles.containerPerfil}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <TouchableOpacity onPress={handleImagePicker}>
                <Image source={{ uri: image }} style={styles.fotoPerfil} />
                <View style={styles.inconeContainer}>
                  <Feather name="edit-2" size={15} color="black" />
                </View>
              </TouchableOpacity>
              <Text style={styles.nomeUsuario}>{nomeUsuario}</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Text style={styles.textoInput}>Nome de usuario</Text>
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
                flexDirection: "column",
              }}
            >
              <Text style={styles.textoInput}>Meus certificados</Text>

              {/* chamando o botao dos certificados */}
              <BotaoCertificado></BotaoCertificado>

              {/* chamando o botao de Sair */}

              <BotaoSair onPress={logout}></BotaoSair>
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
    borderRadius: 50
  },
  inconeContainer:{
    position: 'absolute',
    bottom: 15,
    right: 5,
    backgroundColor: '#F4F3F3',
    borderRadius: 50,
    padding:5
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