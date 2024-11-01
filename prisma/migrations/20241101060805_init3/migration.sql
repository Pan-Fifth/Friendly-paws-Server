-- AlterTable
ALTER TABLE `adopts` ADD COLUMN `usersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Adopts` ADD CONSTRAINT `Adopts_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adopts` ADD CONSTRAINT `Adopts_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
