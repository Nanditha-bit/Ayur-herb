import { useState, useEffect } from 'react';
import {
  IdentifiedPlant,
  saveIdentifiedPlant,
  getAllIdentifiedPlants,
  getUnsyncedPlants,
  markAsSynced,
  deleteIdentifiedPlant,
} from '@/lib/indexedDB';
import { toast } from 'sonner';

export const useOfflineStorage = () => {
  const [identifiedPlants, setIdentifiedPlants] = useState<IdentifiedPlant[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back online! Syncing data...');
      syncToServer();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.info('You are offline. Changes will be saved locally.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load plants from IndexedDB on mount
  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const plants = await getAllIdentifiedPlants();
      setIdentifiedPlants(plants);
    } catch (error) {
      console.error('Failed to load plants from IndexedDB:', error);
      toast.error('Failed to load saved plants');
    }
  };

  const savePlant = async (plant: Omit<IdentifiedPlant, 'id' | 'timestamp' | 'synced'>) => {
    try {
      const newPlant: IdentifiedPlant = {
        ...plant,
        id: `plant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        synced: false,
      };

      await saveIdentifiedPlant(newPlant);
      setIdentifiedPlants(prev => [newPlant, ...prev]);
      
      if (!isOnline) {
        toast.success('Plant saved offline. Will sync when online.');
      } else {
        toast.success('Plant saved!');
        // Sync immediately if online
        syncToServer();
      }
      
      return newPlant;
    } catch (error) {
      console.error('Failed to save plant:', error);
      toast.error('Failed to save plant');
      throw error;
    }
  };

  const deletePlant = async (id: string) => {
    try {
      await deleteIdentifiedPlant(id);
      setIdentifiedPlants(prev => prev.filter(p => p.id !== id));
      toast.success('Plant removed from history');
    } catch (error) {
      console.error('Failed to delete plant:', error);
      toast.error('Failed to remove plant');
    }
  };

  const syncToServer = async () => {
    if (!isOnline || isSyncing) return;

    try {
      setIsSyncing(true);
      const unsyncedPlants = await getUnsyncedPlants();

      if (unsyncedPlants.length === 0) {
        return;
      }

      // Here you would sync to your backend/Supabase
      // For now, we'll just mark them as synced
      // In a real implementation, you'd send to a server and handle responses
      
      for (const plant of unsyncedPlants) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        await markAsSynced(plant.id);
      }

      toast.success(`Synced ${unsyncedPlants.length} plant(s)`);
      await loadPlants(); // Reload to update synced status
    } catch (error) {
      console.error('Sync failed:', error);
      toast.error('Failed to sync some plants. Will retry later.');
    } finally {
      setIsSyncing(false);
    }
  };

  const getUnsyncedCount = () => {
    return identifiedPlants.filter(p => !p.synced).length;
  };

  return {
    identifiedPlants,
    isOnline,
    isSyncing,
    savePlant,
    deletePlant,
    syncToServer,
    getUnsyncedCount,
    refreshPlants: loadPlants,
  };
};
