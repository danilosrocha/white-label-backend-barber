/*
  Warnings:

  - Added the required column `barber_id` to the `haircuts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "haircuts" ADD COLUMN     "barber_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "haircuts" ADD CONSTRAINT "haircuts_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
