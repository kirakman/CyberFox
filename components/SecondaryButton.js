import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const SecondaryButton = ({ onPress }) => {

    const navigation = useNavigation();


  return (
    <TouchableOpacity style={styles.button}
    onPress={onPress}
    >
      <Text style={styles.buttonText}>Cadastrar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    Width: 200,
    maxWidth: 200,
    borderRadius: 55,
    marginBottom: 50,
  },
  buttonText: {
    color: '#CA7745',
    fontSize: 24,
    textAlign: 'center',
}
});

export default SecondaryButton;