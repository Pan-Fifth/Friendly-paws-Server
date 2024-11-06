/*
  Warnings:

  - You are about to drop the column `img_content_en` on the `aboutcontent` table. All the data in the column will be lost.
  - You are about to drop the column `img_content_th` on the `aboutcontent` table. All the data in the column will be lost.
  - You are about to drop the column `main_content_en` on the `aboutcontent` table. All the data in the column will be lost.
  - You are about to drop the column `main_content_th` on the `aboutcontent` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `eventbanner` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `tablecontact` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `tablecontact` table. All the data in the column will be lost.
  - Added the required column `description_en` to the `AboutContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_th` to the `AboutContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `header_en` to the `AboutContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `header_th` to the `AboutContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `help_content_en` to the `AboutContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `help_content_th` to the `AboutContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `help_title_en` to the `AboutContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `help_title_th` to the `AboutContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_url` to the `AboutContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image1` to the `EventBanner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adoptions` to the `TableContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generalInfo` to the `TableContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTimes` to the `TableContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TableContact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aboutcontent` DROP COLUMN `img_content_en`,
    DROP COLUMN `img_content_th`,
    DROP COLUMN `main_content_en`,
    DROP COLUMN `main_content_th`,
    ADD COLUMN `description_en` TEXT NOT NULL,
    ADD COLUMN `description_th` TEXT NOT NULL,
    ADD COLUMN `header_en` TEXT NOT NULL,
    ADD COLUMN `header_th` TEXT NOT NULL,
    ADD COLUMN `help_content_en` TEXT NOT NULL,
    ADD COLUMN `help_content_th` TEXT NOT NULL,
    ADD COLUMN `help_title_en` VARCHAR(191) NOT NULL,
    ADD COLUMN `help_title_th` VARCHAR(191) NOT NULL,
    ADD COLUMN `video_url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `eventbanner` DROP COLUMN `image`,
    ADD COLUMN `image1` VARCHAR(191) NOT NULL,
    ADD COLUMN `image2` VARCHAR(191) NULL,
    ADD COLUMN `image3` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tablecontact` DROP COLUMN `email`,
    DROP COLUMN `hours`,
    ADD COLUMN `adoptions` VARCHAR(191) NOT NULL,
    ADD COLUMN `generalInfo` VARCHAR(191) NOT NULL,
    ADD COLUMN `openingTimes` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
