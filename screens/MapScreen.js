import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import CustomMarker from './CustomMarker'; // Импортируем кастомный маркер

const MapScreen = () => {
  const navigation = useNavigation();
  const [markers, setMarkers] = useState([]);

  const handleMapPress = (event) => {
    const newMarker = {
      id: Date.now().toString(),
      coordinate: event.nativeEvent.coordinate,
      images: [],
    };
    setMarkers([...markers, newMarker]);
  };

  const handleMarkerPress = (marker) => {
    navigation.navigate('MarkerDetail', { marker, markers, setMarkers });
  };

  const handleDeleteMarker = (markerId) => {
    const updatedMarkers = markers.filter((marker) => marker.id !== markerId);
    console.log('Удалён маркер с ID:', markerId); // Логируем удаление
    console.log('Оставшиеся маркеры:', updatedMarkers); // Логируем обновлённый список маркеров
    setMarkers(updatedMarkers);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
      {markers.length > 0 && // Проверка на пустой массив
        markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() => handleMarkerPress(marker)}
          >
            <CustomMarker photoCount={marker.images.length} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;