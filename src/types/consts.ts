export interface Pet {
  id: string;
  nombre: string;
  raza: string;
  genero?: string;
  comentario?: string;
  url: string;
  // type: 'dog' | 'cat' | 'gallina'
}
