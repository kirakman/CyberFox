import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ModulosCurso = (props) =>{
    return(
    <View style = {styles.modulosContainer} >
        <View style = {styles.headerModulos}>
            <Text  style ={styles.textoModulos}>{props.tituloModulo}</Text>
        </View>

        <View style = {styles.titulosContainer}>
            <Text style = {styles.nomeCurso}>{props.nomeCurso}</Text>
        </View>
        {props.children}
    </View>
    );
};

const styles = StyleSheet.create({
    modulosContainer:{ 
        backgroundColor: "rgba(2, 30, 31, 0.5)",
        height: 200,
        width: 320,
        marginTop: "10%",
        borderRadius: 15,
        overflow: "hidden",
        alignItems: "center",
    },
    headerModulos:{
        backgroundColor: "#CA7745",
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    textoModulos: {
        color: "#000000",
        fontWeight: '700',
        fontSize: 26,
    },
    titulosContainer:{
        alignItems: "center",
        justifyContent: "center",
        height: "50%",
        padding: 1,
        overflow:"hidden"
     
       
    },
    nomeCurso: {
        color: "#FFFFFF",
        fontSize:26,
        textAlign: "center"
    }

})
export default ModulosCurso;