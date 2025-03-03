import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import CustomMarker from './CustomMarker';
import { MarkerType } from '../types';
import { v4 as uuid } from 'uuid';
import { useMarkers } from '../components/MarkersContext';

const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};


const MapScreen: React.FC = () => {
  const router = useRouter();
  const { markers, setMarkers } = useMarkers();
  const [inputLatitude, setInputLatitude] = useState('');
  const [inputLongitude, setInputLongitude] = useState('');
  const mapRef = useRef<MapView>(null);

  const handleMapPress = (event: any) => {
    const newMarker: MarkerType = {
      id: generateId(),
      coordinate: event.nativeEvent.coordinate,
      images: [],
    };
    console.log('Новый маркер создан:', newMarker);
    setMarkers([...markers, newMarker]);
  };

  const handleMarkerPress = (marker: MarkerType) => {
    console.log('Нажат маркер:', marker);
    router.push(`/marker/${marker.id}`);
    return true;
  };

  // const handleDeleteMarker = (markerId: string) => {
  //   const updatedMarkers = markers.filter((marker) => marker.id !== markerId);
  //   setMarkers(updatedMarkers);
  //   if (updatedMarkers.length === 0) {
  //     navigation.navigate('MapScreen');
  //   } else {
  //     navigation.goBack();
  //   }
  // };

  const moveToCoordinates = () => {
    const lat = parseFloat(inputLatitude);
    const lng = parseFloat(inputLongitude);

    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.02,
          },
          500
        );
      }
    } else {
      alert('Пожалуйста, введите корректные коодринаты!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Широта"
          value={inputLatitude}
          onChangeText={(text) => setInputLatitude(text)}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Долгота"
          value={inputLongitude}
          onChangeText={(text) => setInputLongitude(text)}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <Button title="Отправиться" onPress={moveToCoordinates} />
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 58.00758,
          longitude: 56.18743,
          latitudeDelta: 0.005,
          longitudeDelta: 0.02,
        }}
        onPress={handleMapPress}
      >
        {markers.length > 0 &&
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
  inputContainer: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 5,
    width: '30%',
    marginRight: 10,
  },
});

export default MapScreen;