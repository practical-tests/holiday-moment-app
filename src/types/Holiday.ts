export interface Holiday {
  id: string;
  date: Date;
  title: string;
  description: string;
  legislation: string;
  type: "feriado";
  latitude?: number;
  longitude?: number;
  photo?: string;
}
