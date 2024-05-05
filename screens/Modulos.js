import React, { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet } from "react-native";
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
    await AsyncStorage.setItem('lastModuleId', moduleId);
    navigation.navigate('Exercicio1', { moduleName });
  } catch (error) {
    console.error("Erro ao definir o último módulo:", error);
  }
};


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/BackgroundHomePage.png")}
        style={styles.backgroundImage}
      >
        <ScrollView style={{ flex: 1 }}>
          <IndicadorTela nomeTela="Modulos"></IndicadorTela>

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
});

export default Modulos;
