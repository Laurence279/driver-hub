import { Dialog } from "@/components/Dialog/Dialog";
import { Input } from "@/components/Input/Input";
import { Table } from "@/components/Table/Table";
import React, { ChangeEvent, useEffect, useState } from "react";
import { api } from "@/common/api";
import { Driver } from "@/types/driver";

export const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [drivers, setDrivers] = useState<Driver[]>();
  const [selectedDriverId, setSelectedDriverId] = useState<number>();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  async function getDrivers(filter?: string) {
    const drivers = await api.getDrivers(filter);
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