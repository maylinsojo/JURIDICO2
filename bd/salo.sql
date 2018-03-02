-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 26-02-2018 a las 06:28:14
-- Versión del servidor: 5.6.36
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `salo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

CREATE TABLE `asignatura` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `id_estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`id`, `descripcion`, `id_estatus`) VALUES
(1, 'Lenguaje', 1),
(2, 'Matemáticas', 1),
(3, 'Ciencias Naturales', 1),
(4, 'Historia', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductor_transportista`
--

CREATE TABLE `conductor_transportista` (
  `id` int(11) NOT NULL,
  `id_transportista` int(11) NOT NULL,
  `nombre` varchar(250) CHARACTER SET utf8 NOT NULL,
  `telefono` varchar(50) CHARACTER SET utf8 NOT NULL,
  `otro_telefono` varchar(50) CHARACTER SET utf8 NOT NULL,
  `correo` varchar(250) CHARACTER SET utf8 NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `conductor_transportista`
--

INSERT INTO `conductor_transportista` (`id`, `id_transportista`, `nombre`, `telefono`, `otro_telefono`, `correo`) VALUES
(5, 2, 'LIBRE SOY', '56222222222', '56433333333', 'libresoy@gmail.com'),
(4, 2, 'LUIS ALFONZO', '56932747420', '56222222222', 'fonchitr@gmail.com'),
(6, 3, 'JUAN', '56932444444', '', 'jeds@gmail.com'),
(7, 2, 'LUIS ALEJANDRO', '56932555555', '', 'alejo@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto_establecimiento`
--

CREATE TABLE `contacto_establecimiento` (
  `id` int(11) NOT NULL,
  `id_establecimiento` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `otro_telefono` varchar(50) NOT NULL,
  `correo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contacto_establecimiento`
--

INSERT INTO `contacto_establecimiento` (`id`, `id_establecimiento`, `nombre`, `telefono`, `otro_telefono`, `correo`) VALUES
(10, 1, 'DAVID LEONARDO MOLINA RUIZ', '4222222222', '3344435543', 'dmolina101@gmail.com'),
(11, 2, 'MIRIAM ANTICH', '5693274745', '', 'mantich@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `id_nivel` int(11) NOT NULL,
  `orden` int(11) NOT NULL,
  `id_estatus` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id`, `descripcion`, `id_nivel`, `orden`, `id_estatus`) VALUES
(1, 'NT1-A', 1, 1, 1),
(2, 'NT1-B', 1, 2, 1),
(3, 'NT1-C', 1, 3, 1),
(4, 'NT2-A', 1, 4, 1),
(5, 'NT2-B', 1, 5, 1),
(6, 'NT2-C', 1, 6, 1),
(7, '1-A', 2, 1, 1),
(8, '1-B', 2, 1, 1),
(9, '1-C', 2, 3, 1),
(10, '2-A', 2, 4, 1),
(11, '2-B', 2, 5, 1),
(12, '2-C', 2, 6, 1),
(13, '3-A', 2, 7, 1),
(14, '3-B', 2, 8, 1),
(15, '3-C', 2, 9, 1),
(16, '4-A', 2, 10, 1),
(17, '4-B', 2, 11, 1),
(18, '4-C', 2, 12, 1),
(19, '5-A', 2, 13, 1),
(20, '5-B', 2, 14, 1),
(21, '5-C', 2, 15, 1),
(22, '6-A', 2, 16, 1),
(23, '6-B', 2, 17, 1),
(24, '6-C', 2, 18, 1),
(25, '7-A', 2, 19, 1),
(26, '7-B', 2, 20, 1),
(27, '7-C', 2, 21, 1),
(28, '8-A', 2, 22, 1),
(29, '8-B', 2, 23, 1),
(30, '8-C', 2, 24, 1),
(31, '1 MEDIO-A', 3, 1, 1),
(32, '2 MEDIO-B', 3, 4, 1),
(33, '1 MEDIO-B', 3, 2, 1),
(34, '1 MEDIA-C', 3, 3, 1),
(35, '2 MEDIA-A', 3, 5, 1),
(36, '2 MEDIA-C', 3, 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_esteblecimiento`
--

CREATE TABLE `curso_esteblecimiento` (
  `id` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_establecimiento` int(11) NOT NULL,
  `num_alumnos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `curso_esteblecimiento`
--

INSERT INTO `curso_esteblecimiento` (`id`, `id_curso`, `id_establecimiento`, `num_alumnos`) VALUES
(2, 3, 1, 245),
(3, 1, 2, 22),
(4, 4, 2, 20),
(5, 7, 2, 45),
(6, 10, 2, 45),
(7, 13, 2, 15),
(8, 2, 2, 19),
(9, 3, 2, 20),
(10, 5, 2, 15),
(11, 6, 2, 19),
(12, 8, 2, 15),
(13, 9, 2, 35),
(14, 11, 2, 40),
(15, 12, 2, 40),
(16, 14, 2, 35),
(17, 15, 2, 45),
(18, 16, 2, 40),
(19, 17, 2, 45),
(20, 18, 2, 45),
(21, 19, 2, 45),
(22, 20, 2, 40),
(23, 21, 2, 40),
(24, 22, 2, 45),
(25, 23, 2, 45),
(26, 24, 2, 45),
(27, 25, 2, 40),
(28, 26, 2, 40),
(29, 27, 2, 40),
(30, 28, 2, 45),
(31, 29, 2, 45),
(32, 30, 2, 45),
(33, 31, 2, 50),
(34, 32, 2, 50),
(35, 33, 2, 50),
(36, 34, 2, 55),
(37, 35, 2, 45),
(38, 36, 2, 43);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `despacho_pedagogico`
--

CREATE TABLE `despacho_pedagogico` (
  `id` int(11) NOT NULL,
  `id_establecimiento` int(11) NOT NULL,
  `id_transportista` int(11) NOT NULL,
  `id_conductor` int(11) NOT NULL,
  `id_imprenta` int(11) NOT NULL,
  `fecha_despacho` varchar(10) NOT NULL,
  `coste_imprenta` float(11,2) NOT NULL,
  `id_mod_peda` int(11) NOT NULL,
  `fecha_registro` varchar(10) NOT NULL,
  `id_estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `despacho_pedagogico`
--

INSERT INTO `despacho_pedagogico` (`id`, `id_establecimiento`, `id_transportista`, `id_conductor`, `id_imprenta`, `fecha_despacho`, `coste_imprenta`, `id_mod_peda`, `fecha_registro`, `id_estatus`) VALUES
(1, 2, 2, 0, 5, '24/02/2018', 11.00, 1, '24/02/2018', 1),
(2, 1, 1, 0, 5, '25/02/2018', 11.00, 1, '25/02/2018', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_despacho_pedagogico`
--

CREATE TABLE `detalle_despacho_pedagogico` (
  `id` int(11) NOT NULL,
  `id_despacho_peda` int(11) NOT NULL,
  `id_modulo_peda` int(11) NOT NULL,
  `id_asignatura` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `eval` int(10) NOT NULL,
  `hr` int(10) NOT NULL,
  `pag` int(10) NOT NULL,
  `t` int(10) NOT NULL,
  `subtotal` float(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_despacho_pedagogico`
--

INSERT INTO `detalle_despacho_pedagogico` (`id`, `id_despacho_peda`, `id_modulo_peda`, `id_asignatura`, `id_curso`, `eval`, `hr`, `pag`, `t`, `subtotal`) VALUES
(1, 1, 1, 1, 10, 45, 0, 10, 450, 4950.00),
(2, 1, 1, 1, 11, 40, 0, 10, 400, 4400.00),
(3, 1, 1, 1, 12, 40, 0, 10, 400, 4400.00),
(4, 2, 1, 2, 3, 245, 0, 40, 9800, 107800.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimiento`
--

CREATE TABLE `establecimiento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `id_comuna` int(11) NOT NULL,
  `id_estatus` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `establecimiento`
--

INSERT INTO `establecimiento` (`id`, `nombre`, `id_comuna`, `id_estatus`) VALUES
(1, 'DON BOSCO', 1, 1),
(2, 'SAINT ORLAND', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatus`
--

CREATE TABLE `estatus` (
  `id` int(11) NOT NULL,
  `tabla` varchar(200) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `valor` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estatus`
--

INSERT INTO `estatus` (`id`, `tabla`, `descripcion`, `valor`) VALUES
(1, 'usuario', 'activo', 1),
(2, 'usuario', 'inactivo', 2),
(3, 'establecimiento', 'activo', 1),
(4, 'establecimiento', 'inactivo', 2),
(5, 'curso', 'activo', 1),
(6, 'curso', 'inactivo', 2),
(11, 'menu', 'Activo', 1),
(12, 'menu', 'Inactivo', 2),
(13, 'servicio', 'Activo', 1),
(14, 'servicio', 'Inactivo', 2),
(15, 'servicio_establecimiento', 'Activo', 1),
(16, 'servicio_establecimiento', 'Inactivo', 2),
(17, 'asignatura', 'Activo', 1),
(18, 'asignatura', 'Inactivo', 2),
(19, 'curso_asignatura', 'Activo', 1),
(20, 'curso_asignatura', 'Inactivo', 2),
(21, 'region', 'activa', 1),
(22, 'region', 'inactiva', 2),
(23, 'despacho_pedagogico', 'Planificado', 1),
(24, 'despacho_pedagogico', 'Despachado', 2),
(25, 'despacho_pedagogico', 'Entregado', 3),
(26, 'despacho_pedagogico', 'Cancelado', 4),
(27, 'region_comuna', 'activa', 1),
(28, 'region_comuna', 'inactiva', 2),
(29, 'imprenta', 'activa', 1),
(30, 'imprenta', 'inactiva', 2),
(31, 'transportista', 'activa', 1),
(32, 'transportista', 'inactiva', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imprenta`
--

CREATE TABLE `imprenta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) CHARACTER SET latin1 NOT NULL,
  `lista_imprentas` int(1) NOT NULL,
  `id_estatus` int(2) NOT NULL,
  `precio` float(11,2) NOT NULL,
  `direccion` varchar(500) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `imprenta`
--

INSERT INTO `imprenta` (`id`, `nombre`, `lista_imprentas`, `id_estatus`, `precio`, `direccion`) VALUES
(1, 'Plotter', 0, 1, 17.00, ''),
(2, 'kopigex', 0, 1, 9.00, ''),
(3, 'Impresiones Chile', 0, 1, 22.00, ''),
(5, 'Imprentas Rodriguez', 0, 1, 11.00, ''),
(6, 'Imprenta Luises', 0, 2, 35.00, ''),
(7, 'Imprentas Linjeric', 0, 1, 11.00, 'Portugal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_correo`
--

CREATE TABLE `mensaje_correo` (
  `id` int(11) NOT NULL,
  `asunto` varchar(150) NOT NULL,
  `mensaje` varchar(2000) NOT NULL,
  `quien_envia_correo` varchar(150) NOT NULL,
  `quien_envia_nombre` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mensaje_correo`
--

INSERT INTO `mensaje_correo` (`id`, `asunto`, `mensaje`, `quien_envia_correo`, `quien_envia_nombre`) VALUES
(1, 'Registro', 'Bienvenid@ a SALO, sus datos son los sieguientes: <br/>\r\n\r\n<b>Usuario    :</b> #CORREO# <br/>\r\n<b>Contraseña :</b> #CLAVE#', 'soporte@mollynadas.com.ve', 'SALO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `url` varchar(250) NOT NULL,
  `id_padre` int(11) NOT NULL,
  `orden` int(11) NOT NULL,
  `id_estatus` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`id`, `descripcion`, `url`, `id_padre`, `orden`, `id_estatus`) VALUES
(1, 'Usuarios', 'salo/usuarios/c_usuarios', 0, 0, 1),
(2, 'Definiciones Generales', '', 0, 1, 1),
(3, 'Regiones', 'salo/regiones/c_regiones', 2, 0, 1),
(4, 'Establecimientos Educativos', 'salo/establecimientos/c_establecimientos', 2, 1, 1),
(5, 'Servicios', '', 0, 2, 1),
(6, 'Modelo Pedagógico', '', 5, 0, 1),
(7, 'Evaluaciones Externas', '', 5, 1, 1),
(8, 'Nuevo Despacho', 'salo/servicios/c_pedagogico/formNuevoDesp', 6, 0, 1),
(9, 'Imprentas', 'salo/imprentas/c_imprentas', 2, 2, 1),
(10, 'Transportistas', 'salo/transportistas/c_transportistas', 2, 3, 1),
(11, 'Despachos Creados', 'salo/servicios/c_pedagogico', 6, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu_usuario`
--

CREATE TABLE `menu_usuario` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `menu_usuario`
--

INSERT INTO `menu_usuario` (`id`, `id_usuario`, `id_menu`) VALUES
(24, 1, 1),
(25, 1, 3),
(26, 1, 4),
(27, 1, 9),
(28, 1, 10),
(30, 1, 8),
(31, 1, 7),
(47, 2, 1),
(48, 2, 3),
(49, 2, 4),
(50, 2, 9),
(51, 2, 10),
(52, 2, 8),
(53, 2, 11),
(54, 2, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo_pedagogico`
--

CREATE TABLE `modulo_pedagogico` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `id_estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `modulo_pedagogico`
--

INSERT INTO `modulo_pedagogico` (`id`, `descripcion`, `id_estatus`) VALUES
(1, 'SP1', 1),
(2, 'SP2', 1),
(3, 'SP3', 1),
(4, 'SP4', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel_educativo`
--

CREATE TABLE `nivel_educativo` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `orden` int(11) NOT NULL,
  `id_estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `nivel_educativo`
--

INSERT INTO `nivel_educativo` (`id`, `descripcion`, `orden`, `id_estatus`) VALUES
(1, 'Pre-Básico', 1, 1),
(2, 'Básico 	', 2, 1),
(3, 'Medio', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_servicio`
--

CREATE TABLE `producto_servicio` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `orden` int(2) NOT NULL,
  `id_estatus` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto_servicio`
--

INSERT INTO `producto_servicio` (`id`, `descripcion`, `orden`, `id_estatus`) VALUES
(1, 'Diagnóstico', 1, 1),
(2, 'Mineduc', 2, 1),
(3, 'Módulos', 3, 1),
(4, 'Remediales', 4, 1),
(5, 'Guías', 5, 1),
(6, 'Sumativas', 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `region`
--

CREATE TABLE `region` (
  `id` int(11) NOT NULL,
  `numero` varchar(5) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `imagen` varchar(15) NOT NULL,
  `id_estatus` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `region`
--

INSERT INTO `region` (`id`, `numero`, `nombre`, `imagen`, `id_estatus`) VALUES
(2, 'XIII', 'Metropolitana de Santiago', '', 1),
(3, 'VI', 'Libertador General Bernardo OHiggins', '', 1),
(5, 'IX', 'Araucanía', '', 1),
(6, 'VIII', 'Biobío', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `region_comuna`
--

CREATE TABLE `region_comuna` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `id_region` int(11) NOT NULL,
  `id_estatus` int(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `region_comuna`
--

INSERT INTO `region_comuna` (`id`, `nombre`, `id_region`, `id_estatus`) VALUES
(1, 'Comuna 1', 2, 1),
(2, 'Cerro Navia', 2, 1),
(3, 'Rancagua', 3, 1),
(4, 'San Fernando', 3, 1),
(5, 'Pumanque', 3, 1),
(6, 'Temuco', 5, 1),
(7, 'Purén', 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `id_estatus` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`id`, `descripcion`, `id_estatus`) VALUES
(1, 'Pedagógico', 1),
(2, 'Evaluación Externa', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(120) NOT NULL,
  `id_estatus` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id`, `descripcion`, `id_estatus`) VALUES
(1, 'Administrador', 1),
(2, 'Vendedor', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transportista`
--

CREATE TABLE `transportista` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `lista_conductores` int(1) NOT NULL,
  `id_estatus` int(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `transportista`
--

INSERT INTO `transportista` (`id`, `nombre`, `logo`, `lista_conductores`, `id_estatus`) VALUES
(1, 'master7', '', 0, 1),
(2, 'DHL', '', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `avatar` varchar(15) NOT NULL DEFAULT 'default.jpg',
  `clave` varchar(500) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `correo_principal` varchar(500) NOT NULL,
  `correo_secundario` varchar(500) NOT NULL,
  `id_tipo_usuario` int(2) NOT NULL,
  `id_estatus` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `avatar`, `clave`, `nombre`, `correo_principal`, `correo_secundario`, `id_tipo_usuario`, `id_estatus`) VALUES
(1, 'default.jpg', '04f005946aa312fea8177d7596ebf13f', 'David Leonardo Molina Ruíz', 'dmolina101@gmail.com', '', 1, 1),
(2, 'default.jpg', '7ecaa2839ee4790d2f0aa6bb5e694c9f', 'Jessica Rodriguez Velasquez', 'jessica0233@gmail.com', 'jessica0233@gmail.com', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `conductor_transportista`
--
ALTER TABLE `conductor_transportista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_transportista` (`id_transportista`);

--
-- Indices de la tabla `contacto_establecimiento`
--
ALTER TABLE `contacto_establecimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_establecimiento` (`id_establecimiento`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_nivel` (`id_nivel`);

--
-- Indices de la tabla `curso_esteblecimiento`
--
ALTER TABLE `curso_esteblecimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_establecimiento` (`id_establecimiento`);

--
-- Indices de la tabla `despacho_pedagogico`
--
ALTER TABLE `despacho_pedagogico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_establecimiento` (`id_establecimiento`),
  ADD KEY `id_conductor` (`id_conductor`),
  ADD KEY `id_imprenta` (`id_imprenta`),
  ADD KEY `id_mod_peda` (`id_mod_peda`);

--
-- Indices de la tabla `detalle_despacho_pedagogico`
--
ALTER TABLE `detalle_despacho_pedagogico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_modulo_peda` (`id_modulo_peda`),
  ADD KEY `id_despacho_peda` (`id_despacho_peda`);

--
-- Indices de la tabla `establecimiento`
--
ALTER TABLE `establecimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_comuna` (`id_comuna`);

--
-- Indices de la tabla `estatus`
--
ALTER TABLE `estatus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imprenta`
--
ALTER TABLE `imprenta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensaje_correo`
--
ALTER TABLE `mensaje_correo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_padre` (`id_padre`);

--
-- Indices de la tabla `menu_usuario`
--
ALTER TABLE `menu_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indices de la tabla `modulo_pedagogico`
--
ALTER TABLE `modulo_pedagogico`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nivel_educativo`
--
ALTER TABLE `nivel_educativo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto_servicio`
--
ALTER TABLE `producto_servicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `region_comuna`
--
ALTER TABLE `region_comuna`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_region` (`id_region`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transportista`
--
ALTER TABLE `transportista`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_usuario` (`id_tipo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `conductor_transportista`
--
ALTER TABLE `conductor_transportista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `contacto_establecimiento`
--
ALTER TABLE `contacto_establecimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT de la tabla `curso_esteblecimiento`
--
ALTER TABLE `curso_esteblecimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT de la tabla `despacho_pedagogico`
--
ALTER TABLE `despacho_pedagogico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `detalle_despacho_pedagogico`
--
ALTER TABLE `detalle_despacho_pedagogico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `establecimiento`
--
ALTER TABLE `establecimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `estatus`
--
ALTER TABLE `estatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT de la tabla `imprenta`
--
ALTER TABLE `imprenta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `mensaje_correo`
--
ALTER TABLE `mensaje_correo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `menu_usuario`
--
ALTER TABLE `menu_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT de la tabla `modulo_pedagogico`
--
ALTER TABLE `modulo_pedagogico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `nivel_educativo`
--
ALTER TABLE `nivel_educativo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `producto_servicio`
--
ALTER TABLE `producto_servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `region`
--
ALTER TABLE `region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `region_comuna`
--
ALTER TABLE `region_comuna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `transportista`
--
ALTER TABLE `transportista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacto_establecimiento`
--
ALTER TABLE `contacto_establecimiento`
  ADD CONSTRAINT `contacto_establecimiento_ibfk_1` FOREIGN KEY (`id_establecimiento`) REFERENCES `establecimiento` (`id`);

--
-- Filtros para la tabla `curso_esteblecimiento`
--
ALTER TABLE `curso_esteblecimiento`
  ADD CONSTRAINT `curso_esteblecimiento_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`),
  ADD CONSTRAINT `curso_esteblecimiento_ibfk_2` FOREIGN KEY (`id_establecimiento`) REFERENCES `establecimiento` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `tipo_usuario` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
