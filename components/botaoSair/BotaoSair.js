import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const BotaoSair = ({onPress}) =>{
    

    return (
      <TouchableOpacity style={styles.containerSair}
      onPress={onPress}
      >
        <MaterialIcons name="logout" size={32} color="black" />
        <Text style={styles.textoBotaoSair}>Sair</Text>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
   containerSair:{
    backgroundColor: "#CA7745",
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 50, 
    flexDirection: "row",
    gap: 10
   },
    textoBotaoSair:{
        color: "#000000",
        fontSize: 24,
        fontWeight: "500"
    }
})
export default BotaoSair;