import { Box } from "@/components/Box/Box";
import { Input } from "@/components/Input/Input";
import { Table, TableRow } from "@/components/Table/Table";
import prisma from "@/lib/prisma";
import { Driver } from "@/types/drivers";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
  drivers: Driver[];
}

export const Home: React.FC<Props> = () => {
  const [drivers, setDrivers] = useState<Driver[]>();

  async function getDrivers(filter?: string) {
    const data = await fetch(`/api/drivers?filter=${filter ? filter : ""}`);
    const { drivers } = await data.json();
    setDrivers(drivers);
  }
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    getDrivers(e.target.value);
  }
  
  useEffect(() => {
    getDrivers();
  }, []);

  if (!drivers) {
    return <div>
      Loading...
    </div>
  }

  return (
    <>
      <Input label="Search entries:" onChange={handleChange} />
      <br />
      {drivers.length ? <Table drivers={drivers} /> : <div>No drivers found.</div>}
    </>
  );
}

export default Home;