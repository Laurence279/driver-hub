-- CreateTable
CREATE TABLE "Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "surname" TEXT NOT NULL,
    "forename" TEXT NOT NULL,
    "vehicleRegistration" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Trace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    CONSTRAINT "Trace_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "traceId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    CONSTRAINT "Activity_traceId_fkey" FOREIGN KEY ("traceId") REFERENCES "Trace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Activity_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_id_key" ON "Driver"("id");
