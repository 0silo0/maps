import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import MarkerDetailScreen from './screens/MarkerDetailScreen';

type RootStackParamList = {
  MapScreen: undefined;
  MarkerDetailScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapScreen">
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerTitle: 'Карта' }}/>
        <Stack.Screen name="MarkerDetailScreen" component={MarkerDetailScreen} options={{ headerTitle: 'Детали маркера' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;