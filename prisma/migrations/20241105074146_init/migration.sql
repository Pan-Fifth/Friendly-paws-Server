-- AlterTable
ALTER TABLE `AboutContent` MODIFY `main_content_en` LONGTEXT NOT NULL,
    MODIFY `main_content_th` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `HomeContent` MODIFY `content_en` LONGTEXT NOT NULL,
    MODIFY `content_th` LONGTEXT NOT NULL;
