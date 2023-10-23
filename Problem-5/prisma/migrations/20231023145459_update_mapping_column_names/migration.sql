/*
  Warnings:

  - You are about to drop the column `flightSequenceNumber` on the `flight` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `flight` table. All the data in the column will be lost.
  - You are about to alter the column `timestamp` on the `flight` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `flight` DROP COLUMN `flightSequenceNumber`,
    DROP COLUMN `parentId`,
    ADD COLUMN `flight_sequence_number` INTEGER NULL,
    ADD COLUMN `parent_id` VARCHAR(50) NULL,
    MODIFY `timestamp` TIMESTAMP NOT NULL;
