import React, { useState, useEffect } from 'react';
import { PaperProvider, BottomNavigation } from 'react-native-paper';
import theme from './src/theme';
import { initializeDatabase } from './src/database/abastecimentoDb';

import MainScreen from './screen/mainScreen';
import Historico from './screen/historyScreen';

const App = () => {
  useEffect(() => {
    initializeDatabase();
  }, []); 

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'main', title: 'Início', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'history', title: 'Histórico', focusedIcon: 'history', unfocusedIcon: 'clock-outline' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    main: MainScreen,
    history: Historico
  });

  return (
    <PaperProvider theme={theme}>
      <BottomNavigation 
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
};

export default App;