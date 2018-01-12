-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema autodb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `autodb` ;

-- -----------------------------------------------------
-- Schema autodb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `autodb` DEFAULT CHARACTER SET utf8 ;
USE `autodb` ;

-- -----------------------------------------------------
-- Table `autodb`.`contact`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`contact` ;

CREATE TABLE IF NOT EXISTS `autodb`.`contact` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `address_1` VARCHAR(45) NULL,
  `address_2` VARCHAR(45) NULL,
  `zipcode` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `latitude` VARCHAR(45) NULL,
  `longitude` VARCHAR(45) NULL,
  `active` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`rating` ;

CREATE TABLE IF NOT EXISTS `autodb`.`rating` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `rating` DECIMAL(10,0) NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`business`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`business` ;

CREATE TABLE IF NOT EXISTS `autodb`.`business` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `contact_id` INT(11) NOT NULL,
  `rating_id` INT(11) NULL DEFAULT NULL,
  `labor_rate` DECIMAL(10,0) NOT NULL,
  `company_name` TEXT NOT NULL,
  `experience` INT(11) NULL DEFAULT NULL,
  `website` VARCHAR(45) NULL DEFAULT NULL,
  `active` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_business_contact_idx` (`contact_id` ASC),
  INDEX `fk_business_rating_idx` (`rating_id` ASC),
  CONSTRAINT `fk_contact_business`
    FOREIGN KEY (`contact_id`)
    REFERENCES `autodb`.`contact` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_business`
    FOREIGN KEY (`rating_id`)
    REFERENCES `autodb`.`rating` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`user` ;

CREATE TABLE IF NOT EXISTS `autodb`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `contact_id` INT(11) NULL,
  `rating_id` INT(11) NULL DEFAULT NULL,
  `is_admin` TINYINT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `active` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`id` ASC),
  INDEX `fk_user_contact_idx` (`contact_id` ASC),
  INDEX `fk_user_rating_idx` (`rating_id` ASC),
  CONSTRAINT `fk_user_contact`
    FOREIGN KEY (`contact_id`)
    REFERENCES `autodb`.`contact` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_rating`
    FOREIGN KEY (`rating_id`)
    REFERENCES `autodb`.`rating` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`business_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`business_user` ;

