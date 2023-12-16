import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, Image, StyleSheet, StatusBar } from 'react-native';
import RNModal from 'react-native-modal';

const App = () => {
  const [alcool, setAlcool] = useState('');
  const [gasolina, setGasolina] = useState('');
  const [resultado, setResultado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const calcularRecomendacao = () => {
    const precoAlcool = parseFloat(alcool);
    const precoGasolina = parseFloat(gasolina);

    if (isNaN(precoAlcool) || isNaN(precoGasolina)) {
      setResultado('Insira valores válidos para Álcool e Gasolina.');
      return;
    }

    const resultadoCalculo = precoAlcool / precoGasolina;

    if (resultadoCalculo < 0.7) {
      setResultado('Recomendação: Abasteça com Álcool.');
      setModalVisible(true);
    } else {
      setResultado('Recomendação: Abasteça com Gasolina.');
    }
  };

  const resetarValores = () => {
    setAlcool('');
    setGasolina('');
    setResultado('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor="#ccc" barStyle="light-content" />

      <Image
        source={require('./src/assets/logo.png')}
        style={styles.imagemPaginaInicial}
      />

      <Text style={styles.label}>Preço do Álcool (R$):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o preço do Álcool"
        keyboardType="numeric"
        value={alcool}
        onChangeText={(text) => setAlcool(text)}
      />

      <Text style={styles.label}>Preço da Gasolina (R$):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o preço da Gasolina"
        keyboardType="numeric"
        value={gasolina}
        onChangeText={(text) => setGasolina(text)}
      />

      <Button title="Calcular " onPress={calcularRecomendacao} />

      <Text style={styles.resultado}>{resultado}</Text>

      <RNModal isVisible={modalVisible} style={styles.modal}>
        <View style={styles.modalContainer}>

          <Image
            source={require('./src/assets/gas.png')}
            style={styles.imagemModal}
          />

          <Text style={styles.modalTexto}>Compensa usar álcool!</Text>


          <Text style={styles.label}>Novo preço do Álcool (R$):</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Digite o preço do Álcool"
            keyboardType="numeric"
            value={alcool}
            onChangeText={(text) => setAlcool(text)}
          />

          <Text style={styles.label}>Novo preço da Gasolina (R$):</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Digite o preço da Gasolina"
            keyboardType="numeric"
            value={gasolina}
            onChangeText={(text) => setGasolina(text)}
          />



          <Button
            title="Fechar"
            onPress={() => {
              resetarValores();
            }}
          />
        </View>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ccc',
    flex: 1,
  },
  imagemPaginaInicial: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  imagemModal: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  modalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalInput: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});

export default App;
