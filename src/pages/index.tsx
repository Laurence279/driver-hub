import prisma from "@/lib/prisma";
import { Activity } from "@/types/drivers";
import { Prisma, Trace } from "@prisma/client";
import { GetStaticProps } from "next";
import React, { useCallback } from "react";

type DriverWithDuration = Prisma.DriverGetPayload<{
  include: {
    traces: {
      include: {
        activity: {
          select: {
            duration: boolean
          }
        }
      }
    }
  }
}>

interface Props {
  drivers: DriverWithDuration[];
}

function sumHours(total: number, current: number) {
  return total + current;
}

export const Home: React.FC<Props> = ({ drivers }) => {

  return (
    <>
      <ul>
        {drivers.map((driver) => {
          const activities = driver.traces.map(t => t.activity).flat();
          const totalHours = activities.map(a => a.duration).reduce(sumHours, 0);
          return (
            <div key={driver.id} className="card">
              <span>{driver.surname.toUpperCase()} {driver.forename}</span>
              <span>{driver.vehicleRegistration}</span>
              <span>{totalHours} Hours</span>
              <div className="boxes">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
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
          activity: {
            select: {
              duration: true
            }
          }
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