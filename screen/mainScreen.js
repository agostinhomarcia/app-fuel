import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { Avatar, Button, Dialog, Portal, Appbar, Text, Card, List, Divider, FAB } from 'react-native-paper';
import { buscarAbastecimentos } from '../src/database/abastecimentoDb';
import styles from '../src/styles/styles';
import NovoAbastecimento from '../src/components/novoAbastecimento'; 
import { format, isToday, isYesterday } from 'date-fns';

const MainScreen = () => {
  const [alcool, setAlcool] = useState('');
  const [gasolina, setGasolina] = useState('');
  const [resultado, setResultado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [abastecimentos, setAbastecimentos] = useState([]);  // Estado para armazenar os abastecimentos
  const [gastoTotal, setGastoTotal] = useState(0);  // Estado para armazenar o gasto total
  const [litrosTotais, setLitrosTotais] = useState(0);  // Estado para armazenar os litros totais
  const [litrosAlcool, setLitrosAlcool] = useState(0);  // Estado para armazenar os litros de álcool
  const [litrosGasolina, setLitrosGasolina] = useState(0);  // Estado para armazenar os litros de gasolina

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const dados = await buscarAbastecimentos(); 
      setAbastecimentos(dados);

      // Calcular o gasto total, litros totais, litros de álcool e litros de gasolina
      let totalGasto = 0;
      let totalLitros = 0;
      let totalAlcool = 0;
      let totalGasolina = 0;

      dados.forEach(abastecimento => {
        const gasto = abastecimento.litros * abastecimento.preco;
        totalGasto += gasto;
        totalLitros += abastecimento.litros;
        if (abastecimento.tipo === '1') {
          totalAlcool += abastecimento.litros;
        } else {
          totalGasolina += abastecimento.litros;
        }
      });

      setGastoTotal(totalGasto); // Atualiza o gasto total
      setLitrosTotais(totalLitros); // Atualiza os litros totais
      setLitrosAlcool(totalAlcool); // Atualiza os litros de álcool
      setLitrosGasolina(totalGasolina); // Atualiza os litros de gasolina
    } catch (error) {
      console.error('Erro ao carregar histórico de abastecimentos', error);
    }
  };

  const calcularRecomendacao = () => {
    const precoAlcool = parseFloat(alcool);
    const precoGasolina = parseFloat(gasolina);

    if (isNaN(precoAlcool) || isNaN(precoGasolina)) {
      setResultado('Insira valores válidos para Álcool e Gasolina.');
    } else {
      const resultadoCalculo = precoAlcool / precoGasolina;
      setResultado(resultadoCalculo < 0.7 ? 'Recomendação: Abasteça com Álcool.' : 'Recomendação: Abasteça com Gasolina.');
    }

    setModalVisible(true);
  };

  const resetarValores = () => {
    setAlcool('');
    setGasolina('');
    setResultado('');
    setModalVisible(false);
  };

  const abrirDialog = () => {
    setDialogVisible(true);
  };

  const fecharDialog = () => {
    setDialogVisible(false); 
  };

  const formatarData = (data) => {
    const dataObj = new Date(data);  // Certifique-se de que estamos trabalhando com um objeto Date
    if (isToday(dataObj)) {
      return 'Hoje';
    } else if (isYesterday(dataObj)) {
      return 'Ontem';
    } else {
      return format(dataObj, 'dd/MM/yyyy');  // Formata para "dd/MM/yyyy"
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <Appbar.Header style={styles.appbar} elevated mode="small">
        <Text style={styles.appbarText} variant="headlineMedium">Fuel</Text>
      </Appbar.Header>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Abasteça com álcool"
            subtitle="R$3.25 (-7%)"
            left={(props) => <Avatar.Icon style={{ backgroundColor: 'green' }} {...props} icon="gas-station" />}
          />
        </Card>
        
        <Card style={styles.card}>
          <Card.Title title="Resumo de Abastecimentos" />
          <Card.Content>
            <Text variant="titleMedium">Gasto Total: R${gastoTotal.toFixed(2)}</Text>
            <Text variant="titleMedium">Litros Totais: {litrosTotais.toFixed(2)} L</Text>
            <Text variant="titleMedium">Álcool: {litrosAlcool.toFixed(2)} L</Text>
            <Text variant="titleMedium">Gasolina: {litrosGasolina.toFixed(2)} L</Text>
          </Card.Content>
        </Card>

        <List.Accordion
          title="Últimos abastecimentos"
          expanded={true}
          left={props => <List.Icon {...props} icon="chart-bar" />}>
            {abastecimentos.map((abastecimento) => (
              <React.Fragment key={abastecimento.id}>
                <List.Item
                  title={`${abastecimento.litros} litros de ${abastecimento.tipo === '1' ? 'álcool' : 'gasolina'}`}
                  description={abastecimento.data_hora} // Passando o objeto Date aqui
                  left={props => 
                    <List.Icon {...props} color={abastecimento.tipo === '1' ? 'green' : 'red'} icon="gas-station" />
                  }
                  right={props => 
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text {...props} variant="labelLarge">R${(abastecimento.litros * abastecimento.preco).toFixed(2)}</Text>
                      <Text {...props} variant="labelMedium">R${abastecimento.preco.toFixed(2)}/l</Text>
                    </View>
                  }
                />
                <Divider />
              </React.Fragment>
            ))}
        </List.Accordion>

        <Portal>
          <Dialog visible={modalVisible} onDismiss={resetarValores}>
            <Dialog.Title>Resultado</Dialog.Title>
            <Dialog.Content>
              <Text>{resultado}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={resetarValores}>Fechar</Button>
            </Dialog.Actions>
          </Dialog>

          <NovoAbastecimento 
            visible={dialogVisible}
            onClose={fecharDialog}
            onAbastecimentoAdicionado={carregarHistorico}  
          />
        </Portal>

        <FAB
          style={styles.fab}
          icon="plus"
          onPress={abrirDialog} 
        />
      </View>
    </>
  );
};

export default MainScreen;