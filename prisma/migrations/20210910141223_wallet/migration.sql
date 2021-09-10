/*
  Warnings:

  - A unique constraint covering the columns `[doctorInfoId]` on the table `DoctorWallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DoctorWallet_doctorInfoId_unique" ON "DoctorWallet"("doctorInfoId");
