import React, { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import IndicadorTela from "../components/indicadorTela/IndicadorTela";
import ModulosCurso from "../components/modulosCurso/ModulosCurso";
import IniciarCurso from "../components/botaoInicarCurso/InicarCurso";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Modulos = () => {
  const [modulos, setModulos] = useState([]);
  const navigation = useNavigation();
  let modulosRef; // Definindo a variável no escopo externo

  useEffect(() => {
    checkIfLoggedIn(); // Verifica se o usuário está logado ao montar a tela

    const fetchModulos = async () => {
      try {
        const db = getDatabase();
        modulosRef = ref(db, 'modulos-geral'); // Definindo a variável aqui

        onValue(modulosRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const modulosArray = Object.entries(data).map(([moduloId, moduloData]) => ({
              id: moduloId,
              nomeModulo: moduloId,
              nomeCurso: moduloData.topico01.titulo
            }));
            setModulos(modulosArray);
          }
        });
      } catch (error) {
        console.error("Erro ao buscar os módulos:", error);
      }
    };

    fetchModulos();

    // Cleanup
    return () => {
      off(modulosRef); // Agora a variável está acessível aqui
    };
  }, []); 

  // Função para navegar para a tela de exercícios com o nome do módulo como parâmetro
  const handleStartModule = async (moduleName, moduleId) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      await AsyncStorage.setItem(`lastModuleId_${userToken}`, moduleId);
      navigation.navigate('Exercicio1', { moduleName });
    } catch (error) {
      console.error("Erro ao definir o último módulo:", error);
    }
  };

const checkIfLoggedIn = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
  if (!userToken) {
    navigation.navigate('Login'); // Redireciona para a tela de Login se não estiver logado
  }
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/BackgroundHomePage.png")}
        style={styles.backgroundImage}
      >
          <IndicadorTela nomeTela="Modulos"></IndicadorTela>
          
          <View style={styles.containerModulos}>
          <ScrollView style={{ flex: 1 }}>
          {/* Renderize os módulos */}
          {modulos.map((modulo) => (
            <ModulosCurso
              key={modulo.id}
              tituloModulo={modulo.nomeModulo}
              nomeCurso={modulo.nomeCurso}
            >
              {/* Adicione um botão para iniciar o módulo */}
              <IniciarCurso icon="unlock" onPress={() => handleStartModule(modulo.nomeModulo, modulo.id)}></IniciarCurso>
            </ModulosCurso>
          ))}
          </ScrollView>
          </View>
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
  containerModulos:{
    paddingLeft: 5,
    paddingRight: 5,
    flex: 0.9,
    paddingBottom: 30,
    marginTop: "5%",
    marginBottom: "2%"
  }
});

export default Modulos;
