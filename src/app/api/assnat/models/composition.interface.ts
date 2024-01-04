import { Circonscription } from './circonscription.interface';
import { Depute } from './depute.interface';
import { Parti } from './parti.interface';

export interface Affectation {
  depute: Depute;
  circonscription: Circonscription;
  parti: Parti;
  fonctions: string[];
}
