import React from "react";
import { View, Text, StyleSheet } from "react-native";


const TituloAula = (props)=>{
    return(
        <View style={styles.indicadorContainer}>
            <Text style = {styles.textoIndicador}>{props.nomeAula}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    indicadorContainer:{
        marginBottom: 5,
        marginTop: 25,
        justifyContent: "center",
    },
    textoIndicador: {
        color: "#CA7745",
        fontSize:  24,
        fontWeight: "600",
        textAlign: "center"
    }
})

export default TituloAula;