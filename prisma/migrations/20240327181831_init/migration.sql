/*
  Warnings:

  - Made the column `nickname` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `nickname` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;
