import { SujetDetails } from './sujet-details.interface';

export interface Sujet {
  id: string;
  date: string;
  legislature: number;
  session: number;
  url: string;
  details: SujetDetails;
}
