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
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomeImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

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
    `user_id` INTEGER NULL,

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
    `notes` TEXT NULL,
    `home_image_checked` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

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
    `user_id` INTEGER NOT NULL,
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
CREATE TABLE `VolunteerAvailabilitys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time_slot` VARCHAR(191) NOT NULL,
    `volunteer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HomeImages` ADD CONSTRAINT `HomeImages_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PetImages` ADD CONSTRAINT `PetImages_pet_id_fkey` FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adopts` ADD CONSTRAINT `Adopts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adopts` ADD CONSTRAINT `Adopts_pet_id_fkey` FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `VolunteerAvailabilitys` ADD CONSTRAINT `VolunteerAvailabilitys_volunteer_id_fkey` FOREIGN KEY (`volunteer_id`) REFERENCES `Volunteers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
