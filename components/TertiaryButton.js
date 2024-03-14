import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const TertiaryButton = () => {

    const navigation = useNavigation();


  return (
    <TouchableOpacity style={styles.button}
    onPress={()=>navigation.navigate("Home")}
    >
      <Text style={styles.buttonText}>Logar</Text>
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

export default TertiaryButton;
