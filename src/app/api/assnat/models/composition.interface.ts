import { Circonscription } from './circonscription.interface';
import { Depute } from './depute.interface';
import { Parti } from './parti.interface';

export interface Composition {
  depute: Depute;
  circonscription: Circonscription;
  parti: Parti;
}
