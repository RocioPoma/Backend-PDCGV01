use bdd_proyectos_v01;

CREATE TABLE IF NOT EXISTS `MUNICIPIO` (
  `id_municipio` INT NOT null AUTO_INCREMENT,
  `nombre_municipio` VARCHAR(45) NULL,
  `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_municipio`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `ENTIDAD_EJECUTORA` (
  `id_entidad_ejecutora` INT NOT null AUTO_INCREMENT,
  `nom_entidad_ejecutora` VARCHAR(128) NULL,
  `desc_entidad_ejecutora` VARCHAR(255) NULL,
  `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_entidad_ejecutora`)
  )
ENGINE = InnoDB;

------------------------------------------------------------------------------------------------------------- 
CREATE TABLE IF NOT EXISTS `CIUDAD_O_COMUNIDAD` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `id_municipio` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_municipio`) REFERENCES `MUNICIPIO` (`id_municipio`)
  )
ENGINE = InnoDB;

-------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `LINEA_ESTRATEGICA` (
  `id_linea_estrategica` INT NOT null AUTO_INCREMENT,
  `descripcion` VARCHAR(500) NULL,
  `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_linea_estrategica`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `LINEA_DE_ACCION` (
  `id_linea_accion` INT NOT null AUTO_INCREMENT,
  `descripcion` VARCHAR(500) NULL,
  `estado` VARCHAR(10) NULL,
  `id_linea_estrategica` INT NOT NULL,
  PRIMARY KEY (`id_linea_accion`),
    FOREIGN KEY (`id_linea_estrategica`) REFERENCES `LINEA_ESTRATEGICA` (`id_linea_estrategica`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ACCION_ESTRATEGICA` (
  `id_accion_estrategica` INT NOT null AUTO_INCREMENT,
  `descripcion` VARCHAR(500) NULL,
  `estado` VARCHAR(10) NULL,
  `id_linea_accion` INT NOT NULL,
  PRIMARY KEY (`id_accion_estrategica`),
    FOREIGN KEY (`id_linea_accion`) REFERENCES `LINEA_DE_ACCION` (`id_linea_accion`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PDES`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `PDES` (
  `id_pdes` INT NOT null AUTO_INCREMENT,
  `nom_indicador_pdes` VARCHAR(255) NULL,
  `alcance_pdes` VARCHAR(255) NULL,
  PRIMARY KEY (`id_pdes`));

-- -----------------------------------------------------
-- Table `Proyectosv2`.`NDC`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `NDC` (
  `id_ndc` INT NOT null AUTO_INCREMENT,
  `nom_meta_ndc` VARCHAR(255) NULL,
  `alcance_ndc` VARCHAR(255) NULL,
  PRIMARY KEY (`id_ndc`));

-- -----------------------------------------------------
-- Table `Proyectosv2`.`PPRH`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `PPRH` (
  `id_pprh` INT NOT null AUTO_INCREMENT,
  `nom_indicador_pprh` VARCHAR(255) NULL,
  `alcance_pprh` VARCHAR(255) NULL,
  PRIMARY KEY (`id_pprh`));



-- -----------------------------------------------------
-- Table `Proyectosv2`.`ODS`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `ODS` (
  `id_ods` INT NOT null AUTO_INCREMENT,
  `nom_indicador_ods` VARCHAR(255) NULL,
  `alcance_ods` VARCHAR(255) NULL,
  PRIMARY KEY (`id_ods`));

-- -----------------------------------------------------
-- Table `PSDI`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `PSDI` (
  `id_psdi` INT NOT null AUTO_INCREMENT,
  `nom_indicador_psdi` VARCHAR(255) NULL,
  `alcance_psdi` VARCHAR(255) NULL,
  PRIMARY KEY (`id_psdi`)
) ;

-- -----------------------------------------------------
-- Table `UNIDAD_MEDICION`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `UNIDAD_MEDICION` (
  `id_unidad_medicion` INT NOT null AUTO_INCREMENT,
  `nom_unidad` VARCHAR(45) NULL,
  `desc_unidad` VARCHAR(128) NULL,
  PRIMARY KEY (`id_unidad_medicion`));
  

-- implemntamos idnicador
  -- -----------------------------------------------------
-- Table INDICADOR`
-- -----------------------------------------------------

-- Crear tabla INDICADOR
CREATE TABLE IF NOT EXISTS `INDICADOR` (
  `id_indicador` INT NOT NULL,
  `nombre_indicador` VARCHAR(255) NULL,
  `desc_indicador` VARCHAR(255) NULL,
  `estado` VARCHAR(10) NULL,
  `id_unidad_medicion` INT NOT NULL,
  `id_pdes` INT NOT NULL,
  `id_ndc` INT NOT NULL,
  `id_pprh` INT NOT NULL,
  `id_ods` INT NOT NULL,
  `id_psdi` INT NOT NULL,
  PRIMARY KEY (`id_indicador`),
    FOREIGN KEY (`id_unidad_medicion`)  REFERENCES `UNIDAD_MEDICION` (`id_unidad_medicion`), 
    FOREIGN KEY (`id_pdes`) REFERENCES `PDES` (`id_pdes`),
    FOREIGN KEY (`id_ndc`) REFERENCES `NDC` (`id_ndc`),
    FOREIGN KEY (`id_pprh`) REFERENCES `PPRH` (`id_pprh`),
    FOREIGN KEY (`id_ods`) REFERENCES `ODS` (`id_ods`),
    FOREIGN KEY (`id_psdi`) REFERENCES `PSDI` (`id_psdi`)
) ;
  
-- Tabla CATEGORIA
CREATE TABLE IF NOT EXISTS `CATEGORIA` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nom_categoria` VARCHAR(45) NULL,
  `estado` VARCHAR(10) NULL,
  `desc_categoria` VARCHAR(255) NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE = InnoDB;

-- Tabla TIPOLOGIA
CREATE TABLE IF NOT EXISTS `TIPOLOGIA` (
  `id_tipologia` INT NOT NULL AUTO_INCREMENT,
  `nom_tipologia` VARCHAR(45) NULL,
  PRIMARY KEY (`id_tipologia`))
ENGINE = InnoDB;

-- Tabla CUENCA
CREATE TABLE IF NOT EXISTS `CUENCA` (
  `id_cuenca` INT NOT NULL AUTO_INCREMENT,
  `nom_cuenca` VARCHAR(45) NULL,
  `desc_cuenca` VARCHAR(255) NULL,
  `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_cuenca`))
ENGINE = InnoDB;

-- Tabla PROYECTO
CREATE TABLE IF NOT EXISTS `PROYECTO` (
  `id_proyecto` INT NOT NULL AUTO_INCREMENT,
  `nom_proyecto` VARCHAR(500) NULL,
  `fecha_inicio` DATE NULL,
  `fecha_fin` DATE NULL,
  `fecha_registro` date,
  `area` VARCHAR(45) NULL,
  `coordenada_x` VARCHAR(45) NULL,
  `coordenada_y` VARCHAR(45) NULL,
  `cantidad` int,
  `hombres` int,
  `mujeres` int,
  `id_categoria` INT ,
  `id_tipologia` INT ,
  `id_indicador` INT ,
  `id_cuenca` INT ,
  `id_accion_estrategica` INT ,
  `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_proyecto`),
    FOREIGN KEY (`id_categoria`) REFERENCES `CATEGORIA` (`id_categoria`),
    FOREIGN KEY (`id_tipologia`) REFERENCES `TIPOLOGIA` (`id_tipologia`),
    FOREIGN KEY (`id_indicador`) REFERENCES `INDICADOR` (`id_indicador`),
    FOREIGN KEY (`id_cuenca`) REFERENCES `CUENCA` (`id_cuenca`),
    FOREIGN KEY (`id_accion_estrategica`) REFERENCES `ACCION_ESTRATEGICA` (`id_accion_estrategica`)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `ENTIDAD_FINANCIERA` (
  `id_entidad_finan` INT NOT NULL AUTO_INCREMENT,
  `nom_entidad_finan` VARCHAR(45) NULL,
  `desc_entidad_finan` VARCHAR(255) NULL,
  `estado` VARCHAR(10) NULL,
  PRIMARY KEY (`id_entidad_finan`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Proyectosv2`.`ALCANCE` REVISAR ALCANCE
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `ALCANCE` (
  
  `cantidad` DECIMAL,
  `id_unidad_medicion` INT NOT NULL,
  `id_proyecto` INT NOT NULL,
  
  PRIMARY KEY (`id_unidad_medicion`,`id_proyecto`),
  FOREIGN KEY (`id_unidad_medicion`) REFERENCES `UNIDAD_MEDICION` (`id_unidad_medicion`),
  FOREIGN KEY (`id_proyecto`) REFERENCES `PROYECTO` (`id_proyecto`)
)
ENGINE = InnoDB;

-- Table `PROYECTO_CIUDAD_O_COMUNIDAD`

CREATE TABLE IF NOT EXISTS `PROYECTO_CIUDAD_O_COMUNIDAD` (
  `id_proyecto` INT NOT null,
  `id_ciudad_comunidad` INT NOT NULL,
   FOREIGN KEY (`id_proyecto`) REFERENCES `PROYECTO` (`id_proyecto`),
   FOREIGN KEY (`id_ciudad_comunidad`) REFERENCES `CIUDAD_O_COMUNIDAD` (`id`),
   PRIMARY KEY (id_proyecto,id_ciudad_comunidad)
)
ENGINE = InnoDB;

-- Table `ETAPA`
CREATE TABLE IF NOT EXISTS `ETAPA` (
  `id_etapa` INT NOT null AUTO_INCREMENT,
  `nombre_etapa` VARCHAR(45) NULL,
  `peso_etapa` INT,
  `descripcion_etapa` VARCHAR(255) NULL,
  `id_tipologia` INT NOT NULL,
  PRIMARY KEY (`id_etapa`),
  FOREIGN KEY (`id_tipologia`) REFERENCES `TIPOLOGIA` (`id_tipologia`)
)
ENGINE = InnoDB;

---INSETAR 
INSERT INTO `linea_de_accion` (`id_linea_accion`, `descripcion`, `estado`, `id_linea_estrategica`) VALUES (NULL, 'Aprovisionamiento sostenible de agua para consumo humano', NULL, '1'), (NULL, 'Gestión integral de aguas residuales y residuos sólidos en la cuenca', NULL, '1'), (NULL, 'Desarrollo de alianzas estratégicas para mejorar la gestión del agua en la industria.', NULL, '1'), (NULL, 'Desarrollo de sistemas agropecuarios sustentables con enfoque de cuenca', NULL, '2'), (NULL, 'Uso eficiente del agua para la producción de cultivos de seguridad alimentaria y cultivos de alto valor.', NULL, '2'), (NULL, 'Desarrollo de prácticas para la conservación, restauración y manejo sustentable de la cabecera de cuenca.', NULL, '3'), (NULL, 'Gestión Sustentable de bosques en áreas Protegidas', NULL, '3'), (NULL, 'Gestión de la biodiversidad', NULL, '3'), (NULL, 'Operativización de los instrumentos de planificación y gestión territorial en la cuenca', NULL, '3'), (NULL, 'Gestión de los sistemas de aprovechamiento de aguas superficiales', NULL, '4'), (NULL, 'Gestión sustentable de aguas subterráneas', NULL, '4'), (NULL, 'Gestión de la calidad hídrica ambiental', NULL, '4'), (NULL, 'Fortalecer el monitoreo hidro-meteorológico e Implementar Sistema de Alerta Temprana (SAT)', NULL, '5'), (NULL, 'Desarrollar una estrategia de gestión del riesgo a nivel cuenca.', NULL, '5'), (NULL, 'Articular los programas para la ejecución de proyectos de Gestión del riesgo hidrometeorológico a nivel de cuenca.', NULL, '5'), (NULL, 'Fortalecimiento de la normativa subnacional para la gestión hídrica y ambiental', NULL, '6'), (NULL, 'Fortalecimiento de las capacidades institucionales en la cuenca del río Guadalquivir.', NULL, '6'), (NULL, 'Fortalecimiento de la participación ciudadana en la Gestión hídrico ambiental', NULL, '6');