import { SujetDetails } from './sujet-details.interface';

export interface Sujet {
  date: string;
  legislature: number;
  session: number;
  details: SujetDetails;
}
