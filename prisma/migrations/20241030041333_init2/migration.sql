/*
  Warnings:

  - You are about to drop the `volunteeravailabilitys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `volunteeravailabilitys` DROP FOREIGN KEY `VolunteerAvailabilitys_volunteer_id_fkey`;

-- DropTable
DROP TABLE `volunteeravailabilitys`;

-- CreateTable
CREATE TABLE `VolunteerAvailabilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time_slot` VARCHAR(191) NOT NULL,
    `volunteer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VolunteerAvailabilities` ADD CONSTRAINT `VolunteerAvailabilities_volunteer_id_fkey` FOREIGN KEY (`volunteer_id`) REFERENCES `Volunteers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
