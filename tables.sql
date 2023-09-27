
CREATE TABLE IF NOT EXISTS `MUNICIPIO` (
  `id_municipio` INT NOT null AUTO_INCREMENT,
  `nombre_municipio` VARCHAR(45) NULL,
  `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_municipio`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `USUARIO` (
  `ci` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `ap_paterno` VARCHAR(45) NULL,
  `ap_materno` VARCHAR(45) NULL,  
  `contraseña` VARCHAR(255) NULL,
  `email` VARCHAR(45) NULL,
  `telefono` VARCHAR(15) NULL,
  `genero` VARCHAR(10) NULL,
  `rol` VARCHAR(20) NULL,
  `estado` VARCHAR(10) NULL,
  `MUNICIPIO_id_municipio` INT NOT NULL,
  PRIMARY KEY (`ci`),
  INDEX `fk_USUARIO_MUNICIPIO1_idx` (`MUNICIPIO_id_municipio`),
  CONSTRAINT `fk_USUARIO_MUNICIPIO1`
    FOREIGN KEY (`MUNICIPIO_id_municipio`)
    REFERENCES `MUNICIPIO` (`id_municipio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE 

 
 -- ----------------------------------------------------------------------------------------------------------
 -- -----------------------------------------------------
-- Table `Proyectosv2`.`ENTIDAD_EJECUTORA`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `ENTIDAD_EJECUTORA` (
  `id_entidad_ejecutora` INT NOT null AUTO_INCREMENT,
  `nom_entidad_ejecutora` VARCHAR(128) NULL,
  `desc_entidad_ejecutora` VARCHAR(255) NULL,
    `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_entidad_ejecutora`))
ENGINE = InnoDB;
-- ----------------------------------------------------------------------------------------------------------- 
 
CREATE TABLE IF NOT EXISTS `CIUDAD_O_COMUNIDAD` (
  `id` INT NOT null AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `MUNICIPIO_id_municipio` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_CIUDAD_O_COMUNIDAD_MUNICIPIO1_idx` (`MUNICIPIO_id_municipio` ASC) VISIBLE,
  CONSTRAINT `fk_CIUDAD_O_COMUNIDAD_MUNICIPIO1`
    FOREIGN KEY (`MUNICIPIO_id_municipio`)
    REFERENCES `MUNICIPIO` (`id_municipio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- -----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `LINEAS_ESTRATEGICAS` (
  `id_linea_estrategica` INT NOT null AUTO_INCREMENT,
  `descripcion` VARCHAR(500) NULL,
    `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_linea_estrategica`)
) ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `LINEA_DE_ACCION` (
  `id_linea_accion` INT NOT null AUTO_INCREMENT,
  `descripcion` VARCHAR(500) NULL,
    `estado` VARCHAR(10) NULL,
  `LINEAS_ESTRATÉGICAS_id_linea_estrategica` INT NOT NULL,
  PRIMARY KEY (`id_linea_accion`),
  INDEX `fk_LINEA_DE_ACCION_LINEAS_ESTRATÉGICAS1_idx` (`LINEAS_ESTRATÉGICAS_id_linea_estrategica` ASC) VISIBLE,
  CONSTRAINT `fk_LINEA_DE_ACCION_LINEAS_ESTRATÉGICAS1`
    FOREIGN KEY (`LINEAS_ESTRATÉGICAS_id_linea_estrategica`)
    REFERENCES `LINEAS_ESTRATEGICAS` (`id_linea_estrategica`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ACCIONES_ESTRATEGICAS` (
  `id_acciones_estrategicas` INT NOT null AUTO_INCREMENT,
  `descripcion` VARCHAR(500) NULL,
   `estado` VARCHAR(10) NULL,
  `LINEA_DE_ACCION_id_linea_accion` INT NOT NULL,
  PRIMARY KEY (`id_acciones_estrategicas`),
  INDEX `fk_ACCIONES_ESTRATEGICAS_LINEA_DE_ACCION1_idx` (`LINEA_DE_ACCION_id_linea_accion` ASC) VISIBLE,
  CONSTRAINT `fk_ACCIONES_ESTRATEGICAS_LINEA_DE_ACCION1`
    FOREIGN KEY (`LINEA_DE_ACCION_id_linea_accion`)
    REFERENCES `LINEA_DE_ACCION` (`id_linea_accion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;




////// NDC, PDES, PPRH, ODS, PSDI-------------------/////


-- -----------------------------------------------------
-- Table `Proyectosv2`.`PDES`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `PDES` (
  `id_pdes` INT NOT null AUTO_INCREMENT,
  `nom_indicador_pdes` VARCHAR(255) NULL,
  `alcance_pdes` VARCHAR(255) NULL,
  PRIMARY KEY (`id_pdes`))



-- -----------------------------------------------------
-- Table `Proyectosv2`.`NDC`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `NDC` (
  `id_ndc` INT NOT null AUTO_INCREMENT,
  `nom_meta_ndc` VARCHAR(255) NULL,
  `alcance_ndc` VARCHAR(255) NULL,
  PRIMARY KEY (`id_ndc`))



-- -----------------------------------------------------
-- Table `Proyectosv2`.`PPRH`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `PPRH` (
  `id_pprh` INT NOT null AUTO_INCREMENT,
  `nom_indicador_pprh` VARCHAR(255) NULL,
  `alcance_pprh` VARCHAR(255) NULL,
  PRIMARY KEY (`id_pprh`))



-- -----------------------------------------------------
-- Table `Proyectosv2`.`ODS`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `ODS` (
  `id_ods` INT NOT null AUTO_INCREMENT,
  `nom_indicador_ods` VARCHAR(255) NULL,
  `alcance_ods` VARCHAR(255) NULL,
  PRIMARY KEY (`id_ods`))



-- -----------------------------------------------------
-- Table `Proyectosv2`.`PSDI`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `PSDI` (
  `id_psdi` INT NOT null AUTO_INCREMENT,
  `nom_indicador_psdi` VARCHAR(255) NULL,
  `alcance_psdi` VARCHAR(255) NULL,
  PRIMARY KEY (`id_psdi`)
) 


-- -----------------------------------------------------
-- Table `Proyectosv2`.`UNIDAD_MEDICION`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `UNIDAD_MEDICION` (
  `id_unidad_medicion` INT NOT null AUTO_INCREMENT,
  `nom_unidad` VARCHAR(45) NULL,
  `desc_unidad` VARCHAR(128) NULL,
  PRIMARY KEY (`id_unidad_medicion`))

  
  
-- implemntamos idnicador
  -- -----------------------------------------------------
-- Table `Proyectosv2`.`INDICADOR`
-- -----------------------------------------------------


-- Crear tabla INDICADOR
CREATE TABLE IF NOT EXISTS `INDICADOR` (
  `id_indicador` INT NOT NULL,
  `nombre_indicador` VARCHAR(255) NULL,
  `desc_indicador` VARCHAR(255) NULL,
   `estado` VARCHAR(10) NULL,
  `UNIDAD_MEDICION_id_medicion` INT NOT NULL,
  `PDES_id_pdes` INT NOT NULL,
  `NDC_id_ndc` INT NOT NULL,
  `PPRH_id_pprh` INT NOT NULL,
  `ODS_id_ods` INT NOT NULL,
  `PSDI_id_psdi` INT NOT NULL,
  PRIMARY KEY (`id_indicador`),
  INDEX `fk_INDICADOR_UNIDAD_MEDICION1_idx` (`UNIDAD_MEDICION_id_medicion` ASC) VISIBLE,
  INDEX `fk_INDICADOR_PDES1_idx` (`PDES_id_pdes` ASC) VISIBLE,
  INDEX `fk_INDICADOR_NDC1_idx` (`NDC_id_ndc` ASC) VISIBLE,
  INDEX `fk_INDICADOR_PPRH1_idx` (`PPRH_id_pprh` ASC) VISIBLE,
  INDEX `fk_INDICADOR_ODS1_idx` (`ODS_id_ods` ASC) VISIBLE,
  INDEX `fk_INDICADOR_PSDI1_idx` (`PSDI_id_psdi` ASC) VISIBLE,
  CONSTRAINT `fk_INDICADOR_UNIDAD_MEDICION1`
    FOREIGN KEY (`UNIDAD_MEDICION_id_medicion`)
    REFERENCES `UNIDAD_MEDICION` (`id_unidad_medicion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_INDICADOR_PDES1`
    FOREIGN KEY (`PDES_id_pdes`)
    REFERENCES `PDES` (`id_pdes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_INDICADOR_NDC1`
    FOREIGN KEY (`NDC_id_ndc`)
    REFERENCES `NDC` (`id_ndc`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_INDICADOR_PPRH1`
    FOREIGN KEY (`PPRH_id_pprh`)
    REFERENCES `PPRH` (`id_pprh`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_INDICADOR_ODS1`
    FOREIGN KEY (`ODS_id_ods`)
    REFERENCES `ODS` (`id_ods`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_INDICADOR_PSDI1`
    FOREIGN KEY (`PSDI_id_psdi`)
    REFERENCES `PSDI` (`id_psdi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) 
  
//-----------------------etapa 3 -------------------
-- Tabla CATEGORIA
CREATE TABLE IF NOT EXISTS `CATEGORIA` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nom_categoria` VARCHAR(45) NULL,
  `estado` VARCHAR(10) NULL,
  `desc_categoria` VARCHAR(255) NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE = InnoDB;

-- Tabla PROYECTO
CREATE TABLE IF NOT EXISTS `PROYECTO` (
  `id_proyecto` INT NOT NULL AUTO_INCREMENT,
  `nom_proyecto` VARCHAR(500) NULL,
  `fecha_inicio` DATE NULL,
  `fecha_fin` DATE NULL,
  `area` VARCHAR(45) NULL,
  `coordenada_x` VARCHAR(45) NULL,
  `coordenada_y` VARCHAR(45) NULL,
  `CATEGORIA_id_categoria` INT NOT NULL,
  `TIPOLOGIA_id_tipologia` INT NOT NULL,
  `INDICADOR_id_indicador` INT NOT NULL,
  `ACCIONES_ESTRATEGICAS_id_acciones_estrategicas` INT NOT NULL,
   `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_proyecto`),
  INDEX `fk_PROYECTO_CATEGORIA_idx` (`CATEGORIA_id_categoria` ASC) VISIBLE,
  INDEX `fk_PROYECTO_TIPOLOGIA_idx` (`TIPOLOGIA_id_tipologia` ASC) VISIBLE,
  INDEX `fk_PROYECTO_INDICADOR_idx` (`INDICADOR_id_indicador` ASC) VISIBLE,
  INDEX `fk_PROYECTO_ACCIONES_ESTRATEGICAS_idx` (`ACCIONES_ESTRATEGICAS_id_acciones_estrategicas` ASC) VISIBLE,
  INDEX `fk_ALCANCE_PROYECTO1_idx` (`id_proyecto`, `CATEGORIA_id_categoria` ASC) VISIBLE, -- Índice agregado
  CONSTRAINT `fk_PROYECTO_CATEGORIA`
    FOREIGN KEY (`CATEGORIA_id_categoria`)
    REFERENCES `CATEGORIA` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PROYECTO_TIPOLOGIA`
    FOREIGN KEY (`TIPOLOGIA_id_tipologia`)
    REFERENCES `TIPOLOGIA` (`id_tipologia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PROYECTO_INDICADOR`
    FOREIGN KEY (`INDICADOR_id_indicador`)
    REFERENCES `INDICADOR` (`id_indicador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PROYECTO_ACCIONES_ESTRATEGICAS`
    FOREIGN KEY (`ACCIONES_ESTRATEGICAS_id_acciones_estrategicas`)
    REFERENCES `ACCIONES_ESTRATEGICAS` (`id_acciones_estrategicas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- categoria empezamos
 CREATE TABLE IF NOT EXISTS `CATEGORIA` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nom_categoria` VARCHAR(45) NULL,
   `estado` VARCHAR(10) NULL,
  `desc_categoria` VARCHAR(255) NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ENTIDAD_FINANCIERA` (
  `id_entidad_finan` INT NOT NULL AUTO_INCREMENT,
  `nom_entidad_finan` VARCHAR(45) NULL,
  `desc_entidad_finan` VARCHAR(255) NULL,
  `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_entidad_finan`)
) ENGINE = InnoDB;





-- tablas para crear UNIDAD_MEDICION ,ALCANCE,PROYECTO_CIUDAD_COMUNIDAD,TIPOLOGIA,ETAPA,FUENTE DE INFORMACIÓN

- -----------------------------------------------------
-- Table `Proyectosv2`.`TIPOLOGIA`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `TIPOLOGIA` (
  `id_tipologia` INT NOT null AUTO_INCREMENT,
  `nom_tipologia` VARCHAR(45) NULL,
  PRIMARY KEY (`id_tipologia`))
ENGINE = InnoDB;


- -----------------------------------------------------
-- Table `Proyectosv2`.`UNIDAD_MEDICION`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `UNIDAD_MEDICION` (
  `id_unidad_medicion` INT NOT null AUTO_INCREMENT,
  `nom_unidad` VARCHAR(45) NULL,
  `desc_unidad` VARCHAR(128) NULL,
  PRIMARY KEY (`id_unidad_medicion`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `Proyectosv2`.`ALCANCE`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `ALCANCE` (
  `id_alcance` INT NOT NULL AUTO_INCREMENT,
  `cantidad` DECIMAL NULL,
  `UNIDAD_MEDICION_id_medicion` INT NOT NULL,
  `PROYECTO_id_proyecto` INT NOT NULL,
  `PROYECTO_CATEGORIA_id_categoria` INT NOT NULL,
  PRIMARY KEY (`id_alcance`),
  INDEX `fk_Alcance_UNIDAD_MEDICION1_idx` (`UNIDAD_MEDICION_id_medicion` ASC),
  INDEX `fk_ALCANCE_PROYECTO1_idx` (`PROYECTO_id_proyecto` ASC, `PROYECTO_CATEGORIA_id_categoria` ASC),
  CONSTRAINT `fk_Alcance_UNIDAD_MEDICION1`
    FOREIGN KEY (`UNIDAD_MEDICION_id_medicion`)
    REFERENCES `UNIDAD_MEDICION` (`id_unidad_medicion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ALCANCE_PROYECTO1`
    FOREIGN KEY (`PROYECTO_id_proyecto`, `PROYECTO_CATEGORIA_id_categoria`)
    REFERENCES `PROYECTO` (`id_proyecto`, `CATEGORIA_id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- Table `Proyectosv2`.`CIUDAD_O_COMUNIDAD`

CREATE TABLE IF NOT EXISTS CIUDAD_O_COMUNIDAD (
  id_ciudad_comunidad INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NULL,
  MUNICIPIO_id_municipio INT NOT NULL,
  PRIMARY KEY (id_ciudad_comunidad),
  INDEX fk_CIUDAD_O_COMUNIDAD_MUNICIPIO_idx (MUNICIPIO_id_municipio ASC),
  CONSTRAINT fk_CIUDAD_O_COMUNIDAD_MUNICIPIO
    FOREIGN KEY (MUNICIPIO_id_municipio)
    REFERENCES MUNICIPIO (id_municipio)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- Table `Proyectosv2`.`PROYECTO_CIUDAD_O_COMUNIDAD`


CREATE TABLE IF NOT EXISTS `PROYECTO_CIUDAD_O_COMUNIDAD` (
  `PROYECTO_id_proyecto` INT NOT null AUTO_INCREMENT,
  `CIUDAD_O_COMUNIDAD_id_ciudad_comunidad` INT NOT NULL,
  INDEX `fk_PROYECTO_CIUDAD_O_COMUNIDAD_PROYECTO_idx` (`PROYECTO_id_proyecto` ASC),
  INDEX `fk_PROYECTO_CIUDAD_O_COMUNIDAD_CIUDAD_COMUNIDAD_idx` (`CIUDAD_O_COMUNIDAD_id_ciudad_comunidad` ASC),
  CONSTRAINT `fk_PROYECTO_CIUDAD_O_COMUNIDAD_PROYECTO`
    FOREIGN KEY (`PROYECTO_id_proyecto`)
    REFERENCES `PROYECTO` (`id_proyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PROYECTO_CIUDAD_O_COMUNIDAD_CIUDAD_COMUNIDAD`
    FOREIGN KEY (`CIUDAD_O_COMUNIDAD_id_ciudad_comunidad`)
    REFERENCES `CIUDAD_O_COMUNIDAD` (`id_ciudad_comunidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- Table `Proyectosv2`.`ETAPA`

CREATE TABLE IF NOT EXISTS `ETAPA` (
  `id_etapa` INT NOT null AUTO_INCREMENT,
  `nom_etapa` VARCHAR(45) NULL,
  `peso_etapa` DECIMAL(10,2) NULL,
  `desc_etapa` VARCHAR(255) NULL,
  `TIPOLOGIA_id_tipologia` INT NOT NULL,
  PRIMARY KEY (`id_etapa`),
  INDEX `fk_ETAPA_TIPOLOGIA1_idx` (`TIPOLOGIA_id_tipologia` ASC) VISIBLE,
  CONSTRAINT `fk_ETAPA_TIPOLOGIA1`
    FOREIGN KEY (`TIPOLOGIA_id_tipologia`)
    REFERENCES `TIPOLOGIA` (`id_tipologia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- Table `Proyectosv2`.`FUENTE_DE_INFORMACION`

CREATE TABLE IF NOT EXISTS `FUENTE_DE_INFORMACION` (
  `id_fuente_informacion` INT NOT null AUTO_INCREMENT,
  `nom_fuente_informacion` VARCHAR(45) NULL,
  `desc_fuente_inf` VARCHAR(255) NULL,
  PRIMARY KEY (`id_fuente_informacion`)
)
ENGINE = InnoDB;