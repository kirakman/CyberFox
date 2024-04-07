import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const TituloQuiz = (props)=>{
    return(
        <TouchableOpacity style={styles.indicadorContainer} onPress={props.onPress}>
        <View>
            <Text style = {styles.textoIndicador}>{props.nomeQuiz}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    indicadorContainer:{
        backgroundColor: "#CA7745",
        justifyContent: "center",
        padding: 15,
        borderRadius: 15,
    },
    textoIndicador: {
        color: "#fff",
        fontSize:  22,
        fontWeight: "700",
        textAlign: "center"
    }

})

export default TituloQuiz;