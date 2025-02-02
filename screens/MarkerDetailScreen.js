import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MarkerDetailScreen = ({ route, navigation }) => {
  const { marker, markers, setMarkers } = route.params;
  const [images, setImages] = useState(marker.images);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...images, result.assets[0].uri];
      setImages(newImages);

      // Обновляем маркеры
      const updatedMarkers = markers.map((m) =>
        m.id === marker.id ? { ...m, images: newImages } : m
      );
      setMarkers(updatedMarkers);
    }
  };

  const handleDeleteMarker = () => {
    Alert.alert(
      'Удалить маркер',
      'Вы уверены, что хотите удалить этот маркер?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            if (markers.length === 0) {
              Alert.alert('Ошибка', 'Нет маркеров для удаления.');
              return;
            }
            const updatedMarkers = markers.filter((m) => m.id !== marker.id);
            console.log('Удалён маркер с ID:', marker.id);
            console.log('Оставшиеся маркеры:', updatedMarkers);
            setMarkers(updatedMarkers);
            if (updatedMarkers.length === 0) {
              navigation.navigate('MapScreen');
            } else {
              navigation.goBack();
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteImage = (imageUri) => {
    Alert.alert(
      'Удалить фото',
      'Вы уверены, что хотите удалить это фото?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            if (markers.length === 0) {
              Alert.alert('Ошибка', 'Нет фото для удаления.');
              return;
            }
            const newImages = images.filter(image => image !== imageUri);
            setImages(newImages);
        
            // Обновляем маркеры
            const updatedMarkers = markers.map(m =>
              m.id === marker.id ? { ...m, images: newImages } : m
            );
            setMarkers(updatedMarkers);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Детали маркера</Text>
      <Text style={styles.p}>Координаты:{"\n"}{marker.coordinate.latitude}, {marker.coordinate.longitude}</Text>
      <Text style={styles.p}>{images.length === 0 ? 'Пока нет фото': 'Фотографии на этом маркере'}</Text>
      <ScrollView>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
          <Image source={{ uri: image }} style={styles.image} />
          <Button
            title="Удалить"
            onPress={() => handleDeleteImage(image)}
            color="red"
            style={styles.deleteButton}
          />
        </View>
        ))}
      </ScrollView>
      <Button title="Добавить изображение" onPress={pickImage} />
      <Button title="Удалить маркер" onPress={handleDeleteMarker} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  p: {
    marginBottom: 20,

  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default MarkerDetailScreen;