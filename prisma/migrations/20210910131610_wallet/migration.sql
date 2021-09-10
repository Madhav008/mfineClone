/*
  Warnings:

  - You are about to drop the column `doctorId` on the `DoctorWallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DoctorWallet" DROP COLUMN "doctorId",
ADD COLUMN     "doctorInfoId" INTEGER;

-- AddForeignKey
ALTER TABLE "DoctorWallet" ADD CONSTRAINT "DoctorWallet_doctorInfoId_fkey" FOREIGN KEY ("doctorInfoId") REFERENCES "DoctorInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
