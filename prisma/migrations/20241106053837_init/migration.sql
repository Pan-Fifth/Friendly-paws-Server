/*
  Warnings:

  - You are about to drop the column `img_content_en` on the `AboutContent` table. All the data in the column will be lost.
  - You are about to drop the column `img_content_th` on the `AboutContent` table. All the data in the column will be lost.
  - You are about to drop the column `main_content_en` on the `AboutContent` table. All the data in the column will be lost.
  - You are about to drop the column `main_content_th` on the `AboutContent` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `EventBanner` table. All the data in the column will be lost.
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

*/
-- AlterTable
ALTER TABLE `AboutContent` DROP COLUMN `img_content_en`,
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
ALTER TABLE `EventBanner` DROP COLUMN `image`,
    ADD COLUMN `image1` VARCHAR(191) NOT NULL,
    ADD COLUMN `image2` VARCHAR(191) NULL,
    ADD COLUMN `image3` VARCHAR(191) NULL;
