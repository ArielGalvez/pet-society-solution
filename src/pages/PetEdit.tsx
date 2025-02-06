import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { createTrackedSelector } from 'react-tracked';
import { usePetStore } from '../store/petStore';

const petSchema = z.object({
  id: z.string(),
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(30, 'El nombre no puede tener más de 30 caracteres')
    .regex(/^[a-zA-Z]+$/, 'Solo se permiten caracteres de la A a la Z'),
  raza: z.string().min(1, 'La raza es obligatoria'),
  genero: z.string().optional(), // opcional
  comentario: z.string().optional(), // opcional
  url: z
    .string()
    .url('Debe ser una URL válida')
    .min(1, 'La URL es obligatoria'),
});

type Pet = z.infer<typeof petSchema>;

interface PetFormProps {
  pet: Pet | null;
  save: (pet: Pet) => void;
}

export const PetForm: React.FC<PetFormProps> = ({ pet, save }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pet>({
    resolver: zodResolver(petSchema),
    defaultValues: pet || {
      id: new Date().getTime().toString(),
      nombre: '',
      genero: '', // Valor por defecto como cadena vacía
      comentario: '',
      url: '',
    },
  });

  // Función que se ejecuta al enviar el formulario
  const onSubmit: SubmitHandler<Pet> = (data) => {
    console.log('Datos del formulario:', data);
    save(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md'
    >
      {/* Campo Nombre */}
      <div className='mb-4'>
        <label
          htmlFor='nombre'
          className='block text-sm font-medium text-gray-700'
        >
          Nombre
        </label>
        <input
          type='text'
          id='nombre'
          {...register('nombre')}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        />
        {errors.nombre && (
          <p className='text-red-500 text-sm mt-1'>{errors.nombre.message}</p>
        )}
      </div>

      {/* Campo Raza (select) */}
      <div className='mb-4'>
        <label
          htmlFor='raza'
          className='block text-sm font-medium text-gray-700'
        >
          Raza
        </label>
        <select
          id='raza'
          {...register('raza')}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        >
          <option value=''>Selecciona una raza</option>
          <option value='Labrador'>Labrador</option>
          <option value='Bulldog'>Bulldog</option>
          <option value='Poodle'>Poodle</option>
          <option value='Golden Retriever'>Golden Retriever</option>
        </select>
        {errors.raza && (
          <p className='text-red-500 text-sm mt-1'>{errors.raza.message}</p>
        )}
      </div>

      {/* Campo Género (radio buttons) */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Género (opcional)
        </label>
        <div className='mt-1 space-y-2'>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              value='Macho'
              {...register('genero')}
              className='form-radio h-4 w-4 text-blue-600'
            />
            <span className='ml-2'>Macho</span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              value='Hembra'
              {...register('genero')}
              className='form-radio h-4 w-4 text-blue-600'
            />
            <span className='ml-2'>Hembra</span>
          </label>
        </div>
      </div>

      {/* Campo Comentario (textarea) */}
      <div className='mb-4'>
        <label
          htmlFor='comentario'
          className='block text-sm font-medium text-gray-700'
        >
          Comentario (opcional)
        </label>
        <textarea
          id='comentario'
          {...register('comentario')}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        />
      </div>

      {/* Campo URL */}
      <div className='mb-4'>
        <label
          htmlFor='url'
          className='block text-sm font-medium text-gray-700'
        >
          URL de la imagen
        </label>
        <input
          type='text'
          id='url'
          {...register('url')}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
        />
        {errors.url && (
          <p className='text-red-500 text-sm mt-1'>{errors.url.message}</p>
        )}
      </div>

      {/* Botón de envío */}
      <div>
        <button
          type='submit'
          className='w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

const useTrackedStore = createTrackedSelector(usePetStore);

export function PetEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workingPet, updatePet } = useTrackedStore();
  return (
    <div>
      {workingPet && (
        <PetForm
          pet={workingPet}
          save={(pet) => {
            updatePet(pet);
            navigate('/');
          }}
        />
      )}
    </div>
  );
}
