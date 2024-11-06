/*
  Warnings:

  - You are about to drop the column `address` on the `contactinfo` table. All the data in the column will be lost.
  - You are about to drop the column `adoptions` on the `contactinfo` table. All the data in the column will be lost.
  - You are about to drop the column `generalInfo` on the `contactinfo` table. All the data in the column will be lost.
  - You are about to drop the column `openingTimes` on the `contactinfo` table. All the data in the column will be lost.
  - Added the required column `address_en` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_th` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adoptions_en` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adoptions_th` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_en` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_th` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generalInfo_en` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generalInfo_th` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `header_en` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `header_th` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTimes_en` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTimes_th` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contactinfo` DROP COLUMN `address`,
    DROP COLUMN `adoptions`,
    DROP COLUMN `generalInfo`,
    DROP COLUMN `openingTimes`,
    ADD COLUMN `address_en` TEXT NOT NULL,
    ADD COLUMN `address_th` TEXT NOT NULL,
    ADD COLUMN `adoptions_en` TEXT NOT NULL,
    ADD COLUMN `adoptions_th` TEXT NOT NULL,
    ADD COLUMN `content_en` LONGTEXT NOT NULL,
    ADD COLUMN `content_th` LONGTEXT NOT NULL,
    ADD COLUMN `generalInfo_en` TEXT NOT NULL,
    ADD COLUMN `generalInfo_th` TEXT NOT NULL,
    ADD COLUMN `header_en` TEXT NOT NULL,
    ADD COLUMN `header_th` TEXT NOT NULL,
    ADD COLUMN `openingTimes_en` TEXT NOT NULL,
    ADD COLUMN `openingTimes_th` TEXT NOT NULL;
