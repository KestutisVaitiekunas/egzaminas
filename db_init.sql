-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema renginiai
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `renginiai` ;

-- -----------------------------------------------------
-- Schema renginiai
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `renginiai` DEFAULT CHARACTER SET utf8 ;
USE `renginiai` ;

-- -----------------------------------------------------
-- Table `renginiai`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renginiai`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(245) NOT NULL,
  `role` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renginiai`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renginiai`.`categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- insert to table `renginiai`.`categories`
-- -----------------------------------------------------
INSERT INTO categories (name)
VALUES 
    ('Meno renginiai'),
    ('Pramoginiai renginiai'),
    ('Sporto renginiai'),
    ('Sveikatos renginiai'),
    ('Socialiniai renginiai');
-- -----------------------------------------------------
-- Table `renginiai`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renginiai`.`events` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `users_id` INT UNSIGNED NULL,
  `categories_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_events_users_idx` (`users_id` ASC),
  INDEX `fk_events_categories1_idx` (`categories_id` ASC),
  CONSTRAINT `fk_events_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `renginiai`.`users` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_events_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `renginiai`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renginiai`.`ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renginiai`.`ratings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `events_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ratings_events1_idx` (`events_id` ASC),
  CONSTRAINT `fk_ratings_events1`
    FOREIGN KEY (`events_id`)
    REFERENCES `renginiai`.`events` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renginiai`.`tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renginiai`.`tokens` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(245) NOT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tokens_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_tokens_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `renginiai`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
