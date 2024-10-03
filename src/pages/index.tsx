import { Box } from "@/components/Box/Box";
import prisma from "@/lib/prisma";
import { Driver } from "@/types/drivers";
import { GetStaticProps } from "next";
import { ClientPageRoot } from "next/dist/client/components/client-page";
import React from "react";

interface Props {
  drivers: Driver[];
}

function sumHours(total: number, current: number) {
  return total + current;
}

export const Home: React.FC<Props> = ({ drivers }) => {
  const days: string[] = [
    "2021-02-01",
    "2021-02-02",
    "2021-02-03",
    "2021-02-04",
    "2021-02-05",
    "2021-02-06",
    "2021-02-07"
  ];

  return (
    <>
      <ul>
        {drivers.map((driver) => {
          const activities = driver.traces.map(t => t.activity).flat();
          const totalHours = activities.map(a => a.duration).reduce(sumHours, 0);
          const daysActive = new Set(driver.traces.map(t => t.date));
          return (
            <div key={driver.id} className="card">
              <span>{driver.surname.toUpperCase()} {driver.forename}</span>
              <span>{driver.vehicleRegistration}</span>
              <span>{totalHours} Hours</span>
              <div className="boxes">
                {days.map((day) => {
                  return <Box key={`box-${day}`} fill={daysActive.has(day)} />
                })}
              </div>
            </div>
          )
        })}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const drivers = await prisma.driver.findMany({
    include: {
      traces: {
        include: {
          activity: true
        }
      }
    }
  })
  return {
    props: { drivers },
    revalidate: 10,
  };
};

export default Home;