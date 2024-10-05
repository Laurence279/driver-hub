export interface GetActivityByDriverIdResult {
    activities: Activity[];
  }

export interface Activity {
    day: string;
    type: "work" | "rest" | "available" | "drive";
    duration: number | null;
}