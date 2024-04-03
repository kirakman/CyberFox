import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, SafeAreaView, Image} from 'react-native';
import ModulosCurso from '../components/modulosCurso/ModulosCurso';
import BotaoContinuar from '../components/botaoContinuar/BotaoContinuar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Modulos from './Modulos';
import Perfil from './Perfil';
import Certificados from './Certificados';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';




const Tab =  createBottomTabNavigator();

const HomePage = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    checkIfLoggedIn(); // Verifica se o usuário está logado ao montar a tela
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNomeUsuario();
    })

    return unsubscribe

  }, [isFocused]);

  const checkIfLoggedIn = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      navigation.navigate('Login'); // Redireciona para a tela de Login se não estiver logado
    } else {
      fetchNomeUsuario();
    }
  };

  const fetchNomeUsuario = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const name = await AsyncStorage.getItem(`userName_${userToken}`);
    if (name) {
      setNomeUsuario(name);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/BackgroundHomePage.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Text style={styles.Textheader}>Seja bem vindo(a), {nomeUsuario}</Text>
          <Image
            source={require("../assets/fotoDePerfil.png")}
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
        </View>

        {/* chamando o modulo */}

        <ModulosCurso tituloModulo= " Módulo 1" nomeCurso="Introdução a Cibersegurança">
          <BotaoContinuar></BotaoContinuar>
        </ModulosCurso>

       
            
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
