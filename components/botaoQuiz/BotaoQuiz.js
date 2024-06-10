import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Octicons } from '@expo/vector-icons'

const IniciarQuiz= (props)=>{

    return(
        <TouchableOpacity style = {styles.botaoContainer}>
            <Text style = {styles.textoBotaoQuiz} >Acessar
            </Text>
            {props.iconQuiz && <Octicons name={props.iconQuiz} size={28} color="#000000" />}
        </TouchableOpacity>
    )
}
 const styles  = StyleSheet.create({
    botaoContainer: {
        backgroundColor: "#CA7745",
        width: "70%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15, 
        flexDirection: "row",
        gap: 30
    },
textoBotaoQuiz: {
        color: "#000000",
        fontSize: 28,
        fontWeight: "400"
    }
   
 })
export default IniciarQuiz;