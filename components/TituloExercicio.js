import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";


const TituloExercicio = (props)=>{
    return(
        <TouchableOpacity style={styles.indicadorContainer}>
        <View>
            <Text style = {styles.textoIndicador}>{props.nomeExercicio}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    indicadorContainer:{
        backgroundColor: "#fff",
        marginTop: "15%",
        height: 90,
        width: '90%',
        justifyContent: "center",
        borderRadius: 15,
    },
    textoIndicador: {
        color: "#000000",
        fontSize:  25,
        fontWeight: "700",
        textAlign: "center"
    }

})

export default TituloExercicio;