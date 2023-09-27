-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-08-2023 a las 20:10:29
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdd_proyectos_v01`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accion_estrategica`
--

CREATE TABLE `accion_estrategica` (
  `id_accion_estrategica` int(11) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `id_linea_accion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `accion_estrategica`
--

INSERT INTO `accion_estrategica` (`id_accion_estrategica`, `descripcion`, `estado`, `id_linea_accion`) VALUES
(1, 'Ampliar los sistemas de agua potable y optimizar los sistemas de conducción y distribución de agua potable.', NULL, 1),
(2, 'Mejora de la gestión de servicios de los operadores de agua potable.', NULL, 1),
(3, 'Educar y Capacitar a los usuarios en el uso eficiente del agua potable a nivel domiciliario', NULL, 1),
(4, 'Implementar Plantas de Tratamiento de Aguas Residuales (PTAR\'s), y tecnologías alternativas para cubrir los requerimientos de las poblaciones concentradas y dispersas en la cuenca.', NULL, 2),
(5, 'Fortalecimiento de los mecanismos de gestión, operación y mantenimiento de las PTARs', NULL, 2),
(6, 'Instalación de sistemas para el reuso de aguas residuales tratadas para diversos requerimientos, según normativa vigente.', NULL, 2),
(7, 'Apoyar las acciones para la operación del Sistema de Gestión Integral de Residuos Sólidos en la cuenca, áreas (urbana y rural).', NULL, 2),
(8, 'Educar y capacitar a la población para el aprovechamiento de las aguas residuales y residuos sólidos en los contextos urbano y rural.', NULL, 2),
(9, 'Apoyar la implementación de mecanismos sustentables en la industria, como la Producción Más Limpia (PML), para mejorar la gestión del agua.', NULL, 3),
(10, 'Consolidación de los mecanismos de monitoreo y vigilancia de descargas industriales.', NULL, 3),
(11, 'Fortalecimiento de sistemas productivos tradicionales', NULL, 4),
(12, 'Incorporar buenas prácticas agrícolas en cultivos de alto valor', NULL, 4),
(13, 'Fomento de la certificación ambiental - social de cultivos de seguridad alimentaria y de exportación (código de sustentabilidad)', NULL, 4),
(14, 'Educación y capacitación sobre agricultura sustentable con enfoque de cuenca', NULL, 4),
(15, 'Investigación para una agricultura resiliente a diferentes fenómenos asociados al cambio climático', NULL, 4),
(16, 'Ampliación y mejora de los sistemas de riego con presas y cosecha de agua.', NULL, 5),
(17, 'Mejora de la productividad agrícola con riego tecnificado', NULL, 5),
(18, 'Preservar, conservar y/o restaurar las cabeceras de cuenca con prácticas para la conservación de suelos, aguas y sostenimiento de la cobertura vegetal', NULL, 6),
(19, 'Fortalecer la educación y capacitación a las comunidades sobre importancia de las funciones ambientales y la protección de los ecosistemas', NULL, 6),
(20, 'Fortalecimiento al Comité de Gestión de la Reserva Biológica de la Cordillera de Sama (RBCS)', NULL, 7),
(21, 'Apoyar al Comité Operativo de Emergencias Departamental (COED) en la actualización de planes de Gestión de Incendios en la RBCS', NULL, 7),
(22, 'Gestionar la ampliación del Sistema de Áreas Protegidas Municipales en sitios estratégicos de la cuenca', NULL, 7),
(23, 'Apoyar el desarrollo de un programa de investigación para conocer estado de conservación de los ecosistemas y la biodiversidad en la RBCS', NULL, 8),
(24, 'Gestionar la implementación de medidas de adaptación basada en ecosistemas (AbE) para la conservación y restauración de los ecosistemas en la cuenca del río Guadalquivir', NULL, 8),
(25, 'Gestionar la implementación de proyectos para la revalorización de los parientes silvestres en la cuenca para contribuir a la soberanía alimentaria', NULL, 8),
(26, 'Articular el PDC con los PTDI\'s y otros planes operativos de gestión hídrico ambiental en los ámbitos público-privado-académico', NULL, 9),
(27, 'Fortalecer y actualizar el plan de aprovechamiento hídrico multisectorial', NULL, 10),
(28, 'Desarrollar un programa de manejo de sistemas hídricos y fuentes de agua', NULL, 10),
(29, 'Desarrollo de instrumentos de planificación de aguas subterráneas', NULL, 11),
(30, 'Promover un sistema de planificación y gestión sustentable de aguas subterráneas', NULL, 11),
(31, 'Fortalecer el monitoreo y vigilancia de la calidad de agua en función de la clasificación de los cuerpos de agua', NULL, 12),
(32, 'Apoyar la implementación del Plan de Acción de Calidad Hídrica', NULL, 12),
(33, 'Fortalecer la planificación para la operación del monitoreo hidrológico y meteorológico', NULL, 13),
(34, 'Implementar el SAT para la gestión del riesgo hidrometeorológico', NULL, 13),
(35, 'Apoyar en el fortalecimiento de las Unidades de Gestión del Riesgo (UGR) en las ETA\'s de la Cuenca', NULL, 14),
(36, 'Determinar las áreas de riesgo hidrometeorológico', NULL, 14),
(37, 'Fortalecer el desarrollo de los Planes de Gestión del Riesgo hidrometeorológico en las ETA\'s', NULL, 14),
(38, 'Apoyar en la elaboración y ejecución de proyectos de investigación y obras para la respuesta al riesgo hidrometeorológico', NULL, 15),
(39, 'Concurrencia de esfuerzos para la movilización social a través de la educación y capacitación para la respuesta al riesgo hidrometeorológico', NULL, 15),
(40, 'Fortalecer la gestión para el aprovechamiento sostenible de áridos y agregados', NULL, 15),
(41, 'Articular el cuerpo normativo subnacional para mejorar la gestión hídrico ambiental con mecanismos solidos e integrales para su aplicación', NULL, 16),
(42, 'Mejora de los mecanismos de implementación, de los instrumentos de gestión hídrica y ambiental', NULL, 16),
(43, 'Consolidación del sistema de información hídrico-ambiental en la cuenca del Guadalquivir', NULL, 18),
(44, 'Implementar una estrategia de información y comunicación ambiental a nivel de cuenca', NULL, 18),
(45, 'Desarrollo de un programa de educación ambiental dirigido a la sociedad civil con énfasis en estudiantes del sistema educativo formal e informal', NULL, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alcance`
--

CREATE TABLE `alcance` (
  `cantidad` decimal(10,0) DEFAULT NULL,
  `id_unidad_medicion` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alcance`
--

INSERT INTO `alcance` (`cantidad`, `id_unidad_medicion`, `id_proyecto`) VALUES
('200', 1, 20),
('9', 1, 25),
('1', 1, 26),
('12', 1, 27),
('1', 1, 28),
('1', 1, 29),
('1', 1, 30),
('12', 1, 31),
('12', 1, 32),
('4', 2, 29),
('100', 3, 20),
('89', 3, 24),
('2', 4, 26),
('4', 4, 27),
('12', 5, 26),
('1', 5, 27),
('5', 5, 29),
('13', 5, 31),
('1', 5, 32),
('30', 5, 33),
('100', 7, 33);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nom_categoria` varchar(45) DEFAULT NULL,
  `desc_categoria` varchar(255) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nom_categoria`, `desc_categoria`, `estado`) VALUES
(2, 'Alcantarillado Sanitario', 'Description', 'true'),
(3, 'Agua Potable', '2', NULL),
(13, 'Áreas Protegidas', 'Descripción', NULL),
(14, 'Forestación', 'Descripción', NULL),
(15, 'Gestión de Información', 'Descripción', NULL),
(16, 'Institucional', 'Descripción', NULL),
(17, 'MIC', 'Descripción', NULL),
(18, 'Riego', 'Descripción', NULL),
(19, 'Tratamiento Aguas Residuales', 'Descripción', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad_o_comunidad`
--

CREATE TABLE `ciudad_o_comunidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `id_municipio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudad_o_comunidad`
--

INSERT INTO `ciudad_o_comunidad` (`id`, `nombre`, `id_municipio`) VALUES
(1, 'San Gerónimo', 1),
(2, 'Las Lomas', 1),
(3, 'Canasmoro', 2),
(4, 'Tomatas', 2),
(5, 'Camacho', 3),
(6, 'Cañas', 3),
(7, 'Chocloca', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenca`
--

CREATE TABLE `cuenca` (
  `id_cuenca` int(11) NOT NULL,
  `nom_cuenca` varchar(45) DEFAULT NULL,
  `desc_cuenca` varchar(255) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cuenca`
--

INSERT INTO `cuenca` (`id_cuenca`, `nom_cuenca`, `desc_cuenca`, `estado`) VALUES
(1, 'Río Gudalquivir', NULL, ''),
(2, 'Río Pilcomayo', NULL, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidad`
--

CREATE TABLE `entidad` (
  `id_entidad` int(11) NOT NULL,
  `nombre_entidad` varchar(45) DEFAULT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entidad`
--

INSERT INTO `entidad` (`id_entidad`, `nombre_entidad`, `comentario`, `estado`) VALUES
(1, 'SEDEGIA', 'SEDEGIA-Servicio Dptal de Gestión Integral del Agua - Tarija.', 'true'),
(2, 'GAM SAN LORENZO', 'Gobierno Autónomo municipal de San Lorenzo', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidad_ejecutora`
--

CREATE TABLE `entidad_ejecutora` (
  `id_entidad_ejecutora` int(11) NOT NULL,
  `nom_entidad_ejecutora` varchar(128) DEFAULT NULL,
  `desc_entidad_ejecutora` varchar(255) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entidad_ejecutora`
--

INSERT INTO `entidad_ejecutora` (`id_entidad_ejecutora`, `nom_entidad_ejecutora`, `desc_entidad_ejecutora`, `estado`) VALUES
(1, 'GAD Tarija', NULL, 'true'),
(2, 'GAM Padcaya', NULL, NULL),
(3, 'GAM San Lorenzo', NULL, NULL),
(4, 'GAM Tarija', NULL, NULL),
(5, 'GAM Uriondo', NULL, NULL),
(6, 'VRHR', NULL, NULL),
(7, 'Prometa', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidad_financiera`
--

CREATE TABLE `entidad_financiera` (
  `id_entidad_financiera` int(11) NOT NULL,
  `nom_entidad_financiera` varchar(45) DEFAULT NULL,
  `desc_entidad_financiera` varchar(255) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entidad_financiera`
--

INSERT INTO `entidad_financiera` (`id_entidad_financiera`, `nom_entidad_financiera`, `desc_entidad_financiera`, `estado`) VALUES
(1, 'GAT Tarija', 'Gobierno Autónomo Departamental - Tarija', NULL),
(2, 'GAM Tarija', 'Gobierno Autónomo Municipal - Tarija', NULL),
(3, 'GAM San Lorenzo', 'Gobierno Autónomo Municipal de San Lorenzo', NULL),
(4, 'ONG', 'Organización No Gubernamental.', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etapa`
--

CREATE TABLE `etapa` (
  `id_etapa` int(11) NOT NULL,
  `nombre_etapa` varchar(45) DEFAULT NULL,
  `peso_etapa` int(11) DEFAULT NULL,
  `descripcion_etapa` varchar(255) DEFAULT NULL,
  `id_tipologia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `etapa`
--

INSERT INTO `etapa` (`id_etapa`, `nombre_etapa`, `peso_etapa`, `descripcion_etapa`, `id_tipologia`) VALUES
(1, 'ITCP', 10, 'Etapa de proyecto', 5),
(2, 'EDTP', 20, 'Etapa de proyecto', 5),
(3, 'Gestión Financiamiento', 20, 'Etapa de proyecto', 5),
(4, 'Ejecución', 50, 'Etapa de proyecto', 5),
(5, 'Propuesta', 30, 'Etapa de normativa', 2),
(6, 'Validación ', 30, 'Etapa de normativa', 2),
(7, 'Promulgación', 40, 'Etapa de normativa', 2),
(8, 'Propuesta', 30, 'Etapa de Plan/estrategia', 3),
(9, 'Validación', 30, 'Etapa de Plan/estrategia', 3),
(10, 'Aprobación ', 40, 'Etapa de Plan/estrategia', 3),
(11, 'Organización', 30, 'Etapa de Actividad', 1),
(12, 'Ejecución', 70, 'Etapa de Actividad', 1),
(13, 'EDTP', 30, 'Etapa de Programa', 4),
(14, 'Gestión Financiamiento', 20, 'Etapa de Programa', 4),
(15, 'Ejecución', 50, 'Etapa de Programa', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etapa_proyecto`
--

CREATE TABLE `etapa_proyecto` (
  `id_etapa_proyecto` int(11) NOT NULL,
  `fecha_seguimiento` date NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_etapa` int(11) DEFAULT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `id_fuente_de_informacion` int(11) DEFAULT NULL,
  `id_entidad_ejecutora` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `etapa_proyecto`
--

INSERT INTO `etapa_proyecto` (`id_etapa_proyecto`, `fecha_seguimiento`, `fecha_registro`, `id_etapa`, `id_proyecto`, `id_fuente_de_informacion`, `id_entidad_ejecutora`) VALUES
(1, '2023-08-02', '2023-08-18 11:32:48', 1, 5, 1, 2),
(2, '2023-08-02', '2023-08-18 11:33:33', 1, 5, 1, 2),
(3, '2023-08-03', '2023-08-18 11:40:40', 11, 17, 1, 1),
(4, '2023-08-03', '2023-08-18 11:45:56', 12, 19, 1, 1),
(5, '2023-08-11', '2023-08-18 13:38:29', 11, 33, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `financiamiento`
--

CREATE TABLE `financiamiento` (
  `id_financiamiento` int(11) NOT NULL,
  `costo_inicial` float NOT NULL,
  `costo_final` float NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_entidad_financiera` int(11) NOT NULL,
  `id_etapa_proyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `financiamiento`
--

INSERT INTO `financiamiento` (`id_financiamiento`, `costo_inicial`, `costo_final`, `fecha_registro`, `id_entidad_financiera`, `id_etapa_proyecto`) VALUES
(1, 10, 9, '2023-08-18 11:32:48', 2, 1),
(2, 10, 9, '2023-08-18 11:33:33', 2, 2),
(3, 100, 67, '2023-08-18 11:40:40', 1, 3),
(4, 200, 197, '2023-08-18 11:45:56', 1, 4),
(5, 3789, 3789, '2023-08-18 13:38:29', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fuente_de_informacion`
--

CREATE TABLE `fuente_de_informacion` (
  `id_fuente_de_informacion` int(11) NOT NULL,
  `nom_fuente_inf` varchar(255) NOT NULL,
  `desc_fuente_inf` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fuente_de_informacion`
--

INSERT INTO `fuente_de_informacion` (`id_fuente_de_informacion`, `nom_fuente_inf`, `desc_fuente_inf`) VALUES
(1, 'SISIN', 'DESCRIPCION 1'),
(2, 'GAD-TARIJA', 'DESCRIPCION 2'),
(3, 'GAM-TARIJA', 'DESCRIPCION 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `indicador`
--

CREATE TABLE `indicador` (
  `id_indicador` int(11) NOT NULL,
  `nombre_indicador` varchar(255) DEFAULT NULL,
  `desc_indicador` varchar(255) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `id_unidad_medicion` int(11) DEFAULT NULL,
  `id_pdes` int(11) DEFAULT NULL,
  `id_ndc` int(11) DEFAULT NULL,
  `id_pprh` int(11) DEFAULT NULL,
  `id_ods` int(11) DEFAULT NULL,
  `id_psdi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `indicador`
--

INSERT INTO `indicador` (`id_indicador`, `nombre_indicador`, `desc_indicador`, `estado`, `id_unidad_medicion`, `id_pdes`, `id_ndc`, `id_pprh`, `id_ods`, `id_psdi`) VALUES
(1, 'Porcentaje de la población (mujeres y hombres) urbana y rural de la cuenca con dotación suficiente de agua “potable/segura” incrementada (de 83 a 96%).', 'Mide la población urbana y rural (hombres/mujeres) de la cuenca con cobertura y acceso a servicios de agua potable/agua segura para cubrir sus necesidades básicas', 'true', 1, NULL, NULL, NULL, NULL, NULL),
(2, 'La población (mujeres y hombres) urbana y rural con acceso a servicios de saneamiento básico se incrementa de 63 a 77%.', 'Mide la población urbana y rural (hombres/mujeres) de la cuenca con cobertura y acceso a servicios de saneamiento básico para cubrir sus necesidades básicas', 'true', 1, NULL, NULL, NULL, NULL, NULL),
(3, 'N.º de PTAR establecidos en el área de la cuenca con adecuado funcionamiento', 'El número de PTARs en funcionamiento adecuado', 'true', 19, NULL, NULL, NULL, NULL, NULL),
(4, 'Uso eficiente de aguas residuales para riego, Superficie de riego (ha)', 'Hectáreas en las cuales se riega con efluentes tratados de aguas residuales', 'false', 5, NULL, NULL, NULL, NULL, NULL),
(5, '% de la poblacion cuenta con servicios de recoleccion y disposicion final de residuos solidos', 'Mide la población urbana y rural (hombres/mujeres) de la cuenca con servicios de recolección y disposición final de residuos sólidos', 'false', 1, NULL, NULL, NULL, NULL, NULL),
(6, 'Nro. de industrias que cuentan con certificados de código de sustentabilidad (PML)', NULL, NULL, 12, NULL, NULL, NULL, NULL, NULL),
(7, 'Superficie agrícola resiliente Nro [ha] con sistemas de producción agropecuaria resiliente y con prácticas agrícolas , manejo integral de plagas, recuperaciónde suelos y riego técnificado', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(8, 'Se recuperarán e incrementará al menos X hectáreas adicionales de suelos degradados para la producción de alimentos', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(9, 'Se incrementará en el rendimiento promedio de los cultivos estratégicos a nivel de cuenca', NULL, NULL, 19, NULL, NULL, NULL, NULL, NULL),
(10, 'Se ha alcanzado X hectáreas bajo riego', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(11, 'Se ha alcanzado X hectáreas bajo riego tecnificado', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(12, 'Se ha incrementado X  hectáreas con Manejo Integral de Cuencas (MIC)', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(13, 'Incremento de la superficie de áreas protegidas con medidas de conservación y restauración AbE en la cuenca (ha)', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(14, 'Reducir en un X % la superficie con incendios forestales, en comparación con la línea base', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(15, 'Nro. de alianzas publico privadas para la restauración de ecosistemas críticos de la cuenca establecidos', NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL),
(16, 'Incrementar la ganancia de cobertura de bosques en X hectáreas', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL),
(17, 'Número de municipios adoptan Instrumentos de gestión territorial articulados al PDC', NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL),
(18, 'Se ha alcanzado X hm3 de capacidad de almacenamiento de agua', NULL, NULL, 9, NULL, NULL, NULL, NULL, NULL),
(19, 'Los cuatro municipios generan normativa para aplicar un caudal ecológico', NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL),
(20, 'Número de proyectos de aprovechamiento de aguas subterráneas que aplican normas de regulación y uso sostenible', NULL, NULL, 18, NULL, NULL, NULL, NULL, NULL),
(21, 'Incremento del índice de calidad de agua (ICA) de la cuenca', NULL, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(22, 'Informes anuales de GAMs sobre el control de focos de contaminación', NULL, NULL, 13, NULL, NULL, NULL, NULL, NULL),
(23, 'Nueva infraestructura resiliente para control hidráulico', NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL),
(24, 'Nro. normas e instrumentos generados de gestión hídrico ambiental subnacional para la protección de cuencas', NULL, NULL, 14, NULL, NULL, NULL, NULL, NULL),
(25, 'Indice de gobernanza hídrica en el marco de la plataforma interinstitucional de cuenca', NULL, NULL, 11, NULL, NULL, NULL, NULL, NULL),
(26, 'Población corresponsable con el desarrollo de acciones para la mejora de la gestión hídrico ambiental de la cuenca', NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea_de_accion`
--

CREATE TABLE `linea_de_accion` (
  `id_linea_accion` int(11) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `id_linea_estrategica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `linea_de_accion`
--

INSERT INTO `linea_de_accion` (`id_linea_accion`, `descripcion`, `estado`, `id_linea_estrategica`) VALUES
(1, 'Aprovisionamiento sostenible de agua para consumo humano', NULL, 1),
(2, 'Gestión integral de aguas residuales y residuos sólidos en la cuenca', NULL, 1),
(3, 'Desarrollo de alianzas estratégicas para mejorar la gestión del agua en la industria.', NULL, 1),
(4, 'Desarrollo de sistemas agropecuarios sustentables con enfoque de cuenca', NULL, 2),
(5, 'Uso eficiente del agua para la producción de cultivos de seguridad alimentaria y cultivos de alto valor.', NULL, 2),
(6, 'Desarrollo de prácticas para la conservación, restauración y manejo sustentable de la cabecera de cuenca.', NULL, 3),
(7, 'Gestión Sustentable de bosques en áreas Protegidas', NULL, 3),
(8, 'Gestión de la biodiversidad', NULL, 3),
(9, 'Operativización de los instrumentos de planificación y gestión territorial en la cuenca', NULL, 3),
(10, 'Gestión de los sistemas de aprovechamiento de aguas superficiales', NULL, 4),
(11, 'Gestión sustentable de aguas subterráneas', NULL, 4),
(12, 'Gestión de la calidad hídrica ambiental', NULL, 4),
(13, 'Fortalecer el monitoreo hidro-meteorológico e Implementar Sistema de Alerta Temprana (SAT)', NULL, 5),
(14, 'Desarrollar una estrategia de gestión del riesgo a nivel cuenca.', NULL, 5),
(15, 'Articular los programas para la ejecución de proyectos de Gestión del riesgo hidrometeorológico a nivel de cuenca.', NULL, 5),
(16, 'Fortalecimiento de la normativa subnacional para la gestión hídrica y ambiental', NULL, 6),
(17, 'Fortalecimiento de las capacidades institucionales en la cuenca del río Guadalquivir.', NULL, 6),
(18, 'Fortalecimiento de la participación ciudadana en la Gestión hídrico ambiental', NULL, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea_estrategica`
--

CREATE TABLE `linea_estrategica` (
  `id_linea_estrategica` int(11) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `linea_estrategica`
--

INSERT INTO `linea_estrategica` (`id_linea_estrategica`, `descripcion`, `estado`) VALUES
(1, 'Gestión del agua potable y saneamiento básico.', NULL),
(2, 'Desarrollo productivo Agropecuario con Enfoque de Gestión Integral de Cuencas ', NULL),
(3, 'Gestión de áreas protegidas y ordenamiento territorial.', NULL),
(4, 'Gestión integral de la oferta de agua', NULL),
(5, 'Reducción del riesgo de desastres y adaptación al cambio climático en la gestión integral del agua.', NULL),
(6, 'Gestión política, institucional, normativa y de educación ambiental.', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `id_municipio` int(11) NOT NULL,
  `nombre_municipio` varchar(45) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id_municipio`, `nombre_municipio`, `estado`) VALUES
(1, 'Tarija', 'true'),
(2, 'San Lorenzo', 'true'),
(3, 'Padcaya', 'true'),
(4, 'Uriondo', 'true');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ndc`
--

CREATE TABLE `ndc` (
  `id_ndc` int(11) NOT NULL,
  `nom_meta_ndc` varchar(255) DEFAULT NULL,
  `alcance_ndc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ods`
--

CREATE TABLE `ods` (
  `id_ods` int(11) NOT NULL,
  `nom_indicador_ods` varchar(255) DEFAULT NULL,
  `alcance_ods` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pdes`
--

CREATE TABLE `pdes` (
  `id_pdes` int(11) NOT NULL,
  `nom_indicador_pdes` varchar(255) DEFAULT NULL,
  `alcance_pdes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pprh`
--

CREATE TABLE `pprh` (
  `id_pprh` int(11) NOT NULL,
  `nom_indicador_pprh` varchar(255) DEFAULT NULL,
  `alcance_pprh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` int(11) NOT NULL,
  `nom_proyecto` varchar(500) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `area` varchar(45) DEFAULT NULL,
  `coordenada_x` varchar(45) DEFAULT NULL,
  `coordenada_y` varchar(45) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `hombres` int(11) NOT NULL,
  `mujeres` int(11) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_tipologia` int(11) DEFAULT NULL,
  `id_indicador` int(11) DEFAULT NULL,
  `id_cuenca` int(11) DEFAULT NULL,
  `id_accion_estrategica` int(11) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `documento` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `nom_proyecto`, `fecha_inicio`, `fecha_fin`, `fecha_registro`, `area`, `coordenada_x`, `coordenada_y`, `cantidad`, `hombres`, `mujeres`, `id_categoria`, `id_tipologia`, `id_indicador`, `id_cuenca`, `id_accion_estrategica`, `estado`, `documento`) VALUES
(5, 'CONST. SISTEMA DE AGUA POTABLE BARRIO ARANJUEZ NORTE', '2021-07-01', '2023-07-05', '2023-07-25', 'Urbana', '-64.915436', '-21.616519', 0, 0, 0, 2, 5, 21, 1, 10, 'true', NULL),
(6, 'MANEJO INTEGRAL DE LA MICROCUENCA DEL RÍO TOLOMOSA, MUNICIPIO DE CERCADO”', '2020-07-02', '2023-05-12', '2023-07-25', 'Urbana', '-64.955436', '-21.666519', 0, 0, 0, 3, 5, 2, 1, 45, 'true', NULL),
(7, 'MEJORAMIENTO DE LA COBERTURA BOSCOSA EN LA CUENCA DEL RÍO CAMACHO', '2022-07-09', '2023-07-12', '2023-07-24', 'Rural', '-64.915436', '-21.895883', 0, 0, 0, 3, 5, 14, 1, 8, 'true', NULL),
(17, 'PR', '0000-00-00', '0000-00-00', '0000-00-00', 'periurbana', '89', '78', 45, 78, 1, 3, 1, NULL, 2, NULL, 'true', NULL),
(18, 'Pa', '0000-00-00', '0000-00-00', '0000-00-00', 'periurbana', '78', '78', 78, 89, 7, 3, 2, NULL, 2, NULL, 'true', NULL),
(19, 'pro', '0000-00-00', '0000-00-00', '0000-00-00', 'periurbana', '67', '67', 78, 78, 0, 3, 1, NULL, 2, NULL, 'true', NULL),
(20, 'pruba100', '0000-00-00', '0000-00-00', '0000-00-00', 'periurbana', '1', '7', 67, 8, 59, 3, 2, NULL, 2, NULL, 'true', NULL),
(24, 'Prueba03 martes', '2023-08-02', '2023-08-16', '2023-08-01', 'Urbana', '9', '1', 89, 9, 78, 2, 1, 1, 1, 1, 'true', NULL),
(25, 'Prueba03', '2023-08-02', '2023-08-09', '2023-08-01', 'Urbana', '8', '7', 9, 5, 4, 2, 1, 1, 1, 1, 'true', ''),
(26, '12', '2023-08-02', '2023-08-10', '2023-08-08', 'Urbana', '12', '12', 1, 1, -2, 2, 1, 1, 1, 1, 'true', ''),
(27, 'prueba martes 08', '2023-08-02', '2023-08-09', '2023-08-08', 'Urbana', '1', '1', 12, 0, 0, 2, 1, 1, 1, 1, 'true', ''),
(28, 'prueba03 martes08', '2023-08-02', '2023-08-09', '2023-08-08', 'Urbana', '1', '1', 1, 1, 1, 3, 1, 1, 1, 1, 'true', ''),
(29, 'Prueba 1108', '2023-08-02', '2023-08-12', '2023-08-11', 'Urbana', '5', '3', 1, 1, 0, 2, 1, 1, 1, 1, 'true', '1691796323043-SÃ­ntesis Modelos PedagÃ³gicos.pdf'),
(30, 'Prueba01 15-08-2023', '2023-08-01', '2023-08-16', '0000-00-00', 'Urbana', '34', '12', 1, 12, 1, 2, 1, 1, 1, 1, 'true', ''),
(31, 'prueba02 15082023', '2023-08-02', '2023-08-23', '2023-08-15', 'Urbana', '23', '23', 12, 8, 5, 2, 1, 1, 1, 1, 'true', '1692115076222-Lectura_1_FormulaciÃ³n_de_Competencias_lectura_obligatoria_Grigoriu.pdf'),
(32, 'prue1808', '2023-08-01', '2023-08-15', '2023-08-18', 'Urbana', '345', '2', 12, 12, 1, 3, 1, 3, 1, 1, 'true', '1692354383420-Lectura 4. Pasos a seguir en el diÃ¡logo reflexivo 1.pdf'),
(33, 'Prueba04 18082023', '2023-08-02', '2017-02-22', '2023-08-18', 'Urbana', '-64.915436', '-62.915436', 100, 12, 5, 14, 1, 25, 1, 1, 'true', '1692364205104-Lectura 4. Pasos a seguir en el diÃ¡logo reflexivo 1.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_ciudad_o_comunidad`
--

CREATE TABLE `proyecto_ciudad_o_comunidad` (
  `id_proyecto` int(11) NOT NULL,
  `id_ciudad_comunidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto_ciudad_o_comunidad`
--

INSERT INTO `proyecto_ciudad_o_comunidad` (`id_proyecto`, `id_ciudad_comunidad`) VALUES
(5, 2),
(6, 1),
(7, 5),
(17, 3),
(18, 6),
(19, 3),
(20, 1),
(20, 2),
(24, 1),
(25, 1),
(26, 1),
(26, 2),
(27, 1),
(27, 2),
(28, 1),
(28, 2),
(29, 1),
(29, 2),
(30, 1),
(30, 2),
(31, 5),
(31, 6),
(32, 1),
(32, 2),
(33, 5),
(33, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `psdi`
--

CREATE TABLE `psdi` (
  `id_psdi` int(11) NOT NULL,
  `nom_indicador_psdi` varchar(255) DEFAULT NULL,
  `alcance_psdi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimiento_financiero`
--

CREATE TABLE `seguimiento_financiero` (
  `id_seguimiento_financiero` int(11) NOT NULL,
  `monto` varchar(25) NOT NULL,
  `fecha_seguimiento` date NOT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  `id_financiamiento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `seguimiento_financiero`
--

INSERT INTO `seguimiento_financiero` (`id_seguimiento_financiero`, `monto`, `fecha_seguimiento`, `observacion`, `id_financiamiento`) VALUES
(1, '5', '2023-08-02', 'Sin Obser', 1),
(2, '5', '2023-08-02', 'Sin Obser', 2),
(3, '78', '2023-08-03', 'Sin Obs Prueba 2', 3),
(4, '27', '2023-08-03', 'Prueba3 sin Obs', 4),
(5, '12', '2023-08-11', 'Sin comentario', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimiento_fisico`
--

CREATE TABLE `seguimiento_fisico` (
  `id_seguimiento_fisico` int(11) NOT NULL,
  `avance_seguimiento_fisico` int(11) NOT NULL,
  `fecha_seguimiento_fisico` date NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `id_etapa_proyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `seguimiento_fisico`
--

INSERT INTO `seguimiento_fisico` (`id_seguimiento_fisico`, `avance_seguimiento_fisico`, `fecha_seguimiento_fisico`, `observacion`, `id_etapa_proyecto`) VALUES
(1, 50, '2023-08-02', 'Sin Obs', 1),
(2, 50, '2023-08-02', 'Sin Obs', 2),
(3, 45, '2023-08-03', 'Sin Obs Prueba 2', 3),
(4, 10, '2023-08-03', 'Prueba3 sin Obs', 4),
(5, 23, '2023-08-11', 'Sin comentario', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipologia`
--

CREATE TABLE `tipologia` (
  `id_tipologia` int(11) NOT NULL,
  `nom_tipologia` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipologia`
--

INSERT INTO `tipologia` (`id_tipologia`, `nom_tipologia`) VALUES
(1, 'Actividad'),
(2, 'Normativa'),
(3, ' Plan/Estrategia'),
(4, 'Programa'),
(5, 'Proyecto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medicion`
--

CREATE TABLE `unidad_medicion` (
  `id_unidad_medicion` int(11) NOT NULL,
  `nom_unidad` varchar(45) DEFAULT NULL,
  `desc_unidad` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `unidad_medicion`
--

INSERT INTO `unidad_medicion` (`id_unidad_medicion`, `nom_unidad`, `desc_unidad`) VALUES
(1, '%', 'porcentaje'),
(2, 'adimensional', NULL),
(3, 'APP', NULL),
(4, 'GAM', NULL),
(5, 'ha', 'Hectarea'),
(6, 'ha/año', 'Hectárea por año'),
(7, 'habitantes', NULL),
(8, 'hm3', 'Hectómetro cúbico'),
(9, 'ICA', NULL),
(10, 'IGH', NULL),
(11, 'Industrias', NULL),
(12, 'Informes', NULL),
(13, 'normas_instrumentos', NULL),
(14, 'km', 'kilómetro'),
(15, 'm', 'metro'),
(16, 'm3', 'metro cúbico'),
(17, 'proyectos', NULL),
(18, 'PTAR', NULL),
(19, 'tm/ha', 'tonelada métrica por hectárea');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ci` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `ap_paterno` varchar(45) DEFAULT NULL,
  `ap_materno` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `genero` varchar(10) DEFAULT NULL,
  `rol` varchar(20) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `id_entidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ci`, `nombre`, `ap_paterno`, `ap_materno`, `fecha_nacimiento`, `fecha_registro`, `password`, `email`, `telefono`, `genero`, `rol`, `estado`, `id_entidad`) VALUES
(34589, 'Carlos', 'Perez', 'Perez', '2023-08-03', '2023-08-18', '123', 'carlos@gmail.com', '7895672', 'Masculino', 'Usuario', 'true', 2),
(56788, 'Juan', 'Perez', 'Guevara', '2000-08-10', '2023-08-02', 'qwerty123', 'juan@gmail.com', '76543489', 'masculino', 'Operador', 'false', 2),
(7888900, 'Maria', 'Gonzales', 'Vidaurre', '2013-08-02', '2023-08-15', 'qwerty123', 'maria@gmail.com', '78904522', 'femenino', 'Administrador', 'tru', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accion_estrategica`
--
ALTER TABLE `accion_estrategica`
  ADD PRIMARY KEY (`id_accion_estrategica`),
  ADD KEY `id_linea_accion` (`id_linea_accion`);

--
-- Indices de la tabla `alcance`
--
ALTER TABLE `alcance`
  ADD PRIMARY KEY (`id_unidad_medicion`,`id_proyecto`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `ciudad_o_comunidad`
--
ALTER TABLE `ciudad_o_comunidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_municipio` (`id_municipio`);

--
-- Indices de la tabla `cuenca`
--
ALTER TABLE `cuenca`
  ADD PRIMARY KEY (`id_cuenca`);

--
-- Indices de la tabla `entidad`
--
ALTER TABLE `entidad`
  ADD PRIMARY KEY (`id_entidad`);

--
-- Indices de la tabla `entidad_ejecutora`
--
ALTER TABLE `entidad_ejecutora`
  ADD PRIMARY KEY (`id_entidad_ejecutora`);

--
-- Indices de la tabla `entidad_financiera`
--
ALTER TABLE `entidad_financiera`
  ADD PRIMARY KEY (`id_entidad_financiera`);

--
-- Indices de la tabla `etapa`
--
ALTER TABLE `etapa`
  ADD PRIMARY KEY (`id_etapa`),
  ADD KEY `id_tipologia` (`id_tipologia`);

--
-- Indices de la tabla `etapa_proyecto`
--
ALTER TABLE `etapa_proyecto`
  ADD PRIMARY KEY (`id_etapa_proyecto`),
  ADD KEY `id_etapa` (`id_etapa`),
  ADD KEY `id_proyecto` (`id_proyecto`),
  ADD KEY `id_fuente_de_informacion` (`id_fuente_de_informacion`),
  ADD KEY `id_entidad_ejecutora` (`id_entidad_ejecutora`);

--
-- Indices de la tabla `financiamiento`
--
ALTER TABLE `financiamiento`
  ADD PRIMARY KEY (`id_financiamiento`),
  ADD KEY `id_entidad_financiera` (`id_entidad_financiera`),
  ADD KEY `id_etapa_proyecto` (`id_etapa_proyecto`);

--
-- Indices de la tabla `fuente_de_informacion`
--
ALTER TABLE `fuente_de_informacion`
  ADD PRIMARY KEY (`id_fuente_de_informacion`);

--
-- Indices de la tabla `indicador`
--
ALTER TABLE `indicador`
  ADD PRIMARY KEY (`id_indicador`),
  ADD KEY `id_medicion` (`id_unidad_medicion`),
  ADD KEY `id_pdes` (`id_pdes`),
  ADD KEY `id_ndc` (`id_ndc`),
  ADD KEY `id_pprh` (`id_pprh`),
  ADD KEY `id_ods` (`id_ods`),
  ADD KEY `id_psdi` (`id_psdi`);

--
-- Indices de la tabla `linea_de_accion`
--
ALTER TABLE `linea_de_accion`
  ADD PRIMARY KEY (`id_linea_accion`),
  ADD KEY `id_linea_estrategica` (`id_linea_estrategica`);

--
-- Indices de la tabla `linea_estrategica`
--
ALTER TABLE `linea_estrategica`
  ADD PRIMARY KEY (`id_linea_estrategica`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id_municipio`);

--
-- Indices de la tabla `ndc`
--
ALTER TABLE `ndc`
  ADD PRIMARY KEY (`id_ndc`);

--
-- Indices de la tabla `ods`
--
ALTER TABLE `ods`
  ADD PRIMARY KEY (`id_ods`);

--
-- Indices de la tabla `pdes`
--
ALTER TABLE `pdes`
  ADD PRIMARY KEY (`id_pdes`);

--
-- Indices de la tabla `pprh`
--
ALTER TABLE `pprh`
  ADD PRIMARY KEY (`id_pprh`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id_proyecto`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_tipologia` (`id_tipologia`),
  ADD KEY `id_indicador` (`id_indicador`),
  ADD KEY `id_cuenca` (`id_cuenca`),
  ADD KEY `id_accion_estrategica` (`id_accion_estrategica`);

--
-- Indices de la tabla `proyecto_ciudad_o_comunidad`
--
ALTER TABLE `proyecto_ciudad_o_comunidad`
  ADD PRIMARY KEY (`id_proyecto`,`id_ciudad_comunidad`),
  ADD KEY `id_ciudad_comunidad` (`id_ciudad_comunidad`);

--
-- Indices de la tabla `psdi`
--
ALTER TABLE `psdi`
  ADD PRIMARY KEY (`id_psdi`);

--
-- Indices de la tabla `seguimiento_financiero`
--
ALTER TABLE `seguimiento_financiero`
  ADD PRIMARY KEY (`id_seguimiento_financiero`),
  ADD KEY `id_financiamiento` (`id_financiamiento`);

--
-- Indices de la tabla `seguimiento_fisico`
--
ALTER TABLE `seguimiento_fisico`
  ADD PRIMARY KEY (`id_seguimiento_fisico`),
  ADD KEY `id_etapa_proyecto` (`id_etapa_proyecto`);

--
-- Indices de la tabla `tipologia`
--
ALTER TABLE `tipologia`
  ADD PRIMARY KEY (`id_tipologia`);

--
-- Indices de la tabla `unidad_medicion`
--
ALTER TABLE `unidad_medicion`
  ADD PRIMARY KEY (`id_unidad_medicion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ci`),
  ADD KEY `id_entidad` (`id_entidad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accion_estrategica`
--
ALTER TABLE `accion_estrategica`
  MODIFY `id_accion_estrategica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `ciudad_o_comunidad`
--
ALTER TABLE `ciudad_o_comunidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `entidad`
--
ALTER TABLE `entidad`
  MODIFY `id_entidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `entidad_ejecutora`
--
ALTER TABLE `entidad_ejecutora`
  MODIFY `id_entidad_ejecutora` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `entidad_financiera`
--
ALTER TABLE `entidad_financiera`
  MODIFY `id_entidad_financiera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `etapa`
--
ALTER TABLE `etapa`
  MODIFY `id_etapa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `etapa_proyecto`
--
ALTER TABLE `etapa_proyecto`
  MODIFY `id_etapa_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `financiamiento`
--
ALTER TABLE `financiamiento`
  MODIFY `id_financiamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `fuente_de_informacion`
--
ALTER TABLE `fuente_de_informacion`
  MODIFY `id_fuente_de_informacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `linea_de_accion`
--
ALTER TABLE `linea_de_accion`
  MODIFY `id_linea_accion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `linea_estrategica`
--
ALTER TABLE `linea_estrategica`
  MODIFY `id_linea_estrategica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id_municipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ndc`
--
ALTER TABLE `ndc`
  MODIFY `id_ndc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ods`
--
ALTER TABLE `ods`
  MODIFY `id_ods` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pdes`
--
ALTER TABLE `pdes`
  MODIFY `id_pdes` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pprh`
--
ALTER TABLE `pprh`
  MODIFY `id_pprh` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `psdi`
--
ALTER TABLE `psdi`
  MODIFY `id_psdi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `seguimiento_financiero`
--
ALTER TABLE `seguimiento_financiero`
  MODIFY `id_seguimiento_financiero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `seguimiento_fisico`
--
ALTER TABLE `seguimiento_fisico`
  MODIFY `id_seguimiento_fisico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipologia`
--
ALTER TABLE `tipologia`
  MODIFY `id_tipologia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `unidad_medicion`
--
ALTER TABLE `unidad_medicion`
  MODIFY `id_unidad_medicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accion_estrategica`
--
ALTER TABLE `accion_estrategica`
  ADD CONSTRAINT `accion_estrategica_ibfk_1` FOREIGN KEY (`id_linea_accion`) REFERENCES `linea_de_accion` (`id_linea_accion`);

--
-- Filtros para la tabla `alcance`
--
ALTER TABLE `alcance`
  ADD CONSTRAINT `alcance_ibfk_1` FOREIGN KEY (`id_unidad_medicion`) REFERENCES `unidad_medicion` (`id_unidad_medicion`),
  ADD CONSTRAINT `alcance_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Filtros para la tabla `ciudad_o_comunidad`
--
ALTER TABLE `ciudad_o_comunidad`
  ADD CONSTRAINT `ciudad_o_comunidad_ibfk_1` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id_municipio`);

--
-- Filtros para la tabla `etapa`
--
ALTER TABLE `etapa`
  ADD CONSTRAINT `etapa_ibfk_1` FOREIGN KEY (`id_tipologia`) REFERENCES `tipologia` (`id_tipologia`);

--
-- Filtros para la tabla `etapa_proyecto`
--
ALTER TABLE `etapa_proyecto`
  ADD CONSTRAINT `etapa_proyecto_ibfk_1` FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id_etapa`),
  ADD CONSTRAINT `etapa_proyecto_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`),
  ADD CONSTRAINT `etapa_proyecto_ibfk_3` FOREIGN KEY (`id_fuente_de_informacion`) REFERENCES `fuente_de_informacion` (`id_fuente_de_informacion`),
  ADD CONSTRAINT `etapa_proyecto_ibfk_4` FOREIGN KEY (`id_entidad_ejecutora`) REFERENCES `entidad_ejecutora` (`id_entidad_ejecutora`);

--
-- Filtros para la tabla `financiamiento`
--
ALTER TABLE `financiamiento`
  ADD CONSTRAINT `financiamiento_ibfk_1` FOREIGN KEY (`id_entidad_financiera`) REFERENCES `entidad_financiera` (`id_entidad_financiera`),
  ADD CONSTRAINT `financiamiento_ibfk_2` FOREIGN KEY (`id_etapa_proyecto`) REFERENCES `etapa_proyecto` (`id_etapa_proyecto`);

--
-- Filtros para la tabla `indicador`
--
ALTER TABLE `indicador`
  ADD CONSTRAINT `indicador_ibfk_1` FOREIGN KEY (`id_unidad_medicion`) REFERENCES `unidad_medicion` (`id_unidad_medicion`),
  ADD CONSTRAINT `indicador_ibfk_2` FOREIGN KEY (`id_pdes`) REFERENCES `pdes` (`id_pdes`),
  ADD CONSTRAINT `indicador_ibfk_3` FOREIGN KEY (`id_ndc`) REFERENCES `ndc` (`id_ndc`),
  ADD CONSTRAINT `indicador_ibfk_4` FOREIGN KEY (`id_pprh`) REFERENCES `pprh` (`id_pprh`),
  ADD CONSTRAINT `indicador_ibfk_5` FOREIGN KEY (`id_ods`) REFERENCES `ods` (`id_ods`),
  ADD CONSTRAINT `indicador_ibfk_6` FOREIGN KEY (`id_psdi`) REFERENCES `psdi` (`id_psdi`);

--
-- Filtros para la tabla `linea_de_accion`
--
ALTER TABLE `linea_de_accion`
  ADD CONSTRAINT `linea_de_accion_ibfk_1` FOREIGN KEY (`id_linea_estrategica`) REFERENCES `linea_estrategica` (`id_linea_estrategica`);

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `proyecto_ibfk_2` FOREIGN KEY (`id_tipologia`) REFERENCES `tipologia` (`id_tipologia`),
  ADD CONSTRAINT `proyecto_ibfk_3` FOREIGN KEY (`id_indicador`) REFERENCES `indicador` (`id_indicador`),
  ADD CONSTRAINT `proyecto_ibfk_4` FOREIGN KEY (`id_cuenca`) REFERENCES `cuenca` (`id_cuenca`),
  ADD CONSTRAINT `proyecto_ibfk_5` FOREIGN KEY (`id_accion_estrategica`) REFERENCES `accion_estrategica` (`id_accion_estrategica`);

--
-- Filtros para la tabla `proyecto_ciudad_o_comunidad`
--
ALTER TABLE `proyecto_ciudad_o_comunidad`
  ADD CONSTRAINT `proyecto_ciudad_o_comunidad_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`),
  ADD CONSTRAINT `proyecto_ciudad_o_comunidad_ibfk_2` FOREIGN KEY (`id_ciudad_comunidad`) REFERENCES `ciudad_o_comunidad` (`id`);

--
-- Filtros para la tabla `seguimiento_financiero`
--
ALTER TABLE `seguimiento_financiero`
  ADD CONSTRAINT `seguimiento_financiero_ibfk_1` FOREIGN KEY (`id_financiamiento`) REFERENCES `financiamiento` (`id_financiamiento`);

--
-- Filtros para la tabla `seguimiento_fisico`
--
ALTER TABLE `seguimiento_fisico`
  ADD CONSTRAINT `seguimiento_fisico_ibfk_1` FOREIGN KEY (`id_etapa_proyecto`) REFERENCES `etapa_proyecto` (`id_etapa_proyecto`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_entidad`) REFERENCES `entidad` (`id_entidad`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
