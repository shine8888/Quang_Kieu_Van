-- CreateTable
CREATE TABLE `flight` (
    `id` VARCHAR(191) NOT NULL,
    `from` VARCHAR(50) NOT NULL,
    `to` VARCHAR(50) NOT NULL,
    `ip_address` VARCHAR(50) NOT NULL,
    `timestamp` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
