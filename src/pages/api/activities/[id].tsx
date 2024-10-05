// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import { Activities, Driver, DriverDetails, GetDriverByIdResult } from "@/types/drivers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
    if (!req.query.id) {
        return res.status(400);
    } 
  const id = parseInt(req.query.id?.toString());

    const data = await prisma.activity.groupBy({
        by: ["type"],
        _sum: {
            duration: true
        },
        orderBy: {
            type: "asc"
        },
        where: {
            driverId: id
        }
    });

    const activity = data.map((a) => {
        return {
            type: a.type,
            duration: a._sum.duration
        }
    })

  res.status(200).json({ activity });
}
