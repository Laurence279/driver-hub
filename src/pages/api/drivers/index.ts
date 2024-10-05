import { sum } from "@/common/helpers";
import prisma from "@/lib/prisma";
import { Driver, GetDriversResult } from "@/types/driver";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetDriversResult>,
) {
  const filter = req.query.filter;
  const data = await prisma.driver.findMany({
    include: {
      activities: {
        select: {
          duration: true
        }
      },
      traces: {
        select: {
          date: true
        }
      }
    },
    orderBy: {
      surname: "asc"
    },
    where: filter ? {
      OR: [
        {
          forename: {
            contains: filter?.toString(),
          },
        },
        { surname: {
          contains: filter?.toString()
        } },
        {
          vehicleRegistration: {
            contains: filter.toString()
          }
        }
      ]
    }: {}});

    const drivers: Driver[] = data.map((d) => {
      return {
        id: d.id,
        forename: d.forename,
        surname: d.surname,
        vehicleRegistration: d.vehicleRegistration,
        totalActivity: d.activities.map(a => a.duration).reduce(sum, 0),
        daysActive: d.traces.map(t => t.date)
      }
    });

  res.status(200).json({ drivers });
}
