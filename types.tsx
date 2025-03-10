export interface MarkerType {
  id: number;
  latitude: number;
  longitude: number;
  images?: ImageType[];
}

export type ImageType = {
  id: number;
  uri: string;
  markerId: number;
};