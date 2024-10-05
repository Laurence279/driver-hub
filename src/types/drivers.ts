import { Activity, Prisma, Trace } from "@prisma/client";

  export interface GetDriversResult {
    drivers: Driver[];
  }

  export interface GetDriverByIdResult {
    driver: DriverDetails;
  }

  export interface Driver {
    id: number;
    forename: string;
    surname: string;
    vehicleRegistration: string;
    totalActivity: number;
    daysActive: string[];
  }

  export interface DriverDetails {
    id: number,
    forename: string,
    surname: string;
    activities: Record<Activity["type"], number>;
  }

export interface Activity {
    type: "work" | "rest" | "available" | "drive";
    duration: number;
}