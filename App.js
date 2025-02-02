import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import MarkerDetailScreen from './screens/MarkerDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapScreen">
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="MarkerDetail" component={MarkerDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
