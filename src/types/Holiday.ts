export interface Holiday {
  id: string;
  date: Date;
  title: string;
  description: string;
  legislation: string;
  type: "feriado";
  photo?: string;
}
