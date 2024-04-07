import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";


const TituloAula = (props)=>{
    return(
        <View style={styles.indicadorContainer}>
        <View>
            <Text style = {styles.textoIndicador}>{props.nomeAula}</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    indicadorContainer:{
        marginBottom: 25,
        marginTop: 25,
        justifyContent: "center",
    },
    textoIndicador: {
        color: "#CA7745",
        fontSize:  25,
        fontWeight: "700",
        textAlign: "center"
    }

})

export default TituloAula;