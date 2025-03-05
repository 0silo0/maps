import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect, useRouter } from 'expo-router';
import CustomMarker from './CustomMarker';
import SettingsScreen from './SettingsScreen';
import { MarkerType } from '../types';
import { v4 as uuid } from 'uuid';
import { useMarkers } from '../components/MarkersContext';
import { useDatabase } from '../contexts/DatabaseContext';

const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};


const MapScreen: React.FC = () => {
  const router = useRouter();
  // const { markers, setMarkers } = useMarkers();
  const { addMarker, getMarkers } = useDatabase();
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [inputLatitude, setInputLatitude] = useState('');
  const [inputLongitude, setInputLongitude] = useState('');
  const mapRef = useRef<MapView>(null);

  // const handleMapPress = (event: any) => {
  //   const newMarker: MarkerType = {
  //     id: generateId(),
  //     coordinate: event.nativeEvent.coordinate,
  //     images: [],
  //   };
  //   console.log('Новый маркер создан:', newMarker);
  //   setMarkers([...markers, newMarker]);
  // };

  useFocusEffect(
    React.useCallback(() => {
      const loadMarkers = async () => {
        const data = await getMarkers();
        setMarkers(data);
      };
      loadMarkers();
    }, [])
  );
  

  // const handleMarkerPress = (marker: MarkerType) => {
  //   console.log('Нажат маркер:', marker);
  //   router.push(`/marker/${marker.id}`);
  //   return true;
  // };

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const markerId = await addMarker(latitude, longitude); // Добавляем маркер в базу данных
    setMarkers([...markers, { id: markerId, latitude, longitude, images: [] }]);
  };

  const handleMarkerPress = (marker: MarkerType) => {
    console.log('Нажат маркер:', marker);
    router.push(`/marker/${marker.id}`);
  };

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
        
      </View><SettingsScreen />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 58.00758,
          longitude: 56.18743,
          latitudeDelta: 0.005,
          longitudeDelta: 0.02,
        }}
        onLongPress={handleMapPress}
      >
        {
          markers.map((marker) => (
            <Marker
              key={marker.id}
              // coordinate={marker.coordinate}
              coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
              onPress={() => handleMarkerPress(marker)}
            >
              <CustomMarker photoCount={marker.images ? marker.images.length : 0} />
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