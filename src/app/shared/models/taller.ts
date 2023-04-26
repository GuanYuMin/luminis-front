export interface Taller {
  autor: string,
  temario: Temario[],
  aprendizajes: Aprendizaje[],
  comentarios: Comentario[],
  video: string,
  tipo: string,
  duracion: number,
  name: string,
  descripcion: string,
}

export interface Temario {
  orden: number,
  titulo: string,
  link: string,
  id: number
}

export interface Aprendizaje {
  orden: number,
  titulo: string,
  link: string,
  id: number
}

export interface Comentario {
  userId: number,
  creation_date: Date,
  likes: number[],
  photo: string,
  comentario: string,
  commentId?: number,
  id: number
}
