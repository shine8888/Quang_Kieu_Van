export interface IFlight {
  id?: string;
  from: string;
  to: string;
  ipAddress?: string;
  timestamp?: Date;
  flightSequenceNumber?: number;
  parentId?: string;
}
