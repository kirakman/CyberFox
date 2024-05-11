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

  useEffect(() => {
    checkIfLoggedIn(); // Verifica se o usuário está logado ao montar a tela
    fetchLastModuleData().then(() => {
      fetchDadosUsuario();
    });
  
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLastModuleData().then(() => {
        fetchDadosUsuario();
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
      const moduleId = await AsyncStorage.getItem('lastModuleId');
      if (moduleId) {
        setLastModuleId(moduleId);
        const db = getDatabase();
        const moduloRef = ref(db, `modulos-geral/${moduleId}/topico01/titulo`);
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
    } catch (error) {
      console.error('Erro ao recuperar o último módulo:', error);
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
          <Progress.Bar progress={0.7} width={350} height={30}
          color="#CA7745" 
          unfilledColor="#021E1F"/>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', width: 350, top: 5}}>
          <Ionicons name="flag" size={22} color="white" />          
          <Ionicons name="trophy" size={22} color="white" />          
          </View>
          </View>
        </View>

         {/* Renderize o último módulo acessado, se houver */}
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
    height: 80,
    marginTop: "15%",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Textheader: {
    color: "#FFFFFF",
    fontSize: 25,
    marginLeft: 10,
  },
  TextheaderUsuario: {
    color: "#FFFFFF",
    fontSize: 25,
    marginLeft: -5
  },
  fotoPerfil: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#fff'
  },
  containerProgresso: {
    backgroundColor: "#CA7745",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  textoProgressoCurso: {
    color: "#000000",
    fontWeight: '700',
    fontSize: 26,
  },
 
 
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