CREATE TABLE IF NOT EXISTS `autodb`.`business_user` (
  `user_id` INT(11) NULL,
  `business_id` INT(11) NULL,
  INDEX `fk_user_business_user_idx` (`user_id` ASC),
  INDEX `fk_business_business_user_idx` (`business_id` ASC),
  CONSTRAINT `fk_business_business_user`
    FOREIGN KEY (`business_id`)
    REFERENCES `autodb`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_business_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `autodb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`certification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`certification` ;

CREATE TABLE IF NOT EXISTS `autodb`.`certification` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `business_id` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_business_idx` (`business_id` ASC),
  CONSTRAINT `fk_business_certifications`
    FOREIGN KEY (`business_id`)
    REFERENCES `autodb`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`part`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`part` ;

CREATE TABLE IF NOT EXISTS `autodb`.`part` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `cost` DECIMAL(10,0) NOT NULL,
  `serial_number` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`vehicle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`vehicle` ;

CREATE TABLE IF NOT EXISTS `autodb`.`vehicle` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `make` VARCHAR(45) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `year` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `vin` VARCHAR(20) NOT NULL,
  `mileage` INT(11) NOT NULL,
  `active` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_auto_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_auto_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `autodb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`request` ;

CREATE TABLE IF NOT EXISTS `autodb`.`request` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `vehicle_id` INT(11) NOT NULL,
  `complete_date` TIMESTAMP NULL,
  `completed` TINYINT(4) NULL DEFAULT 0,
  `img` TEXT NULL DEFAULT NULL,
  `expire_date` TIMESTAMP NULL DEFAULT NULL,
  `post_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `estimate` DECIMAL(10,0) NULL DEFAULT 0.0,
  `active` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_req_user_idx` (`user_id` ASC),
  INDEX `fk_req_auto_idx` (`vehicle_id` ASC),
  CONSTRAINT `fk_req_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `autodb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_req_vehicle`
    FOREIGN KEY (`vehicle_id`)
    REFERENCES `autodb`.`vehicle` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`quote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`quote` ;

CREATE TABLE IF NOT EXISTS `autodb`.`quote` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `estimate` DECIMAL(10,0) NOT NULL,
  `post_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `description` TEXT NULL DEFAULT NULL,
  `request_id` INT(11) NOT NULL,
  `complete_date` TIMESTAMP NULL DEFAULT NULL,
  `expire_date` TIMESTAMP NULL DEFAULT NULL,
  `business_id` INT(11) NOT NULL,
  `active` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_business_quote_idx` (`business_id` ASC),
  INDEX `FK_reqId_idx` (`request_id` ASC),
  CONSTRAINT `FK_business_quote`
    FOREIGN KEY (`business_id`)
    REFERENCES `autodb`.`business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_reqId`
    FOREIGN KEY (`request_id`)
    REFERENCES `autodb`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`parts_quote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`parts_quote` ;

CREATE TABLE IF NOT EXISTS `autodb`.`parts_quote` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `quote_id` INT(11) NOT NULL,
  `part_id` INT(11) NOT NULL,
  INDEX `fk_parts_parts_quote_idx` (`quote_id` ASC),
  INDEX `fk_part_parts_quote_idx` (`part_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_part_parts_quote`
    FOREIGN KEY (`part_id`)
    REFERENCES `autodb`.`part` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_quote_parts_quote`
    FOREIGN KEY (`quote_id`)
    REFERENCES `autodb`.`quote` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `autodb`.`parts_request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `autodb`.`parts_request` ;

CREATE TABLE IF NOT EXISTS `autodb`.`parts_request` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `part_id` INT(11) NOT NULL,
  `request_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_parts_parts_request_idx` (`part_id` ASC),
  INDEX `fk_request_parts_request_idx` (`request_id` ASC),
  CONSTRAINT `fk_parts_parts_request`
    FOREIGN KEY (`part_id`)
    REFERENCES `autodb`.`part` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_request_parts_request`
    FOREIGN KEY (`request_id`)
    REFERENCES `autodb`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO auto@localhost;
 DROP USER auto@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'auto'@'localhost' IDENTIFIED BY 'auto';

GRANT ALL ON `autodb`.* TO 'auto'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `autodb`.`contact`
-- -----------------------------------------------------
START TRANSACTION;
USE `autodb`;
INSERT INTO `autodb`.`contact` (`id`, `city`, `state`, `address_1`, `address_2`, `zipcode`, `phone`, `email`, `latitude`, `longitude`, `active`) VALUES (1, 'Seattle', 'WA', '783 Hollow avenue', NULL, '89393', '303-728-0970', 'allen.jackson@outlook.com', NULL, NULL, 1);
INSERT INTO `autodb`.`contact` (`id`, `city`, `state`, `address_1`, `address_2`, `zipcode`, `phone`, `email`, `latitude`, `longitude`, `active`) VALUES (2, 'Phoenix', 'AZ', '897 Black st', NULL, '83939', '202-393-9999', 'brian.tanney@outlook.com', NULL, NULL, 1);
INSERT INTO `autodb`.`contact` (`id`, `city`, `state`, `address_1`, `address_2`, `zipcode`, `phone`, `email`, `latitude`, `longitude`, `active`) VALUES (3, 'Denver', 'CO', 'Arapahoe Rd 909', NULL, '20202', '888-888-8888', 'Victor.black@gmail.com', NULL, NULL, 1);
INSERT INTO `autodb`.`contact` (`id`, `city`, `state`, `address_1`, `address_2`, `zipcode`, `phone`, `email`, `latitude`, `longitude`, `active`) VALUES (4, 'Kansas City', 'MO', '905 E Newton', NULL, '39393', '888-888-8888', 'Freddy.fingers@hotmail.com', NULL, NULL, 1);
INSERT INTO `autodb`.`contact` (`id`, `city`, `state`, `address_1`, `address_2`, `zipcode`, `phone`, `email`, `latitude`, `longitude`, `active`) VALUES (5, 'San diego', 'CA', 'Imperial drive 202', NULL, '89191', '888-888-8888', 'Bob.bishop@live.com', NULL, NULL, 1);
INSERT INTO `autodb`.`contact` (`id`, `city`, `state`, `address_1`, `address_2`, `zipcode`, `phone`, `email`, `latitude`, `longitude`, `active`) VALUES (6, 'San Francisco', 'CA', NULL, NULL, '45344', '888-888-8888', 'StumpAuto@live.com', NULL, NULL, 1);
INSERT INTO `autodb`.`contact` (`id`, `city`, `state`, `address_1`, `address_2`, `zipcode`, `phone`, `email`, `latitude`, `longitude`, `active`) VALUES (7, 'Memphis', 'TN', NULL, NULL, '84988', '888-888-8888', 'OliverSanchez@meet.com', NULL, NULL, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `autodb`.`rating`
-- -----------------------------------------------------
START TRANSACTION;
USE `autodb`;
INSERT INTO `autodb`.`rating` (`id`, `rating`) VALUES (1, 5);
INSERT INTO `autodb`.`rating` (`id`, `rating`) VALUES (2, 2.0);
INSERT INTO `autodb`.`rating` (`id`, `rating`) VALUES (3, 3.8);
INSERT INTO `autodb`.`rating` (`id`, `rating`) VALUES (4, 4.3);
INSERT INTO `autodb`.`rating` (`id`, `rating`) VALUES (5, 4.6);
INSERT INTO `autodb`.`rating` (`id`, `rating`) VALUES (6, 3.0);
INSERT INTO `autodb`.`rating` (`id`, `rating`) VALUES (7, 3.0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `autodb`.`business`
-- -----------------------------------------------------
START TRANSACTION;
USE `autodb`;
INSERT INTO `autodb`.`business` (`id`, `contact_id`, `rating_id`, `labor_rate`, `company_name`, `experience`, `website`, `active`) VALUES (1, 6, 6, 25, 'StumpsAuto', 0, NULL, 1);
INSERT INTO `autodb`.`business` (`id`, `contact_id`, `rating_id`, `labor_rate`, `company_name`, `experience`, `website`, `active`) VALUES (2, 7, 7, 20, 'Oliver\'s', 0, NULL, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `autodb`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `autodb`;
INSERT INTO `autodb`.`user` (`id`, `password`, `first_name`, `last_name`, `contact_id`, `rating_id`, `is_admin`, `username`, `active`) VALUES (1, 'pwd123', 'Allen', 'Jackson', 1, 1, 0, 'Allen-Jackson', 1);
INSERT INTO `autodb`.`user` (`id`, `password`, `first_name`, `last_name`, `contact_id`, `rating_id`, `is_admin`, `username`, `active`) VALUES (2, 'pwd123', 'Brian', 'Tanney', 2, 2, 0, 'Brian-Tanney', 1);
INSERT INTO `autodb`.`user` (`id`, `password`, `first_name`, `last_name`, `contact_id`, `rating_id`, `is_admin`, `username`, `active`) VALUES (3, 'pwd123', 'Victor', 'Black', 3, 3, 0, 'Victor-Black', 1);
INSERT INTO `autodb`.`user` (`id`, `password`, `first_name`, `last_name`, `contact_id`, `rating_id`, `is_admin`, `username`, `active`) VALUES (4, 'pwd123', 'Freddy', 'Fingers', 4, 4, 0, 'Freddy-Fingers', 1);
INSERT INTO `autodb`.`user` (`id`, `password`, `first_name`, `last_name`, `contact_id`, `rating_id`, `is_admin`, `username`, `active`) VALUES (5, 'pwd123', 'Bob', 'Bishop', 5, 5, 0, 'Bob-Bishop', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `autodb`.`certification`
-- -----------------------------------------------------
START TRANSACTION;
USE `autodb`;
INSERT INTO `autodb`.`certification` (`id`, `business_id`, `name`) VALUES (1, 1, 'Automotive master');
INSERT INTO `autodb`.`certification` (`id`, `business_id`, `name`) VALUES (2, 2, 'Oil picker upper');

COMMIT;


-- -----------------------------------------------------
-- Data for table `autodb`.`vehicle`
-- -----------------------------------------------------
START TRANSACTION;
USE `autodb`;
INSERT INTO `autodb`.`vehicle` (`id`, `make`, `model`, `year`, `user_id`, `vin`, `mileage`, `active`) VALUES (1, 'Ford', 'Escape', 2006, 1, '30903820983', 1277777, 1);
INSERT INTO `autodb`.`vehicle` (`id`, `make`, `model`, `year`, `user_id`, `vin`, `mileage`, `active`) VALUES (2, 'Ford', 'Fusion', 2017, 2, '33209320983', 393993, 1);
INSERT INTO `autodb`.`vehicle` (`id`, `make`, `model`, `year`, `user_id`, `vin`, `mileage`, `active`) VALUES (3, 'Chevorlet', 'Cobalt', 2007, 3, '87878363622', 90000, 1);
INSERT INTO `autodb`.`vehicle` (`id`, `make`, `model`, `year`, `user_id`, `vin`, `mileage`, `active`) VALUES (4, 'Ford', 'Bronco', 1982, 3, '87822828228', 300000, 1);
INSERT INTO `autodb`.`vehicle` (`id`, `make`, `model`, `year`, `user_id`, `vin`, `mileage`, `active`) VALUES (5, 'BMW', 'Series 2', 2018, 4, '382827171717', 939393, 1);

COMMIT;

-- -----------------------------------------------------
-- Data for table `autodb`.`request`
-- -----------------------------------------------------
START TRANSACTION;
USE `autodb`;
INSERT INTO `autodb`.`request` (`id`, `user_id`, `description`, `vehicle_id`, `complete_date`, `completed`, `img`, `expire_date`, `post_date`, `estimate`, `active`) VALUES (1, 1, 'Need work', 1, NULL, 0, NULL, NULL, NULL, 0.0, 1);
INSERT INTO `autodb`.`request` (`id`, `user_id`, `description`, `vehicle_id`, `complete_date`, `completed`, `img`, `expire_date`, `post_date`, `estimate`, `active`) VALUES (2, 2, 'Need work', 2, NULL, 0, NULL, NULL, NULL, 0.0, 1);
INSERT INTO `autodb`.`request` (`id`, `user_id`, `description`, `vehicle_id`, `complete_date`, `completed`, `img`, `expire_date`, `post_date`, `estimate`, `active`) VALUES (3, 3, 'Need work', 3, NULL, 0, NULL, NULL, NULL, 0.0, 1);

COMMIT;

-- -----------------------------------------------------
-- Data for table `autodb`.`quote`
-- -----------------------------------------------------
START TRANSACTION;
USE `autodb`;
INSERT INTO `autodb`.`quote` (`id`, `estimate`, `post_date`, `description`, `request_id`, `complete_date`, `expire_date`, `business_id`) VALUES (1, 69.99, '2018-01-02 11:30:45', '60k Maintenence', 1, '2018-01-08 09:30:00', '', 1);
INSERT INTO `autodb`.`quote` (`id`, `estimate`, `post_date`, `description`, `request_id`, `complete_date`, `expire_date`, `business_id`) VALUES (2, 19.99, '2018-01-11 10:05:45', 'Oil Change', 2, '', '', 2);
INSERT INTO `autodb`.`quote` (`id`, `estimate`, `post_date`, `description`, `request_id`, `complete_date`, `expire_date`, `business_id`) VALUES (3, 9.99, '2018-01-06 06:30:45', 'Air Filter', 3, '2018-01-09 09:30:00', '2018-01-08 09:30:00', 1);

COMMIT;
