import { Sujet } from './sujet.interface';

export interface SujetReponse {
  sujets: Sujet[];
  derniereMaj: string;
  futuresMaj: string[];
  chargementEnCours: string[];
}
