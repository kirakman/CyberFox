import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; 


const BotaoContinuar = ()=> {
   
    const navigation = useNavigation();
    
    
    return(
        <View>
           <TouchableOpacity onPress={()=> navigation.navigate("Modulos")} style = {styles.botaoContinue}>
            <Text style = {styles.textoBotaoContinue}>Continuar</Text>
           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  botaoContinue: {
    backgroundColor: "#CA7745",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 50
  },
  textoBotaoContinue: {
    fontSize: 32,
    textAlign: "center",
    color: "#000000",
    fontWeight: "500"
 },

});
export default BotaoContinuar;
