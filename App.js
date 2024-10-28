import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StatusBar } from 'react-native';
import RNModal from 'react-native-modal';
import styles from './src/styles/styles';

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

export default App;
