import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ModulosCertificados = (props) =>{
    return(
    <View style = {styles.quizContainer} >
        <View style = {styles.headerQuiz}>
            <Text  style ={styles.textoModulosCertificados}>{props.tituloQuiz}</Text>
        </View>
        <View style = {styles.botaoContainer}>  
            {props.children}
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    quizContainer:{ 
        backgroundColor: "rgba(2, 30, 31, 0.5)",
        height: "20%",
        width: "80%",
        marginTop: "10%",
        borderRadius: 15,
        overflow: "hidden",
        alignItems: "center"
        
    },
    headerQuiz:{
        backgroundColor: "#CA7745",
        height: "25%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    textoModulosCertificados: {
        color: "#000000",
        fontWeight: '500',
        fontSize: 24,
    },
    botaoContainer:{
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: '100%',
        alignContent: 'center',
        bottom: 25
    }
  

})
export default ModulosCertificados;