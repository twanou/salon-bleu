import { Intervention } from './intervention.interface';

export interface SujetDetails {
  type: string;
  titre: string;
  interventions: Intervention[];
}
