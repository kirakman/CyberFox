import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const BotaoSair = () =>{
    const navigation = useNavigation();

    return (
      <TouchableOpacity style={styles.containerSair}
      onPress={()=> navigation.navigate("Home")}
      >
        <MaterialIcons name="logout" size={40} color="black" />
        <Text style={styles.textoBotaoSair}>Sair</Text>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
   containerSair:{
    backgroundColor: "#CA7745",
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 50, 
    flexDirection: "row",
    gap: 10
   },
    textoBotaoSair:{
        color: "#000000",
        fontSize: 22,
    }
})
export default BotaoSair;