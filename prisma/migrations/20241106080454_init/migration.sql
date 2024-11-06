-- CreateTable
CREATE TABLE `DonationContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(191) NOT NULL,
    `title_th` VARCHAR(191) NOT NULL,
    `description_en` TEXT NOT NULL,
    `description_th` TEXT NOT NULL,
    `typing_en` VARCHAR(191) NOT NULL,
    `typing_th` VARCHAR(191) NOT NULL,
    `form_title_en` VARCHAR(191) NOT NULL,
    `form_title_th` VARCHAR(191) NOT NULL,
    `form_desc_en` VARCHAR(191) NOT NULL,
    `form_desc_th` VARCHAR(191) NOT NULL,
    `donation_options` JSON NOT NULL,
    `custom_amount_en` VARCHAR(191) NOT NULL,
    `custom_amount_th` VARCHAR(191) NOT NULL,
    `impact_message_en` TEXT NOT NULL,
    `impact_message_th` TEXT NOT NULL,
    `donate_button_en` VARCHAR(191) NOT NULL,
    `donate_button_th` VARCHAR(191) NOT NULL,
    `close_button_en` VARCHAR(191) NOT NULL,
    `close_button_th` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
