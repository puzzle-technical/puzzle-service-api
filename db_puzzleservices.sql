-- MySQL Script generated by MySQL Workbench
-- Sun Nov 29 12:28:25 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_puzzleservices
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_puzzleservices` ;
USE `db_puzzleservices` ;

-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_admin` (
  `idAdmin` INT(9) NULL DEFAULT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `email` VARCHAR(40) UNIQUE NOT NULL,
  `senha` VARCHAR(150) NOT NULL,
  `senhaSalt` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idAdmin`));


-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_users` (
  `idUser` INT(9) NULL DEFAULT NULL AUTO_INCREMENT,
  `tipoUser` ENUM('client', 'provider') NOT NULL DEFAULT 'client',
  `status` ENUM('pendente', 'ativo', 'suspenso', 'inativo') NOT NULL DEFAULT 'pendente', 
  `cpf` VARCHAR(14) UNIQUE NOT NULL,
  `nome` VARCHAR(80) NOT NULL,
  `email` VARCHAR(40) UNIQUE NOT NULL,
  `celular` VARCHAR(16) NOT NULL,
  `dataNasc` DATE NOT NULL,
  `logradouro` VARCHAR(80) NOT NULL,
  `numero` CHAR(5) NOT NULL,
  `complemento` VARCHAR(30) NULL DEFAULT NULL,
  `bairro` VARCHAR(50) NOT NULL,
  `cidade` VARCHAR(40) NOT NULL,
  `uf` CHAR(2) NOT NULL,
  `cep` CHAR(11) NOT NULL,
  `avaliacao` FLOAT NULL DEFAULT NULL,
  `infoAdicional` VARCHAR(300) NULL,
  `senha` VARCHAR(150) NOT NULL,
  `senhaSalt` VARCHAR(50) NOT NULL,
  `avatar` VARCHAR(100),
  `puzzlePoints` INT(10),
  PRIMARY KEY (`idUser`));

-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_categories` (
  `idCategory` INT(9) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL UNIQUE,
  `image` VARCHAR(150),
  `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
  PRIMARY KEY (`idCategory`));

  
-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_subcategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_subcategories` (
  `idSubcategory` INT(9) NOT NULL AUTO_INCREMENT,
  `idCategory` INT(9) NOT NULL,
  `nome` VARCHAR(80) NOT NULL UNIQUE,
  `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
  PRIMARY KEY (`idSubcategory`),
  INDEX `fk_subcategories_idCategory` (`idCategory` ASC),
  CONSTRAINT `fk_subcategories_idCategory`
    FOREIGN KEY (`idCategory`)
    REFERENCES `db_puzzleservices`.`tb_categories` (`idCategory`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_users_subcategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_users_subcategories` (
  `idSubcategory` INT(9) NOT NULL,
  `idUser` INT(9) NOT NULL,
  PRIMARY KEY (`idSubcategory`, `idUser`),
  INDEX `fk_users_categories_idSubcategory` (`idSubcategory` ASC),
  INDEX `fk_categories_providers_idUser` (`idUser` ASC),
  CONSTRAINT `fk_users_categories_idSubcategory`
    FOREIGN KEY (`idSubcategory`)
    REFERENCES `db_puzzleservices`.`tb_subcategories` (`idSubcategory`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categories_providers_idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `db_puzzleservices`.`tb_users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_services` (
  `idService` INT(9) NULL DEFAULT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `status` ENUM('rascunho', 'aberto', 'fechado', 'inativo', 'expirado') NOT NULL DEFAULT 'rascunho',
  `descricao` VARCHAR(250) NOT NULL,
  `dataPublic` DATETIME NOT NULL,
  `dataExp` DATE NOT NULL,
  `idUser` INT(9) NOT NULL,
  `idBudget` INT(9) NULL,
  `receivers` VARCHAR(150),
  `receiversOnly` INT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idService`),
  INDEX `fk_idUser` (`idUser` ASC),
  INDEX `fk_idBudget` (`idBudget` ASC),
  CONSTRAINT `fk_idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `db_puzzleservices`.`tb_users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_budgets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_budgets` (
  `idBudget` INT(9) NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(250) NOT NULL,
  `status` ENUM('recusado', 'selecionado', 'aberto', 'cancelado', 'concluido') NOT NULL DEFAULT 'aberto',
  `dataPublic` DATETIME NULL DEFAULT NULL,
  `idService` INT(9) NOT NULL,
  `idUser` INT(9) NOT NULL,
  PRIMARY KEY (`idBudget`),
  INDEX `fk_budgets_idService` (`idService` ASC),
  INDEX `fk_budgets_idUser` (`idUser` ASC),
  CONSTRAINT `fk_budgets_idService`
    FOREIGN KEY (`idService`)
    REFERENCES `db_puzzleservices`.`tb_services` (`idService`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_budgets_idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `db_puzzleservices`.`tb_users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_subcategories_services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_subcategories_services` (
  `idService` INT(9) NOT NULL,
  `idSubcategory` INT(9) NOT NULL,
  PRIMARY KEY (`idService`,`idSubcategory`),
  INDEX `fk_subcategories_services_idService` (`idService` ASC),
  INDEX `fk_subcategories_services_idSubcategory` (`idSubcategory` ASC),
  CONSTRAINT `fk_subcategories_services_idService`
    FOREIGN KEY (`idService`)
    REFERENCES `db_puzzleservices`.`tb_services` (`idService`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subcategories_services_idSubcategory`
    FOREIGN KEY (`idSubcategory`)
    REFERENCES `db_puzzleservices`.`tb_subcategories` (`idSubcategory`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);



