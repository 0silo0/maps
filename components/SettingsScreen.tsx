import React from 'react';
import { View, Button, Alert } from 'react-native';
import { clearDatabase } from '../database/clearDB';

const SettingsScreen: React.FC = () => {
  const handleClearDatabase = async () => {
    try {
      await clearDatabase();
      Alert.alert('Успех', 'База данных очищена');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось очистить базу данных');
    }
  };

  return (
    <View>
      <Button title="Очистить базу данных" onPress={handleClearDatabase} />
    </View>
  );
};

export default SettingsScreen;