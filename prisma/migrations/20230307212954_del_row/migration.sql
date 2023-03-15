/*
  Warnings:

  - You are about to drop the `barber_availabilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "barber_availabilities" DROP CONSTRAINT "barber_availabilities_barber_id_fkey";

-- AlterTable
ALTER TABLE "barbers" ADD COLUMN     "available_at" TEXT[];

-- DropTable
DROP TABLE "barber_availabilities";
