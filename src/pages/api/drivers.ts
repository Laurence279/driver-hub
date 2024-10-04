// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import { Driver } from "@/types/drivers";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  drivers: Driver[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const filter = req.query.filter;
  const drivers = await prisma.driver.findMany({
    include: {
      traces: {
        include: {
          activity: true
        }
      }
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
  res.status(200).json({ drivers });
}
