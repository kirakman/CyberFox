import React, { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import IndicadoTela from "../components/indicadorTela/IndicadorTela";

// ficar atentento que pode aparecer erro nessa importacao 
import ModulosCurso from "../components/modulosCurso/ModulosCurso";
import IniciarCurso from "../components/botaoInicarCurso/InicarCurso";

import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from "firebase/database";



const Modulos = () => {
  const [modulos, setModulos] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    //referenciando o realtime database
    const db = getDatabase();
    const modulosRef = ref(db, '/modulo01');

    //buscando os dados
    onValue(modulosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // to trazendo os dados da snapshot
        const { titulo, textoModulo } = data;
        const perguntas = Object.values(data).filter(item => typeof item === 'object');

        //to montando meu modulosArray com os dados que extraí
        const modulosArray = [{
          id: 'modulo01',
          nomeModulo: 'Módulo 1',
          nomeCurso: titulo,
          textoModulo: textoModulo,
          perguntas: perguntas
        }];
        setModulos(modulosArray);
    }
  });

  //limpando os dados após fechamento para não manter renderização contínua
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
            <IndicadoTela nomeTela="Modulos"></IndicadoTela>

          {/* lógica atualizada para mapear, e inserir na tela os dados, assim como direcionamento para tela referida*/}
            {modulos.map((modulo) => (
              <ModulosCurso
              key={modulo.id}
              tituloModulo={modulo.nomeModulo}
              nomeCurso={modulo.nomeCurso}
              >
                <Text>{modulo.textoModulo}</Text>
                {modulo.perguntas.map((pergunta, index) => (
                  <Text key={index}>{pergunta.titulo}</Text>
                ))}
                <IniciarCurso icon='unlock' onPress={() => navigation.navigate('Exercicio1')}></IniciarCurso>
              </ModulosCurso>
            ))}

            {/* Código de renderização do kirak */}
            {/*<ModulosCurso tituloModulo="Módulo 1" nomeCurso="Introdução a Cibersegurança">
              <IniciarCurso icon="unlock" onPress={() => navigation.navigate("Exercicio1")}></IniciarCurso> 
    </ModulosCurso>*/}

      {/*Codigo abaixo referente a busca dos itens do realtime database na att passada da branch*/}
            {/* {modulos.map((modulo) => (
              <ModulosCurso
              key={modulo.id}
              tituloModulo={modulo.nomeModulo}
              nomeCurso={modulo.nomeCurso}
              >
                <IniciarCurso icon="unlock"></IniciarCurso>
              </ModulosCurso>
            ))} */}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
}

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