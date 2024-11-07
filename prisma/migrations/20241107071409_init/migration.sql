-- AlterTable
ALTER TABLE `Events` ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Pets` ADD COLUMN `deleted_at` DATETIME(3) NULL;
