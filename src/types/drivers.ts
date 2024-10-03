import { Prisma } from "@prisma/client"

export type Driver = Prisma.DriverGetPayload<{
    include: {
      traces: {
        include: {
          activity: boolean
        }
      }
    }
  }>