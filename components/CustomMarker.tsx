import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Взял иконку из expo-vector-icons

interface Props {
  photoCount: number;
}

const CustomMarker: React.FC<Props> = ({ photoCount }) => {
  return (
    <View style={styles.markerContainer}>
      <Ionicons name="location-sharp" size={30} color="red" />
      {photoCount > 0 && (
        <View style={styles.photoCountContainer}>
          <Text style={styles.photoCountText}>{photoCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  photoCountContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: 'gray',
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCountText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomMarker;