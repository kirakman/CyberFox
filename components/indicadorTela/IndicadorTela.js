import React from "react";
import { View, Text, StyleSheet } from "react-native";

const IndicadoTela = (props)=>{
    return(
        <View style = {styles.indicadorContainer} >
            <Text style = {styles.textoIndicador}>{props.nomeTela}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    indicadorContainer:{
        backgroundColor: "#CA7745",
        left: 5,
        flexDirection: "column",
        display: "flex",
        marginTop: "10%",
        height: 40,
        width: 150,
        padding: 2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },
    textoIndicador: {
        color: "#000000",
        fontSize:  25,
        fontWeight: "700",
        textAlign: "center"
    }

})

export default IndicadoTela;