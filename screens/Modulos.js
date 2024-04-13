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
    // Referência para o banco de dados Firebase Realtime
    const db = getDatabase();
    const modulosRef = ref(db);

    // Captura de dados
    onValue(modulosRef, (snapshot) => {
      const data = snapshot.val();
      //console.log("Dados do Firebase:", data); // Adicionando um console.log() para verificar os dados recuperados
      if (data) {
        const modulosArray = Object.keys(data).map((key) => ({
          id: key,
          nomeModulo: key,
          nomeCurso: data[key]?.textoModulo?.titulo, // Usando o campo "titulo" como nome do curso
        }));
        //console.log("Modulos Array:", modulosArray); // Adicionando um console.log() para verificar o array de módulos
        setModulos(modulosArray);
      }
    });

    // Cleanup
    return () => {
      // Desinscrever do snapshot listener quando o componente for desmontado
      off(modulosRef);
    };
  }, []); // Este useEffect será executado apenas uma vez, quando o componente for montado

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
              <IniciarCurso icon="unlock" onPress={()=>navigation.navigate('Exercicio1')}></IniciarCurso>
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
