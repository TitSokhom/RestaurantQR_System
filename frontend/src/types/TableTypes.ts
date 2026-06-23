export type TableStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "OCCUPIED";
 
export interface TableItem {
  id: string;
  name: string;
  tableNumber:string;
  zone: string;
  seats: number;
  status: TableStatus;
  capacity: number;
  qrCode?: string;
  previewUrl: string;
}
////
export type TableZone =
  | "Main Hall"
  | "Terrace"
  | "Private Room"
  | "Window Side";

export type ZoneFilter = "All Zones" | TableZone;
