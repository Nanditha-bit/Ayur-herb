// IndexedDB utilities for offline plant storage
const DB_NAME = 'PlantGyanDB';
const DB_VERSION = 1;
const STORE_NAME = 'identifiedPlants';

export interface IdentifiedPlant {
  id: string;
  plantId?: string;
  sanskritName: string;
  botanicalName: string;
  confidence: number;
  imageData: string;
  timestamp: number;
  synced: boolean;
}

// Initialize IndexedDB
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        objectStore.createIndex('synced', 'synced', { unique: false });
        objectStore.createIndex('plantId', 'plantId', { unique: false });
      }
    };
  });
};

// Save identified plant to IndexedDB
export const saveIdentifiedPlant = async (plant: IdentifiedPlant): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(plant);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Get all identified plants
export const getAllIdentifiedPlants = async (): Promise<IdentifiedPlant[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('timestamp');
    const request = index.openCursor(null, 'prev'); // Most recent first

    const plants: IdentifiedPlant[] = [];

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        plants.push(cursor.value);
        cursor.continue();
      } else {
        resolve(plants);
      }
    };

    request.onerror = () => reject(request.error);
  });
};

// Get unsynced plants
export const getUnsyncedPlants = async (): Promise<IdentifiedPlant[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('synced');
    const request = index.getAll(false);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Mark plant as synced
export const markAsSynced = async (id: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const plant = getRequest.result;
      if (plant) {
        plant.synced = true;
        const updateRequest = store.put(plant);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(updateRequest.error);
      } else {
        resolve();
      }
    };

    getRequest.onerror = () => reject(getRequest.error);
  });
};

// Delete identified plant
export const deleteIdentifiedPlant = async (id: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Clear all identified plants
export const clearAllPlants = async (): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
