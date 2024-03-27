import React from 'react';
import { ImageBackground, StyleSheet, View, Text, SafeAreaView, Image} from 'react-native';
import ModulosCurso from '../components/modulosCurso/ModulosCurso';
import BotaoContinuar from '../components/botaoContinuar/BotaoContinuar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Modulos from './Modulos';
import Quiz from './Quiz';
import Perfil from './Perfil';



const Tab =  createBottomTabNavigator();

const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/BackgroundHomePage.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Text style={styles.Textheader}>Seja bem vindo</Text>
          <Image
            source={require("../assets/fotoDePerfil.png")}
            style={styles.fotoPerfil}
          ></Image>
        </View>

        <View // Container do progresso do curso
          style={{
            backgroundColor: "rgba(2, 30, 31, 0.5)", // cor do container de fundo
            height: "20%",
            width: "90%",
            marginTop: "10%",
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <View style={styles.containerProgresso}>
            <Text style={styles.textoProgressoCurso}>Progresso do curso</Text>
          </View>
        </View>

        {/* chamando o modulo */}

        <ModulosCurso tituloModulo= " Modulo 1" nomeCurso="Introdução a Cibersegurança">
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
    height: 90,
    marginTop: "10%",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  Textheader: {
    color: "#FFFFFF",
    fontSize: 25,
    marginLeft: 10,
  },
  fotoPerfil: {
    height: 60,
    width: 60,
  },
  containerProgresso: {
    backgroundColor: "#CA7745",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  textoProgressoCurso: {
    color: "#000000",
    fontWeight: '700',
    fontSize: 28,
  },
 
 
});

const HomePageTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#333333",
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#CA7745",
          borderTopWidth: 0,
          bottom: "5%",
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 15,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 22,
          paddingTop: 2,
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
              <Ionicons name="home" size={40} color={color} />;
            }
            return <Ionicons name="home-outline" size={40} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Modulos"
        component={Modulos}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              <Ionicons name="file-tray-stacked-sarp" size={40} color={color} />;
            }
            return (
              <Ionicons
                name="file-tray-stacked-outline" size={40} color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={Quiz}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              <MaterialCommunityIcons name="text-box-check" size={40}  color={color}/>;
            }
            return (
              <MaterialCommunityIcons name="text-box-check-outline" size={40}  color={color} />
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
              <Ionicons name="person-circle" size={40} color={color} />;
            }
            return (
              <Ionicons name="person-circle-outline" size={40} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default HomePageTabBar;
