import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BotaoCertificado = ()=>{
    return(
        <TouchableOpacity style={styles.emitiCertificado}>
            <Text style ={styles.textoBotaoCertificado}>Clique aqui</Text>
            <MaterialCommunityIcons name="certificate-outline" size={30} color="black" />
        </TouchableOpacity>
    );
};
 const styles = StyleSheet.create({
   emitiCertificado:{
    backgroundColor: "#CA7745",
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 50, 
    flexDirection: "row",
    gap: 25
    
   },
   textoBotaoCertificado:{
    color: "#000000",
    fontSize: 20,
    marginTop: -5
   }
 })
export default BotaoCertificado;