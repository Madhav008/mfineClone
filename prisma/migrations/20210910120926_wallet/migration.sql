/*
  Warnings:

  - You are about to drop the column `doctorWalletId` on the `DoctorInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DoctorInfo" DROP CONSTRAINT "DoctorInfo_doctorWalletId_fkey";

-- AlterTable
ALTER TABLE "DoctorInfo" DROP COLUMN "doctorWalletId";
