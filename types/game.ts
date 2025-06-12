export interface Note {
  id: string;
  title: string;
  text: string;
}

export interface Game {
  id: string;
  name: string;
  notes: Note[];
}
