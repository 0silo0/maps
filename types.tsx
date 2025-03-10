export interface MarkerType {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  images: string[];
}

// export interface MarkerType {
//   id: number;
//   latitude: number;
//   longitude: number;
//   images?: ImageType[];
// }

// export type ImageType = {
//   id: number;
//   uri: string;
//   markerId: number;
// };