import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const CardAbastecimento = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>

      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    width: "100%"
  },
});

export default CardAbastecimento;