import prisma from "@/lib/prisma";
import { Activity, GetActivityByDriverIdResult } from "@/types/activity";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetActivityByDriverIdResult>,
) {
    if (!req.query.id) {
        return res.status(400);
    } 
  const id = parseInt(req.query.id?.toString());

    const data = await prisma.activity.groupBy({
        by: ["type", "traceId"],
        _sum: {
            duration: true
        },
        orderBy: {
            traceId: "desc"
        },
        where: {
            driverId: id
        }
    });

    const days: {[key:string]: string} = {}

    for (const a of data) {
        const trace = await prisma.trace.findUnique({
            where: {
                id: a.traceId
            }
        });
        if (trace) {
            days[a.traceId] = trace.date;
        }
    }

    const activities: Activity[] = data.map((a) => {
        return {
            day: days[a.traceId.toString()],
            type: a.type as Activity["type"],
            duration: a._sum.duration
        }
    })

  res.status(200).json({ activities });
}
