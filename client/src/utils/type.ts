export type ScheduleTableFields = {
  avgEarthMoisture: number;
  avgHumidity: number;
  avgLightValue: number;
  avgTemperature: number;
  createdAt: number;
  [key: string]: number;
};

export type LineDataType = {
  labels: string[];
  datasets: {
    [key: string]: any;
    data: number[];
  }[];
};

export type UserType = {
  id: string;
  username: string;
};

export type SignInDTO = {
  gmail: string;
  password: string;
};

export type SignUpDTO = {
  gmail: string;
  password: string;
  username: string;
};
