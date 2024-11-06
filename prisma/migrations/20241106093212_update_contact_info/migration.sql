/*
  Warnings:

  - You are about to drop the `tablecontact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `tablecontact`;

-- CreateTable
CREATE TABLE `ContactInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `generalInfo` TEXT NOT NULL,
    `adoptions` TEXT NOT NULL,
    `phone` TEXT NOT NULL,
    `openingTimes` TEXT NOT NULL,
    `address` TEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
