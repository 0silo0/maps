import React, { createContext, useContext, useEffect, useState } from 'react';
import prisma from '../prisma/client';

type Marker = {
    id: number;
    latitude: number;
    longitude: number;
    images?: Image[]; // Опциональное поле для связанных изображений
  };

type Image = {
    id: number;
    uri: string;
    markerId: number;
  };

interface DatabaseContextType {
  addMarker: (latitude: number, longitude: number) => Promise<number>;
  deleteMarker: (id: number) => Promise<void>;
  getMarkers: () => Promise<Marker[]>;
  addImage: (markerId: number, uri: string) => Promise<number>;
  deleteImage: (id: number) => Promise<void>;
  getMarkerImages: (markerId: number) => Promise<Image[]>;
  getMarkerById: (id: number) => Promise<Marker | null>;

  isLoading: boolean;
  error: Error | null;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addMarker = async (latitude: number, longitude: number): Promise<number> => {
    setIsLoading(true);
    try {
      const marker = await prisma.marker.create({
        data: { latitude, longitude },
      });
      console.log('Маркер добавлен:', marker);
      return marker.id;
    } catch (err) {
      console.error('Ошибка при добавлении маркера:', err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMarker = async (id: number): Promise<void> => {
    setIsLoading(true);
    try {
      await prisma.marker.delete({
        where: { id },
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getMarkers = async (): Promise<Marker[]> => {
    setIsLoading(true);
    try {
      return await prisma.marker.findMany();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addImage = async (markerId: number, uri: string): Promise<number> => {
    setIsLoading(true);
    try {
    const newImage = await prisma.image.create({
        data: { uri, markerId },
        });
      return newImage.id;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteImage = async (id: number): Promise<void> => {
    setIsLoading(true);
    try {
      await prisma.image.delete({
        where: { id },
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getMarkerImages = async (markerId: number): Promise<Image[]> => {
    setIsLoading(true);
    try {
      return await prisma.image.findMany({
        where: { markerId },
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getMarkerById = async (id: number): Promise<Marker | null> => {
    setIsLoading(true);
    try {
      const marker = await prisma.marker.findUnique({
        where: { id },
        include: { images: true }, // Если нужно загрузить связанные изображения
      });
      return marker;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: DatabaseContextType = {
    addMarker,
    deleteMarker,
    getMarkers,
    addImage,
    deleteImage,
    getMarkerImages,
    getMarkerById,
    isLoading,
    error,
  };

  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};