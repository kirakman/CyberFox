import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotaoCertificado = ({ onGeneratePDF }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onGeneratePDF}>
      <Text style={styles.buttonText}>Gerar Certificado</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BotaoCertificado;
