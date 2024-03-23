import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Octicons } from '@expo/vector-icons'

const IniciarCurso = (props)=>{

    return(
        <TouchableOpacity style = {styles.botaoContainer}>
            <Text style = {styles.textoBotao} >Inciar
            </Text>
            {props.icon && <Octicons name={props.icon} size={35} color="#000000" />}
        </TouchableOpacity>
    )
}
 const styles  = StyleSheet.create({
    botaoContainer: {
        backgroundColor: "#CA7745",
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginBottom: 50, 
        flexDirection: "row",
        gap: 15
    },
    textoBotao: {
        color: "#000000",
        fontSize: 30,
        fontWeight: "600"
    },
   
 })
export default IniciarCurso;