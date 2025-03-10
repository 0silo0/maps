import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('markers.db');

export const clearDatabase = async () => {
  try {
    await db.execAsync('DELETE FROM markers;');
    await db.execAsync('DELETE FROM marker_images;');
    console.log('База данных очищена');
  } catch (error) {
    console.error('Ошибка при очистке базы данных:', error);
    throw error;
  }
};