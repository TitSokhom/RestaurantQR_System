/*
  Warnings:

  - Added the required column `capacity` to the `tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone` to the `tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tables" ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "zone" TEXT NOT NULL,
ALTER COLUMN "tableNumber" SET DATA TYPE TEXT;
