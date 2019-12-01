-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dancedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dancedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dancedb` DEFAULT CHARACTER SET utf8 ;
USE `dancedb` ;

-- -----------------------------------------------------
-- Table `dancedb`.`Pair`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dancedb`.`Pair` ;

CREATE TABLE IF NOT EXISTS `dancedb`.`Pair` (
  `idPair` INT NOT NULL AUTO_INCREMENT,
  `name1` VARCHAR(45) NULL,
  `name2` VARCHAR(45) NULL,
  `school` VARCHAR(45) NULL,
  PRIMARY KEY (`idPair`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dancedb`.`Event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dancedb`.`Event` ;

CREATE TABLE IF NOT EXISTS `dancedb`.`Event` (
  `idEvent` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `judgeToken` VARCHAR(12) NULL,
  `judges` INT NULL,
  `pairLimit` INT NULL,
  `finalLimit` INT NULL,
  `date` VARCHAR(15) NULL,
  `isClosed` BINARY(1) NULL,
  `percent` REAL NULL,
  PRIMARY KEY (`idEvent`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `idEvent_UNIQUE` ON `dancedb`.`Event` (`idEvent` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `dancedb`.`Heat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dancedb`.`Heat` ;

CREATE TABLE IF NOT EXISTS `dancedb`.`Heat` (
  `idHeat` INT NOT NULL AUTO_INCREMENT,
  `danceType` VARCHAR(45) NULL,
  `eventId` INT NOT NULL,
  `pairId` INT NOT NULL,
  `isActive` BINARY NULL,
  `roundIndex` INT NULL,
  PRIMARY KEY (`idHeat`),
  CONSTRAINT `pairs`
    FOREIGN KEY (`pairId`)
    REFERENCES `dancedb`.`Pair` (`idPair`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `events`
    FOREIGN KEY (`eventId`)
    REFERENCES `dancedb`.`Event` (`idEvent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `pair_idx` ON `dancedb`.`Heat` (`pairId` ASC) VISIBLE;

CREATE INDEX `event_idx` ON `dancedb`.`Heat` (`eventId` ASC) VISIBLE;

CREATE UNIQUE INDEX `idHeat_UNIQUE` ON `dancedb`.`Heat` (`idHeat` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `dancedb`.`Judge`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dancedb`.`Judge` ;

CREATE TABLE IF NOT EXISTS `dancedb`.`Judge` (
  `idJudge` INT NOT NULL AUTO_INCREMENT,
  `judge_name` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`idJudge`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dancedb`.`Results`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dancedb`.`Results` ;

CREATE TABLE IF NOT EXISTS `dancedb`.`Results` (
  `idResults` INT NOT NULL AUTO_INCREMENT,
  `point` INT NULL,
  `round_id` VARCHAR(12) NULL,
  `pair_id` INT NOT NULL,
  `dancetype` VARCHAR(45) NULL,
  `judgeId` INT NOT NULL,
  `eventId` INT NOT NULL,
  PRIMARY KEY (`idResults`),
  CONSTRAINT `pair`
    FOREIGN KEY (`pair_id`)
    REFERENCES `dancedb`.`Pair` (`idPair`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `eventsId`
    FOREIGN KEY (`eventId`)
    REFERENCES `dancedb`.`Event` (`idEvent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `judges`
    FOREIGN KEY (`judgeId`)
    REFERENCES `dancedb`.`Judge` (`idJudge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `pair_idx` ON `dancedb`.`Results` (`pair_id` ASC) VISIBLE;

CREATE INDEX `event_idx` ON `dancedb`.`Results` (`eventId` ASC) VISIBLE;

CREATE INDEX `judges_idx` ON `dancedb`.`Results` (`judgeId` ASC) VISIBLE;

CREATE UNIQUE INDEX `idResults_UNIQUE` ON `dancedb`.`Results` (`idResults` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
