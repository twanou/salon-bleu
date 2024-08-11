import { Affectation } from './composition.interface';

export interface Intervention {
  affectation: Affectation;
  note: string;
  paragraphes: string[];
}
