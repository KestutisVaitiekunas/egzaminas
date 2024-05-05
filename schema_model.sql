-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `test` ;

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8 ;
USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`tokens` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(45) NOT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tokens_users_idx` (`users_id` ASC),
  CONSTRAINT `fk_tokens_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `test`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`assets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`assets` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `users_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_assets_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_assets_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `test`.`users` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
