import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, SafeAreaView, Image} from 'react-native';
import ModulosCurso from '../components/modulosCurso/ModulosCurso';
import BotaoContinuar from '../components/botaoContinuar/BotaoContinuar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Modulos from './Modulos';
import Perfil from './Perfil';
import Certificados from './Certificados';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import * as Progress from 'react-native-progress';

import { getDatabase, ref, get } from "firebase/database";


const Tab =  createBottomTabNavigator();

const HomePage = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [lastModuleId, setLastModuleId] = useState(null);
  const [cursoNome, setCursoNome] = useState('');
  const [progressoCurso, setProgressoCurso] = useState(0); // Estado para o progresso do curso

  useEffect(() => {
    checkIfLoggedIn(); // Verifica se o usuário está logado ao montar a tela
    fetchLastModuleData().then(() => {
      fetchDadosUsuario();
      fetchProgressoCurso(); // Atualiza o progresso do curso ao montar a tela
    });
  
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLastModuleData().then(() => {
        fetchDadosUsuario();
        fetchProgressoCurso(); // Atualiza o progresso do curso ao focar na tela
      });
    });
  
    return unsubscribe;
  }, [isFocused]);

  const checkIfLoggedIn = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      navigation.navigate('Login'); // Redireciona para a tela de Login se não estiver logado
    } else {
      fetchDadosUsuario();
    }
  };

  const fetchDadosUsuario = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const name = await AsyncStorage.getItem(`userName_${userToken}`);
    const photo = await AsyncStorage.getItem(`userPhoto_${userToken}`);
    if (name) {
      setNomeUsuario(name);
    } if (photo) {
      setFotoPerfil(photo);
    }
  };

  const truncateName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength - 3) + '...';
    } else {
      return name;
    }
  };

  const fetchLastModuleData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const lastModuleId = await AsyncStorage.getItem(`lastModuleId_${userToken}`);
        if (lastModuleId) {
          setLastModuleId(lastModuleId);
          const db = getDatabase();
          const moduloRef = ref(db, `modulos-geral/${lastModuleId}/topico01/titulo`);
          get(moduloRef).then((snapshot) => {
            if (snapshot.exists()) {
              const cursoNome = snapshot.val();
              setCursoNome(cursoNome);
            }
          }).catch((error) => {
            console.error("Erro ao obter dados do módulo:", error);
              setCursoNome(''); // Defina um valor padrão caso haja erro na obtenção dos dados
          });
        }
      }
    } catch (error) {
      console.error('Erro ao recuperar o último módulo:', error);
    }
  };


  const fetchProgressoCurso = async () => {
    try {
        const userToken = await AsyncStorage.getItem('userToken');
        const lastModuleId = await AsyncStorage.getItem(`lastModuleId_${userToken}`);

        if (lastModuleId) {
            let acertos = await AsyncStorage.getItem(`${lastModuleId}_${userToken}_acertos`); // Ajuste aqui
            acertos = acertos ? JSON.parse(acertos) : 0;

            // Quantidade total de exercícios (por exemplo, 5 exercícios)
            const totalExercicios = 5;

            // Calcular o progresso com base nos acertos
            const progresso = (acertos / totalExercicios) * 100;
            setProgressoCurso(progresso);
            //console.log("Progresso do curso atualizado:", progresso); // Adicionando log para verificar se o progresso está sendo atualizado corretamente
        } else {
            // Se não houver módulo acessado anteriormente, defina o progresso como 0
            setProgressoCurso(0);
        }
    } catch (error) {
        console.error('Erro ao obter o progresso do curso:', error);
    }
};

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/BackgroundHomePage.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
        <Text style={styles.Textheader}>Seja bem vindo(a), {truncateName(nomeUsuario, 10)}</Text>
        <Image
            source={fotoPerfil ? { uri: fotoPerfil } : require('../assets/fotoDePerfil.png')}
            style={styles.fotoPerfil}
          />
        </View>

        <View // Container do progresso do curso
          style={{
            backgroundColor: "rgba(2, 30, 31, 0.5)", // cor do container de fundo
            height: "20%",
            width: "90%",
            marginTop: "15%",
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <View style={styles.containerProgresso}>
            <Text style={styles.textoProgressoCurso}>Progresso do curso</Text>
          </View>

          <View style={{alignItems: 'center', top: 50}}>
          <Progress.Bar progress={progressoCurso / 100} width={350} height={30}
          color="#CA7745" 
          unfilledColor="#021E1F"/>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', width: 350, top: 5}}>
          <Ionicons name="flag" size={22} color="white" />          
          <Ionicons name="trophy" size={22} color="white" />          
          </View>
          </View>
        </View>

         {/* Renderize o último módulo acessado, se houver */}
         <View style={styles.containerModulo}>
         {lastModuleId && cursoNome && (
          <ModulosCurso
            key={lastModuleId}
            tituloModulo={`${lastModuleId}`}
            nomeCurso={cursoNome}
          >
            {/* Adicione qualquer conteúdo adicional aqui */}
            <BotaoContinuar onPress={() => navigation.navigate('Exercicio1', { moduleName: cursoNome })}></BotaoContinuar>
          </ModulosCurso>
        )}
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
  header: {
    backgroundColor: "#021E1F",
    width: "93%",
    height: 80,
    marginTop: "10%",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 2,
    gap: 7
  },
  Textheader: {
    color: "#FFFFFF",
    fontSize: 22,
    marginLeft: 10,
    fontWeight: "400"
  },
  TextheaderUsuario: {
    color: "#FFFFFF",
    fontSize: 25,
    marginLeft: -5
  },
  fotoPerfil: {
    height: 55,
    width: 55,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#fff',
    marginRight: 8
  },
  containerProgresso: {
    backgroundColor: "#CA7745",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  textoProgressoCurso: {
    color: "#000000",
    fontWeight: '400',
    fontSize: 26,
  },
  containerModulo:{
    marginTop: "8%"
  }
});

const HomePageTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#CA7745",
        tabBarInactiveTintColor: "#333333", 
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#000000", 
          borderTopWidth: 0,
          bottom: "5%",
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 15,
          height: 80,
          paddingBottom: 6 
        },
        tabBarLabelStyle: {
          fontSize: 20,
        }
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              <Ionicons name="home" size={32} color={color} />;
            }
            return <Ionicons name="home-outline" size={32} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Módulos"
        component={Modulos}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              <Ionicons name="file-tray-stacked-sarp" size={32} color={color} />;
            }
            return (
              <Ionicons
                name="file-tray-stacked-outline" size={32} color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Certificados"
        component={Certificados}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              <MaterialCommunityIcons name="certificate-outline" size={32}  color={color}/>;
            }
            return (
              <MaterialCommunityIcons name="certificate-outline" size={32}  color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              <Ionicons name="person-circle" size={32} color={color} />;
            }
            return (
              <Ionicons name="person-circle-outline" size={32} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default HomePageTabBar;
