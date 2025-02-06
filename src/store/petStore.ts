import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pet } from '../types/consts';

export interface PetStore {
  pets: Pet[];
  workingPet: Pet | null;
  addPet: (pet: Pet) => void;
  loadPets: () => void;
  failedLoadPets: () => void;
  unloadPets: () => void;
  setWorkingPet: (pet: Pet | null) => void;
  updatePet: (pet: Pet) => void;
}

const initialData = [
  {
    id: 'HkuYlxqEQ',
    url: 'https://cdn2.thedogapi.com/images/HkuYlxqEQ_1280.jpg',
    width: 480,
    height: 360,
  },
  {
    id: 'SkIgzxqNQ',
    url: 'https://cdn2.thedogapi.com/images/SkIgzxqNQ_1280.jpg',
    width: 800,
    height: 696,
  },
  {
    id: 'BykZ7ecVX',
    url: 'https://cdn2.thedogapi.com/images/BykZ7ecVX_1280.jpg',
    width: 960,
    height: 768,
  },
  {
    id: 'chQC0QwHn',
    url: 'https://cdn2.thedogapi.com/images/chQC0QwHn.jpg',
    width: 864,
    height: 676,
  },
  {
    id: 'UZtLVvNhE',
    url: 'https://cdn2.thedogapi.com/images/UZtLVvNhE.jpg',
    width: 1080,
    height: 1162,
  },
  {
    id: 'RvLX2NmBZ',
    url: 'https://cdn2.thedogapi.com/images/RvLX2NmBZ.jpg',
    width: 1080,
    height: 1080,
  },
  {
    id: '4Fw1A7oD8',
    url: 'https://cdn2.thedogapi.com/images/4Fw1A7oD8.jpg',
    width: 750,
    height: 500,
  },
  {
    id: 'cPCYGxzz1',
    url: 'https://cdn2.thedogapi.com/images/cPCYGxzz1.jpg',
    width: 625,
    height: 417,
  },
  {
    id: 'COXQowStQ',
    url: 'https://cdn2.thedogapi.com/images/COXQowStQ.jpg',
    width: 3088,
    height: 2320,
  },
  {
    id: 'uJNmGElBh',
    url: 'https://cdn2.thedogapi.com/images/uJNmGElBh.jpg',
    width: 2500,
  },
];

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      pets: initialData as any,
      workingPet: null,

      loadPets: () => {
        try {
          set({ pets: initialData as any });
        } catch (error) {
          console.error('Error al cargar las mascotas:', error);
          set({ pets: [] }); // En caso de error, limpiamos la lista
        }
      },

      // Manejar fallo al cargar mascotas
      failedLoadPets: () => {
        set({ pets: [] }); // Limpiamos la lista de mascotas
      },

      // Descargar mascotas (limpiar la lista)
      unloadPets: () => {
        set({ pets: [] });
      },

      // Establecer la mascota en edición/visualización
      setWorkingPet: (pet) => {
        set({ workingPet: pet });
      },

      // Agregar una nueva mascota
      addPet: (pet) => {
        set({ pets: [...get().pets, pet] });
      },

      // Actualizar una mascota existente
      updatePet: (pet) => {
        set({ pets: get().pets.map((p) => (p.id === pet.id ? pet : p)) });
      },
    }),
    {
      name: 'pet-store', // Nombre de la clave en localStorage
    }
  )
);