import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Appbar, Text, DataTable, Button, IconButton } from 'react-native-paper';
import { buscarAbastecimentos, excluirAbastecimento } from '../src/database/abastecimentoDb';
import styles from '../src/styles/styles';

const Historico = () => {
  const [abastecimentos, setAbastecimentos] = useState([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const dados = await buscarAbastecimentos();
      setAbastecimentos(dados);
    } catch (error) {
      console.error('Erro ao carregar histórico de abastecimentos', error);
    }
  };

  const handleExcluir = async (id) => {
    try {
      await excluirAbastecimento(id); // Função para excluir do banco de dados
      setAbastecimentos((prevAbastecimentos) =>
        prevAbastecimentos.filter((abastecimento) => abastecimento.id !== id)
      );
      alert('Abastecimento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir abastecimento', error);
      alert('Erro ao excluir abastecimento. Tente novamente!');
    }
  };

  return (
    <>
      <Appbar.Header style={styles.appbar} elevated mode="small">
        <Text style={styles.appbarText} variant="headlineMedium">Histórico</Text>
      </Appbar.Header>

      <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tipo</DataTable.Title>
            <DataTable.Title>Litros</DataTable.Title>
            <DataTable.Title>Preço/litro</DataTable.Title>
            <DataTable.Title>Gasto Total</DataTable.Title>
            <DataTable.Title>Excluir</DataTable.Title>
          </DataTable.Header>

          {abastecimentos.map((abastecimento) => (
            <DataTable.Row key={abastecimento.id}>
              <DataTable.Cell>{abastecimento.tipo === '1' ? 'Álcool' : 'Gasolina'}</DataTable.Cell>
              <DataTable.Cell>{abastecimento.litros.toFixed(2)}</DataTable.Cell>
              <DataTable.Cell>R${abastecimento.preco.toFixed(2)}</DataTable.Cell>
              <DataTable.Cell>R${(abastecimento.litros * abastecimento.preco).toFixed(2)}</DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => handleExcluir(abastecimento.id)} // Excluir item ao clicar
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <Button mode="contained" onPress={carregarHistorico} style={{ marginTop: 20 }}>
          Atualizar Histórico
        </Button>
      </View>
    </>
  );
};

export default Historico;