import { Activity, GetActivityByDriverIdResult } from "@/types/activity";
import { Driver, GetDriversResult } from "@/types/driver";


async function getDrivers(filter?: string): Promise<Driver[]> {
    const res = await fetch(`/api/drivers?filter=${filter ? filter : ""}`);
    const { drivers } = await res.json() as GetDriversResult;
    return drivers;
}

async function getActivitiesByDriverId(driverId: number): Promise<Activity[]> {
    const res = await fetch(`/api/activities/${driverId}`);
    const { activities } = await res.json() as GetActivityByDriverIdResult;
    return activities;
}

export const api = {
    getDrivers,
    getActivitiesByDriverId
}

