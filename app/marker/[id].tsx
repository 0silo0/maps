import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { MarkerType } from '../../types';
import { useMarkers } from '../../components/MarkersContext';

const MarkerDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams(); // Получаем параметр маршрута (id)
  const markerId = Array.isArray(id) ? id[0] : id;
  const { markers, setMarkers } = useMarkers();
  const [marker, setMarker] = useState<MarkerType | null>(null);
  const [images, setImages] = useState<string[]>([]);

  React.useEffect(() => {
    // Здесь можно загрузить данные маркера по id
    const fetchedMarker = markers.find((m) => m.id === markerId);
    if (fetchedMarker) {
      setMarker(fetchedMarker);
      setImages(fetchedMarker.images);
    }
  }, [id]);

  if (!marker) {
    return <Text>Маркер не найден</Text>;
  }
};

export default MarkerDetailScreen;