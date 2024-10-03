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
  const drivers = await prisma.driver.findMany({
    include: {
      traces: {
        include: {
          activity: true
        }
      }
    }
  });
  console.log(drivers)
  res.status(200).json({ drivers });
}
