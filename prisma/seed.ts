import { Activity, PrismaClient } from '@prisma/client';
import json from './drivers.json';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  for (const d of json.data) {
    const driver = await prisma.driver.create({
      data: {
        id: d.driverID,
        forename: d.forename,
        surname: d.surname,
        vehicleRegistration: d.vehicleRegistration,
        traces: {
          create: d.traces.map((t) => {
            return {
              date: t.date,
              activity: {
                create: t.activity.map((a) => {
                  return {
                    startTime: a.startTime,
                    duration: a.duration,
                    type: a.type,
                    driverId: d.driverID
                  }
                })
              }
            }
          })
        }
      }
    });
    console.log(`Created driver with id: ${driver.id}`);
  }
  console.log(`Seeding finished.`);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })