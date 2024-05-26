import { Intervention } from './intervention.interface';
import { SujetType } from './sujet-type.enum';

export interface SujetDetails {
  type: SujetType;
  titre: string;
  interventions: Intervention[];
}
