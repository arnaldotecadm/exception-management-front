import { SoftwareInterface } from '../software.interface';

export interface ExceptionTotalInterface {
  totalExceptions: number;
  application: string;
  software: SoftwareInterface;
}
