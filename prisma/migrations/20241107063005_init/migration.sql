-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `resettoken` VARCHAR(191) NULL,
    `resettokenExpire` DATETIME(3) NULL,
    `googleId` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'VOLUNTEER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_googleId_key`(`googleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomeImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `adopt_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_en` VARCHAR(191) NOT NULL,
    `name_th` VARCHAR(191) NOT NULL,
    `age` DATETIME(3) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `type` ENUM('DOG', 'CAT') NOT NULL,
    `status` ENUM('AVAILABLE', 'PENDING', 'ADOPTED', 'FOSTERED', 'UNAVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
    `breed_en` VARCHAR(191) NULL,
    `breed_th` VARCHAR(191) NULL,
    `description_en` TEXT NULL,
    `description_th` TEXT NULL,
    `medical_history` TEXT NULL,
    `is_vaccinated` BOOLEAN NOT NULL DEFAULT false,
    `is_neutered` BOOLEAN NOT NULL DEFAULT false,
    `weight` DOUBLE NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `usersId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PetImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `pet_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adopts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `pet_id` INTEGER NOT NULL,
    `status` ENUM('AVAILABLE', 'PENDING', 'ADOPTED', 'FOSTERED', 'UNAVAILABLE') NOT NULL DEFAULT 'PENDING',
    `address` VARCHAR(191) NOT NULL,
    `career` VARCHAR(191) NOT NULL,
    `workTime` VARCHAR(191) NOT NULL,
    `workPlace` VARCHAR(191) NOT NULL,
    `dayOff` VARCHAR(191) NOT NULL,
    `salary` INTEGER NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `socialContact` VARCHAR(191) NULL,
    `current_pet_count` INTEGER NOT NULL,
    `current_pet_details` TEXT NOT NULL,
    `family_member_count` INTEGER NOT NULL,
    `family_always_home` BOOLEAN NOT NULL,
    `alone_hours` INTEGER NULL,
    `housing_type` ENUM('OWN_HOUSE', 'RENTAL_HOUSE', 'CONDO', 'APARTMENT', 'RENTAL_ROOM', 'SINGLE_HOUSE') NOT NULL,
    `has_garden` BOOLEAN NOT NULL,
    `has_fence` BOOLEAN NOT NULL,
    `can_walk_dog` BOOLEAN NOT NULL,
    `delivery_type` ENUM('REQUIRE_DELIVERY', 'PICK_UP') NOT NULL,
    `approved_at` DATETIME(3) NULL,
    `approved_by` INTEGER NULL,
    `why` TEXT NULL,
    `home_image_checked` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `usersId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccommodationImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `adopt_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `total` INTEGER NOT NULL,
    `payment_method` ENUM('CREDIT', 'PROMPTPAY') NOT NULL,
    `transaction_id` VARCHAR(191) NOT NULL,
    `is_recurring` BOOLEAN NOT NULL DEFAULT false,
    `receipt_url` VARCHAR(191) NULL,
    `status` ENUM('DONE', 'PENDING', 'CANCEL') NOT NULL DEFAULT 'PENDING',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Donates_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_en` VARCHAR(191) NOT NULL,
    `title_th` VARCHAR(191) NOT NULL,
    `description_en` TEXT NOT NULL,
    `description_th` TEXT NOT NULL,
    `date_start` DATETIME(3) NOT NULL,
    `date_end` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'POSTPONED') NOT NULL DEFAULT 'PENDING',
    `location` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventAttendees` (
    `event_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`event_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Volunteers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `description_th` VARCHAR(191) NULL,
    `description_en` VARCHAR(191) NULL,

    UNIQUE INDEX `Volunteers_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VolunteerSkills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `volunteer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VolunteerAvailabilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time_slot` VARCHAR(191) NOT NULL,
    `volunteer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DonationGoals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `targetAmount` INTEGER NOT NULL,
    `targetPets` INTEGER NOT NULL,
    `petsHelped` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `DonationGoals_year_key`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomeContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image1` VARCHAR(191) NOT NULL,
    `image2` VARCHAR(191) NOT NULL,
    `image3` VARCHAR(191) NOT NULL,
    `content_en` LONGTEXT NOT NULL,
    `content_th` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AboutContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `video_url` VARCHAR(191) NOT NULL,
    `header_en` TEXT NOT NULL,
    `header_th` TEXT NOT NULL,
    `description_en` TEXT NOT NULL,
    `description_th` TEXT NOT NULL,
    `help_title_en` VARCHAR(191) NOT NULL,
    `help_title_th` VARCHAR(191) NOT NULL,
    `help_content_en` TEXT NOT NULL,
    `help_content_th` TEXT NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventBanner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image1` VARCHAR(191) NOT NULL,
    `image2` VARCHAR(191) NULL,
    `image3` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TableContact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `hours` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `ContactInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_en` TEXT NOT NULL,
    `header_th` TEXT NOT NULL,
    `content_en` LONGTEXT NOT NULL,
    `content_th` LONGTEXT NOT NULL,
    `generalInfo_en` TEXT NOT NULL,
    `generalInfo_th` TEXT NOT NULL,
    `adoptions_en` TEXT NOT NULL,
    `adoptions_th` TEXT NOT NULL,
    `phone` TEXT NOT NULL,
    `openingTimes_en` TEXT NOT NULL,
    `openingTimes_th` TEXT NOT NULL,
    `address_th` TEXT NOT NULL,
    `address_en` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HomeImages` ADD CONSTRAINT `HomeImages_adopt_id_fkey` FOREIGN KEY (`adopt_id`) REFERENCES `Adopts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PetImages` ADD CONSTRAINT `PetImages_pet_id_fkey` FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adopts` ADD CONSTRAINT `Adopts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adopts` ADD CONSTRAINT `Adopts_pet_id_fkey` FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adopts` ADD CONSTRAINT `Adopts_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adopts` ADD CONSTRAINT `Adopts_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccommodationImages` ADD CONSTRAINT `AccommodationImages_adopt_id_fkey` FOREIGN KEY (`adopt_id`) REFERENCES `Adopts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donates` ADD CONSTRAINT `Donates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventImages` ADD CONSTRAINT `EventImages_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventAttendees` ADD CONSTRAINT `EventAttendees_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventAttendees` ADD CONSTRAINT `EventAttendees_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Volunteers` ADD CONSTRAINT `Volunteers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerSkills` ADD CONSTRAINT `VolunteerSkills_volunteer_id_fkey` FOREIGN KEY (`volunteer_id`) REFERENCES `Volunteers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerAvailabilities` ADD CONSTRAINT `VolunteerAvailabilities_volunteer_id_fkey` FOREIGN KEY (`volunteer_id`) REFERENCES `Volunteers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
