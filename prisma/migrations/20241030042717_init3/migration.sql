/*
  Warnings:

  - You are about to drop the column `user_id` on the `pets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pets` DROP FOREIGN KEY `Pets_user_id_fkey`;

-- AlterTable
ALTER TABLE `pets` DROP COLUMN `user_id`,
    ADD COLUMN `usersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
