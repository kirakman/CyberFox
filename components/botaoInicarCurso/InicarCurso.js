import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';


const IniciarCurso = (props)=>{

    const navigation = useNavigation();


    return(
        <TouchableOpacity style = {styles.botaoContainer} onPress={props.onPress}>
            <Text style = {styles.textoBotao} >Iniciar
            </Text>
            {props.icon && <Octicons name={props.icon} size={28} color="#000000" />}
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
        fontSize: 28,
        fontWeight: "400"
    },
   
 })
export default IniciarCurso;