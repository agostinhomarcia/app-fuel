import { StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.onPrimary
    },
    appbar: {
      backgroundColor: theme.colors.primary
    },
    appbarText: {
      marginLeft: 20,
      color: '#fff',
    },
    card: {
      margin: 20
    },
    fab: {
      position: 'absolute',
      right: 16,
      bottom: 16,
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
      width: '100%',
      marginBottom: 10,
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

  export default styles;