/*
  Warnings:

  - You are about to drop the `WorkingDay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkingDay" DROP CONSTRAINT "WorkingDay_dayId_fkey";

-- DropForeignKey
ALTER TABLE "WorkingDay" DROP CONSTRAINT "WorkingDay_doctorInfoId_fkey";

-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "doctorInfoId" INTEGER;

-- DropTable
DROP TABLE "WorkingDay";

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_doctorInfoId_fkey" FOREIGN KEY ("doctorInfoId") REFERENCES "DoctorInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
