import { Box } from "@/components/Box/Box";
import { Dialog } from "@/components/Dialog/Dialog";
import { Input } from "@/components/Input/Input";
import { Table, TableRow } from "@/components/Table/Table";
import prisma from "@/lib/prisma";
import { Driver, DriverDetails, GetDriversResult } from "@/types/drivers";
import { NextApiResponse } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";

export const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [drivers, setDrivers] = useState<Driver[]>();
  const [selectedDriverId, setSelectedDriverId] = useState<number>();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  async function getDrivers(filter?: string) {
    const res = await fetch(`/api/drivers?filter=${filter ? filter : ""}`);
    const { drivers } = await res.json() as GetDriversResult;
    setDrivers(drivers);
    setLoading(false);
  }
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    getDrivers(e.target.value);
  }
  
  const handleViewDriver = async (driverId: number) => {
    setShowDialog(true);
    setSelectedDriverId(driverId);
  }

  useEffect(() => {
    getDrivers();
  }, []);

  if (loading) {
    return <div></div>
  }

  return (
    <>
      <Input label="Search entries:" onChange={handleChange} />
      <br />
      {drivers && drivers.length ? (
        <>
          <Table drivers={drivers} onView={handleViewDriver} />
          <Dialog driver={drivers.find(d => d.id === selectedDriverId)} open={showDialog} onClose={() => setShowDialog(false)} />
        </>
      ) : (
        <div>No drivers found..</div>
      )}
    </>
  );
}

export default Home;