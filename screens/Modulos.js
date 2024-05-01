import React, { useState, useEffect } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import IndicadorTela from "../components/indicadorTela/IndicadorTela";
import ModulosCurso from "../components/modulosCurso/ModulosCurso";
import IniciarCurso from "../components/botaoInicarCurso/InicarCurso";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useNavigation } from '@react-navigation/native';

const Modulos = () => {
  const [modulos, setModulos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const db = getDatabase();
        const modulosRef = ref(db, 'modulos-geral');

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
      off(modulosRef);
    };
  }, []); 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/BackgroundHomePage.png")}
        style={styles.backgroundImage}
      >
        <ScrollView style={{ flex: 1 }}>
          <IndicadorTela nomeTela="Modulos"></IndicadorTela>

          {modulos.map((modulo) => (
            <ModulosCurso
              key={modulo.id}
              tituloModulo={modulo.nomeModulo}
              nomeCurso={modulo.nomeCurso}
            >
              <IniciarCurso icon="unlock" onPress={() => navigation.navigate('Exercicio1')}></IniciarCurso>
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
