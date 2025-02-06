import { createTrackedSelector } from 'react-tracked';
import { PetForm } from './PetEdit';
import { usePetStore } from '../store/petStore';
import { useNavigate } from 'react-router-dom';

const useTrackedStore = createTrackedSelector(usePetStore);

export function PetCreate() {
  const { addPet } = useTrackedStore();
  const navigate = useNavigate();
  return (
    <div>
      <PetForm
        pet={null}
        save={(pet) => {
          addPet(pet);
          navigate('/');
        }}
      />
    </div>
  );
}
