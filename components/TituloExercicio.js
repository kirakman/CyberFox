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
        alignItems: "center",
        borderRadius: 15,
    },
    textoIndicador: {
        color: "#000000",
        fontSize:  21,
        fontWeight: "400",
        textAlign: "center",
        padding: 2,
    }

})

export default TituloExercicio;