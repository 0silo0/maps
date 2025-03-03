import React, { createContext, useContext, useState } from 'react';
import { MarkerType } from '../types';

type MarkersContextType = {
  markers: MarkerType[];
  setMarkers: (markers: MarkerType[]) => void;
};

const MarkersContext = createContext<MarkersContextType | undefined>(undefined);

export const MarkersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  return (
    <MarkersContext.Provider value={{ markers, setMarkers }}>
      {children}
    </MarkersContext.Provider>
  );
};

export const useMarkers = () => {
  const context = useContext(MarkersContext);
  if (!context) {
    throw new Error('useMarkers must be used within a MarkersProvider');
  }
  return context;
};