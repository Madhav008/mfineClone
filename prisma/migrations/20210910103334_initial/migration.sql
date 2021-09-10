/*
  Warnings:

  - You are about to drop the column `hospitalId` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `doctorWalletId` to the `DoctorInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorInfoId` to the `DotorWithdrawRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "DoctorWallet" DROP CONSTRAINT "DoctorWallet_doctorId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "hospitalId";

-- AlterTable
ALTER TABLE "DoctorInfo" ADD COLUMN     "doctorWalletId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DotorWithdrawRequest" ADD COLUMN     "doctorInfoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DoctorInfo" ADD CONSTRAINT "DoctorInfo_doctorWalletId_fkey" FOREIGN KEY ("doctorWalletId") REFERENCES "DoctorWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DotorWithdrawRequest" ADD CONSTRAINT "DotorWithdrawRequest_doctorInfoId_fkey" FOREIGN KEY ("doctorInfoId") REFERENCES "DoctorInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
