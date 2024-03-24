import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ModulosQuiz = (props) =>{
    return(
    <View style = {styles.quizContainer} >
        <View style = {styles.headerQuiz}>
            <Text  style ={styles.textoModulosQuiz}>{props.tituloQuiz}</Text>
        </View>

        <View style = {styles.botaoContainer}>
            
        </View>
        {props.children}
    </View>
    );
};

const styles = StyleSheet.create({
    quizContainer:{ 
        backgroundColor: "rgba(2, 30, 31, 0.5)",
        height: "25%",
        width: "90%",
        marginTop: "5%",
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
textoModulosQuiz: {
        color: "#000000",
        fontWeight: '700',
        fontSize: 28,
    },
    botaoContainer:{
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        overflow: "hidden"
    }
  

})
export default ModulosQuiz;