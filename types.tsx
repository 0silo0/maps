export interface MarkerType {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  images: string[];
}

// export type RootStackParamList = {
//   MapScreen: undefined;
//   MarkerDetailScreen: {
//     marker: MarkerType;
//     markers: MarkerType[];
//     setMarkers: (markers: MarkerType[]) => void;
//   };
// };

// export type MarkerDetailScreenRouteProp = RouteProp<RootStackParamList, 'MarkerDetailScreen'>;
// export type NavigationProp = StackNavigationProp<RootStackParamList, 'MarkerDetailScreen'>;