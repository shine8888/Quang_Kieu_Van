/*
  Warnings:

  - You are about to alter the column `timestamp` on the `flight` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `flight` ADD COLUMN `flightSequenceNumber` INTEGER NULL,
    ADD COLUMN `parentId` VARCHAR(50) NULL,
    MODIFY `timestamp` TIMESTAMP NOT NULL;