-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_users_openedservices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_users_openedservices` (
  `idService` INT(9) NOT NULL,
  `idUser` INT(9) NOT NULL,
  PRIMARY KEY (`idService`,`idUser`),
  INDEX `fk_users_openedservices_idService` (`idService` ASC),
  INDEX `fk_users_openedservices_idUser` (`idUser` ASC),
  CONSTRAINT `fk_users_openedservices_idService`
    FOREIGN KEY (`idService`)
    REFERENCES `db_puzzleservices`.`tb_services` (`idService`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_openedservices_idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `db_puzzleservices`.`tb_users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_users_locations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_users_locations` (
  `idLocation` INT(9) NOT NULL AUTO_INCREMENT,
  `idUser` INT(9) NOT NULL,
  `nome` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`idLocation`),
  INDEX `fk__users_locations_idUser` (`idUser` ASC),
  CONSTRAINT `fk__users_locations_idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `db_puzzleservices`.`tb_users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);



-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_services_locations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_services_locations` (
  `idService` INT(9) NOT NULL,
  `uf` CHAR(2) NOT NULL,
  `cep` CHAR(11) NOT NULL,
  `logradouro` VARCHAR(80) NOT NULL,
  `numero` CHAR(5) NOT NULL,
  `complemento` VARCHAR(30) NULL DEFAULT NULL,
  `bairro` VARCHAR(50) NOT NULL,
  `cidade` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`idService`),
  INDEX `fk__services_locations_idService` (`idService` ASC),
  CONSTRAINT `fk__services_locations_idService`
    FOREIGN KEY (`idService`)
    REFERENCES `db_puzzleservices`.`tb_services` (`idService`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_users_ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_users_ratings` (
  `idRatedUser` INT(9) NOT NULL,
  `idEvaluatorUser` INT(9) NOT NULL,
  `value` INT(9) NOT NULL,
  PRIMARY KEY (`idRatedUser`,`idEvaluatorUser`),
  INDEX `fk_users_openedservices_idRatedUser` (`idRatedUser` ASC),
  INDEX `fk_users_openedservices_idEvaluatorUser` (`idEvaluatorUser` ASC),
  CONSTRAINT `fk_users_openedservices_idRatedUser`
    FOREIGN KEY (`idRatedUser`)
    REFERENCES `db_puzzleservices`.`tb_users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_openedservices_idEvaluatorUser`
    FOREIGN KEY (`idEvaluatorUser`)
    REFERENCES `db_puzzleservices`.`tb_users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `db_puzzleservices`.`tb_notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_puzzleservices`.`tb_notifications` (
  `idNotification` INT(9) NOT NULL AUTO_INCREMENT,
  `status` ENUM('pendente', 'visto', 'inativo') NOT NULL DEFAULT 'pendente',
  `idUser` INT(9) NOT NULL,
  `message` VARCHAR(150) NOT NULL,
  `data` DATETIME NOT NULL,
  PRIMARY KEY (`idNotification`),
  INDEX `fk__notification_idUser` (`idUser` ASC),
  CONSTRAINT `fk__notification_idUser`
    FOREIGN KEY (`idUser`)
    REFERENCES `db_puzzleservices`.`tb_users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
