/*
  Warnings:

  - Added the required column `foodName` to the `orderItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_orderId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderId_fkey";

-- AlterTable
ALTER TABLE "orderItems" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "foodName" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "paidAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
