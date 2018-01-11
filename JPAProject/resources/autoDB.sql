-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema AutoDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `AutoDB` ;

-- -----------------------------------------------------
-- Schema AutoDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `AutoDB` DEFAULT CHARACTER SET utf8 ;
USE `AutoDB` ;

-- -----------------------------------------------------
-- Table `AutoDB`.`contact`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`contact` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`contact` (
  `id` INT NOT NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `address_1` VARCHAR(45) NULL,
  `address_2` VARCHAR(45) NULL,
  `zipcode` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `latitude` TEXT NULL,
  `long` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`rating` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`rating` (
  `id` INT NOT NULL,
  `rating` DECIMAL NULL DEFAULT 0.0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`user` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`user` (
  `id` INT NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `contact_id` INT NOT NULL,
  `rating_id` INT NULL,
  `is_admin` TINYINT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`id` ASC),
  INDEX `fk_user_contact_idx` (`contact_id` ASC),
  INDEX `fk_user_rating_idx` (`rating_id` ASC),
  CONSTRAINT `fk_user_contact`
    FOREIGN KEY (`contact_id`)
    REFERENCES `AutoDB`.`contact` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_rating`
    FOREIGN KEY (`rating_id`)
    REFERENCES `AutoDB`.`rating` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`business`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`business` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`business` (
  `id` INT NOT NULL,
  `contact_id` INT NOT NULL,
  `specialty_id` INT NOT NULL,
  `rating_id` INT NULL,
  `labor_rate` DECIMAL NOT NULL,
  `company_name` TEXT NOT NULL,
  `experience` INT NULL,
  `website` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_business_contact_idx` (`contact_id` ASC),
  INDEX `fk_business_rating_idx` (`rating_id` ASC),
  CONSTRAINT `fk_contact_business`
    FOREIGN KEY (`contact_id`)
    REFERENCES `AutoDB`.`contact` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_business`
    FOREIGN KEY (`rating_id`)
    REFERENCES `AutoDB`.`rating` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`vehicle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`vehicle` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`vehicle` (
  `id` INT NOT NULL,
  `make` VARCHAR(45) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `year` INT NOT NULL,
  `user_id` INT NOT NULL,
  `vin` VARCHAR(20) NOT NULL,
  `mileage` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_auto_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_auto_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `AutoDB`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`request` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`request` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `vehicle_id` INT NOT NULL,
  `complete_date` TIMESTAMP NULL,
  `completed` TINYINT NULL DEFAULT 0,
  `active` TINYINT NULL DEFAULT 1,
  `img` TEXT NULL,
  `expire_date` TIMESTAMP NULL,
  `post_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `estimate` DECIMAL NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_req_user_idx` (`user_id` ASC),
  INDEX `fk_req_auto_idx` (`vehicle_id` ASC),
  CONSTRAINT `fk_req_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `AutoDB`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_req_vehicle`
    FOREIGN KEY (`vehicle_id`)
    REFERENCES `AutoDB`.`vehicle` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`quote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`quote` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`quote` (
  `id` INT NOT NULL,
  `estimate` DECIMAL NOT NULL,
  `post_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `description` TEXT NULL,
  `request_id` INT NOT NULL,
  `complete_date` TIMESTAMP NULL,
  `expire_date` TIMESTAMP NULL,
  `business_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_business_quote_idx` (`business_id` ASC),
  INDEX `FK_reqId_idx` (`request_id` ASC),
  CONSTRAINT `FK_business_quote`
    FOREIGN KEY (`business_id`)
    REFERENCES `AutoDB`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_reqId`
    FOREIGN KEY (`request_id`)
    REFERENCES `AutoDB`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`part`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`part` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`part` (
  `id` INT NOT NULL,
  `name` TEXT NOT NULL,
  `cost` DECIMAL NOT NULL,
  `serial_number` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`certifications`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`certifications` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`certifications` (
  `id` INT NOT NULL,
  `business_id` INT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_business_idx` (`business_id` ASC),
  CONSTRAINT `fk_business_certifications`
    FOREIGN KEY (`business_id`)
    REFERENCES `AutoDB`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`parts_quote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`parts_quote` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`parts_quote` (
  `id` INT NOT NULL,
  `quote_id` INT NOT NULL,
  `part_id` INT NOT NULL,
  INDEX `fk_parts_parts_quote_idx` (`quote_id` ASC),
  INDEX `fk_part_parts_quote_idx` (`part_id` ASC),
  CONSTRAINT `fk_quote_parts_quote`
    FOREIGN KEY (`quote_id`)
    REFERENCES `AutoDB`.`quote` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_part_parts_quote`
    FOREIGN KEY (`part_id`)
    REFERENCES `AutoDB`.`part` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`parts_request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`parts_request` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`parts_request` (
  `id` INT NOT NULL,
  `part_id` INT NOT NULL,
  `request_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_parts_parts_request_idx` (`part_id` ASC),
  INDEX `fk_request_parts_request_idx` (`request_id` ASC),
  CONSTRAINT `fk_parts_parts_request`
    FOREIGN KEY (`part_id`)
    REFERENCES `AutoDB`.`part` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_request_parts_request`
    FOREIGN KEY (`request_id`)
    REFERENCES `AutoDB`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AutoDB`.`business_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AutoDB`.`business_user` ;

CREATE TABLE IF NOT EXISTS `AutoDB`.`business_user` (
  `user_id` INT NULL,
  `business_id` INT NULL,
  INDEX `fk_user_business_user_idx` (`user_id` ASC),
  INDEX `fk_business_business_user_idx` (`business_id` ASC),
  CONSTRAINT `fk_user_business_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `AutoDB`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_business_business_user`
    FOREIGN KEY (`business_id`)
    REFERENCES `AutoDB`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO auto@localhost;
 DROP USER auto@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'auto'@'localhost' IDENTIFIED BY 'auto';

GRANT ALL ON `AutoDB`.* TO 'auto'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
