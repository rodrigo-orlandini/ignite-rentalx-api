/*
  Warnings:

  - A unique constraint covering the columns `[licensePlate]` on the table `Cars` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cars_licensePlate_key" ON "Cars"("licensePlate");
