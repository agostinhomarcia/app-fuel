import React, { useState } from 'react';
import { TextInput, Button, Dialog, Portal, SegmentedButtons, Text } from 'react-native-paper';
import { adicionarAbastecimento } from '../database/abastecimentoDb';
import styles from '../styles/styles';
import { DatePickerModal } from 'react-native-paper-dates';
import { format, formatISO } from 'date-fns'; // Importar formatISO para formatar a data corretamente

const NovoAbastecimento = ({ visible, onClose, onAbastecimentoAdicionado }) => {
  const [tipo, setTipo] = useState('1');
  const [litros, setLitros] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataHora, setDataHora] = useState(new Date()); // Inicializar como uma data válida
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDismissSingle = React.useCallback(() => {
    setShowDatePicker(false);
  }, [setShowDatePicker]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setShowDatePicker(false);
      setDataHora(params.date);
    },
    [setShowDatePicker, setDataHora]
  );

  const salvarAbastecimento = async () => {
    if (!tipo || !litros || !preco) return alert('Preencha todos os campos!');
    const litrosFloat = parseFloat(litros);
    const precoFloat = parseFloat(preco);
    if (isNaN(litrosFloat) || isNaN(precoFloat)) return alert('Insira valores válidos!');

    setLoading(true);

    try {
      const formattedDataHora = formatISO(dataHora); // Formatar a data para o formato ISO
      const result = await adicionarAbastecimento(tipo, litrosFloat, precoFloat, formattedDataHora);

      if (result) {
        onAbastecimentoAdicionado?.();
        onClose();
        setTipo('1');
        setLitros('');
        setPreco('');
        setDataHora(new Date());
      } else {
        alert('Erro ao adicionar abastecimento!');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar abastecimento!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>Novo Abastecimento</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Litros"
            value={litros}
            onChangeText={setLitros}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Valor/litro"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
            style={styles.input}
            left={<TextInput.Affix text="R$" />}
          />
          <SegmentedButtons
            value={tipo}
            onValueChange={setTipo}
            buttons={[
              { value: '1', label: 'Álcool', icon: 'gas-station', checkedColor: 'green' },
              { value: '2', label: 'Gasolina', icon: 'gas-station', checkedColor: 'red' }
            ]}
          />
          <Button onPress={() => setShowDatePicker(true)} style={{ marginTop: 10 }}>Escolher Data</Button>
          <Text>{format(dataHora, 'dd/MM/yyyy')}</Text>

          <DatePickerModal
            mode="single"
            visible={showDatePicker}
            date={dataHora}
            onDismiss={onDismissSingle}
            onConfirm={onConfirmSingle}
          />
          
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancelar</Button>
          <Button
            mode="contained"
            onPress={salvarAbastecimento}
            loading={loading}
            disabled={loading}
          >
            Salvar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default NovoAbastecimento;