import React from 'react';
import { StyleSheet } from 'react-native';
import NavigationStack from './src/navigation';

export default function App() {
  return (
    <NavigationStack />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
