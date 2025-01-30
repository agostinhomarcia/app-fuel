import * as SQLite from 'expo-sqlite';

// Abrir ou criar o banco de dados
let db = SQLite.openDatabase('abastecimentos_precos_combustivel.db');

// Função para inicializar ambos os bancos de dados
export const initializeDatabase = () => {
  criarTabelaAbastecimentos();
  criarTabelaPrecosCombustivel();
};

// Função para criar a tabela de abastecimentos
export const criarTabelaAbastecimentos = () => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS abastecimentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        litros REAL,
        preco REAL,
        data_hora TEXT
      );
    `);
  }, error => {
    console.error('Erro ao criar tabela de abastecimentos', error);
  });
};

// Função para criar a tabela de preços de combustíveis
export const criarTabelaPrecosCombustivel = () => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS precos_combustivel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        preco REAL,
        data DATE
      );
    `);
  }, error => {
    console.error('Erro ao criar tabela de preços de combustíveis', error);
  });
};

// Função para adicionar um abastecimento
export const adicionarAbastecimento = (tipo, litros, preco) => {
  return new Promise((resolve, reject) => {
    const dataHoraAtual = new Date().toISOString(); // Obtém a data e hora no formato ISO
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO abastecimentos (tipo, litros, preco, data_hora) VALUES (?, ?, ?, ?)',
        [tipo, litros, preco, dataHoraAtual],
        (_, result) => {
          console.log('Abastecimento adicionado com sucesso', result.lastInsertRowId);
          resolve(result);
        },
        (_, error) => {
          console.error('Erro ao adicionar abastecimento', error);
          reject(error);
        }
      );
    });
  });
};

// Função para buscar abastecimentos
export const buscarAbastecimentos = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM abastecimentos ORDER BY data_hora DESC', [], (_, { rows }) => {
        resolve(rows._array);
      }, (_, error) => {
        reject(error);
      });
    });
  });
};

// Função para excluir um abastecimento
export const excluirAbastecimento = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM abastecimentos WHERE id = ?',
        [id],
        (_, result) => {
          console.log('Abastecimento excluído com sucesso', result);
          resolve(result);
        },
        (_, error) => {
          console.error('Erro ao excluir abastecimento', error);
          reject(error);
        }
      );
    });
  });
};