import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const TituloExercicio = (props)=>{
    return(
        <TouchableOpacity style={styles.indicadorContainer} onPress={props.onPress}>
        <View>
            <Text style = {styles.textoIndicador}>{props.nomeExercicio}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    indicadorContainer:{
        backgroundColor: "#fff",
        marginTop: "5%",
        height: 90,
        width: '90%',
        justifyContent: "center",
        borderRadius: 15,
    },
    textoIndicador: {
        color: "#000000",
        fontSize:  24,
        fontWeight: "500",
        textAlign: "center"
    }

})

export default TituloExercicio;