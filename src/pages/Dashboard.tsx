import { usePetStore } from '../store/petStore';
import { Button, Link, Tooltip } from '@nextui-org/react';
import { createTrackedSelector } from 'react-tracked';

const useTrackedStore = createTrackedSelector(usePetStore);

function Dashboard() {
  const { pets, setWorkingPet, workingPet } = useTrackedStore();
  return (
    <main>
      <h1 className='text-medium pb-4'>listado de mascotas</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {pets.map((pet) => (
          <div
            key={pet.id}
            onClick={() => {
              setWorkingPet(pet);
            }}
          >
            <img
              src={pet.url}
              alt={pet.id}
              className='w-full object-cover'
            />

            {workingPet?.id === pet.id && (
              <Tooltip content={pet.nombre || 'n/a'}>
                <div>
                  <p>{pet.comentario}</p>
                  <div>
                    <Button
                      onClick={() => {
                        console.log('mostrar modal');
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      as={Link}
                      href={`/${pet.id}`}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Tooltip>
            )}
          </div>
        ))}
      </div>
      <Button
        className='pb-4'
        as={Link}
        href='/new'
      >
        Add
      </Button>
    </main>
  );
}
export default Dashboard;
