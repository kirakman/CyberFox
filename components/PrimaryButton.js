import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const PrimaryButton = () => {

    const navigation = useNavigation();


  return (
    <TouchableOpacity style={styles.button}
    onPress={()=>navigation.navigate("Register")}
    >
      <Text style={styles.buttonText}>Registrar-se</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#CA7745',
    paddingVertical: 15,
    paddingHorizontal: 15,
    Width: 200,
    maxWidth: 200,
    borderRadius: 55,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
}
});

export default PrimaryButton;
