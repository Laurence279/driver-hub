export interface Driver {
    id: number;
    forename: string;
    surname: string;
    vehicleRegistration: string;
    totalActivity: number;
    daysActive: string[];
  }

  export interface GetDriversResult {
    drivers: Driver[];
  }