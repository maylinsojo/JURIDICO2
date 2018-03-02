-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 26-01-2018 a las 14:57:21
-- Versión del servidor: 5.6.36-cll-lve
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tumultim_salo`
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
(1, 'Matemática', 1),
(2, 'Lengua', 1),
(3, 'Historia ', 1),
(4, 'Ciencias Naturales', 1);

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
(1, 2, 'DAVID MOLINA RODRIGUEZ', '1111111111', '2222222222', 'dmolina101@gmail.com'),
(2, 4, 'JESSICA GABRIELA VELASQUEZ', '5693245454', '', 'fonchitr@hotmail.com'),
(3, 2, 'LUIS ALFONZO TOVAR', '5674747474', '5624353535', 'fonchitr@gmail.com'),
(4, 4, 'JUANA LUISA', '5693292929', '5622222222', 'jlas@gmail.com'),
(5, 5, 'MIRIAM ANTICH', '9327474656', '', 'mantich@gmail.com');

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
(1, 'Primero', 2, 1, 1),
(2, 'Segundo', 2, 2, 1),
(3, 'Tercero', 2, 3, 1),
(4, 'Cuarto', 2, 4, 1),
(5, 'Quinto', 2, 5, 1),
(6, 'Sexto', 2, 6, 1),
(7, 'Séptimo', 2, 7, 1),
(8, 'Octavo', 2, 8, 1),
(9, 'Primero', 3, 1, 1),
(10, 'Segundo', 3, 2, 1),
(11, 'Tercero', 3, 3, 1),
(12, 'Cuarto', 3, 4, 1),
(13, 'NT1', 1, 1, 1),
(14, 'NT2', 1, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_esteblecimiento`
--

CREATE TABLE `curso_esteblecimiento` (
  `id` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_establecimiento` int(11) NOT NULL,
  `num_alumnos` int(11) NOT NULL,
  `id_estatus` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `curso_esteblecimiento`
--

INSERT INTO `curso_esteblecimiento` (`id`, `id_curso`, `id_establecimiento`, `num_alumnos`, `id_estatus`) VALUES
(3, 13, 2, 32, 1),
(6, 14, 2, 25, 1),
(7, 9, 2, 12, 1),
(8, 1, 2, 122222, 1),
(9, 2, 2, 12, 1),
(10, 3, 2, 25, 1),
(12, 5, 2, 301, 1),
(13, 6, 2, 12, 1),
(14, 7, 2, 23, 1),
(16, 4, 2, 54, 1),
(17, 1, 4, 12, 1),
(18, 1, 3, 28, 1),
(19, 1, 5, 36, 1),
(20, 2, 5, 10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `despacho_pedagogico`
--

CREATE TABLE `despacho_pedagogico` (
  `id` int(11) NOT NULL,
  `id_establecimiento` int(11) NOT NULL,
  `id_transportista` int(11) NOT NULL,
  `id_conductor` int(11) NOT NULL,
  `fecha_despacho` varchar(10) NOT NULL,
  `fecha_registro` varchar(10) NOT NULL,
  `id_estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `despacho_pedagogico`
--

INSERT INTO `despacho_pedagogico` (`id`, `id_establecimiento`, `id_transportista`, `id_conductor`, `fecha_despacho`, `fecha_registro`, `id_estatus`) VALUES
(3, 2, 2, 5, '05/12/2017', '05/12/2017', 1),
(4, 6, 2, 0, '27/12/2017', '05/12/2017', 1),
(5, 3, 2, 5, '28/12/2017', '05/12/2017', 1),
(6, 3, 1, 0, '29/12/2017', '05/12/2017', 1),
(7, 5, 1, 0, '29/12/2017', '05/12/2017', 1),
(8, 4, 2, 0, '31/12/2017', '05/12/2017', 2),
(9, 4, 2, 5, '30/12/2017', '12/12/2017', 2),
(10, 3, 2, 4, '31/12/2017', '13/12/2017', 1),
(11, 2, 2, 5, '21/12/2017', '21/12/2017', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_despacho_pedagogico`
--

CREATE TABLE `detalle_despacho_pedagogico` (
  `id` int(11) NOT NULL,
  `id_despacho_peda` int(11) NOT NULL,
  `id_modulo_peda` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_asignatura` int(11) NOT NULL,
  `precio` float(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_despacho_pedagogico`
--

INSERT INTO `detalle_despacho_pedagogico` (`id`, `id_despacho_peda`, `id_modulo_peda`, `cantidad`, `id_asignatura`, `precio`) VALUES
(5, 3, 2, 3, 1, 3.01),
(6, 3, 2, 2, 4, 2.00),
(7, 4, 1, 2, 3, 2.56),
(8, 5, 2, 3, 4, 3356.00),
(9, 6, 3, 32, 3, 3.00),
(10, 7, 1, 333, 4, 3.00),
(15, 0, 1, 5, 3, 11.00),
(16, 0, 1, 8, 1, 11.05),
(17, 0, 1, 6, 4, 11.50),
(18, 0, 1, 5, 3, 11.00),
(19, 0, 1, 7, 1, 11.05),
(20, 0, 1, 6, 4, 11.50),
(21, 0, 2, 3, 1, 3.01),
(22, 0, 2, 2, 4, 2.00),
(37, 9, 1, 7, 3, 11.05),
(38, 9, 2, 3, 1, 3.01),
(39, 9, 2, 2, 4, 2.00),
(40, 10, 1, 1, 4, 11.00),
(41, 10, 1, 22, 3, 11.00),
(42, 8, 1, 2, 4, 33.00),
(44, 11, 3, 30, 2, 11.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimiento`
--

CREATE TABLE `establecimiento` (
  `id` int(11) NOT NULL,
  `id_region` int(50) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `id_comuna` int(11) NOT NULL,
  `id_estatus` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `establecimiento`
--

INSERT INTO `establecimiento` (`id`, `id_region`, `nombre`, `id_comuna`, `id_estatus`) VALUES
(2, 0, 'DON BOSCO', 3, 1),
(3, 0, 'SAN FRANCISCO DE ASIS', 9, 1),
(4, 0, 'COLEGIO 1', 4, 1),
(5, 0, 'SAINT ORLAND', 9, 1);

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
(9, 'curso_esteblecimiento', 'Activo', 1),
(10, 'curso_esteblecimiento', 'Inactivo', 2),
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
(26, 'despacho_pedagogico', 'Cancelado', 4);

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
(1, 'Usuarios', 'salo/usuarios/c_usuarios', 0, 1, 1),
(2, 'Regiones', 'salo/regiones/c_regiones', 0, 2, 1),
(3, 'E.E', 'salo/establecimientos/c_establecimientos', 0, 3, 1),
(4, 'Solicitud', 'salo/solicitud/c_solicitud', 0, 4, 1),
(5, 'Comunas', 'salo/comunas/c_comunas', 0, 5, 1),
(6, 'Transportistas', 'salo/transportistas/c_transportistas', 0, 6, 1),
(7, 'Servicios', '', 0, 7, 1),
(8, 'Pedagógico', 'salo/servicios/c_pedagogico', 7, 1, 1),
(9, 'Evaluaciones Externas', '', 7, 1, 1);

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
(6, 22, 1),
(48, 21, 1),
(49, 21, 2),
(50, 21, 3),
(51, 21, 5),
(52, 21, 6),
(53, 21, 8),
(54, 21, 9),
(55, 1, 1),
(56, 1, 2),
(57, 1, 3),
(58, 1, 4),
(59, 1, 5),
(60, 1, 6),
(61, 1, 8),
(62, 1, 9),
(63, 35, 1),
(64, 35, 3),
(65, 35, 6),
(66, 35, 8),
(67, 35, 9);

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
-- Estructura de tabla para la tabla `modulo_servicio`
--

CREATE TABLE `modulo_servicio` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `id_servicio` int(11) NOT NULL,
  `id_estatus` int(2) NOT NULL,
  `precio` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `modulo_servicio`
--

INSERT INTO `modulo_servicio` (`id`, `descripcion`, `id_servicio`, `id_estatus`, `precio`) VALUES
(1, 'SP1', 1, 1, 0),
(2, 'SP2', 1, 1, 0),
(3, 'SP3', 1, 1, 0),
(4, 'SP4', 1, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mod_serv_asig`
--

CREATE TABLE `mod_serv_asig` (
  `id` int(11) NOT NULL,
  `id_asignatura` int(11) NOT NULL,
  `id_modulo` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
(1, 'Pre-Básico', 0, 1),
(2, 'Básico 	', 0, 1),
(3, 'Medio', 0, 1);

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
(4, 'XXX', 'Coquimbo', '', 1),
(6, 'X', 'Antofagasta', '', 1),
(7, 'III', 'Viña del Mar', '', 1),
(8, 'I', 'Atacama', '', 2),
(9, 'X', 'region1', '', 1),
(10, 'XX', 'Region2', '', 1);

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
(3, 'La Serena', 4, 1),
(4, 'Antofagasta', 4, 1),
(5, 'Copiapo', 8, 1),
(6, 'Coquimbo', 4, 1),
(7, 'La cisterna', 8, 1),
(8, 'caracas', 4, 1),
(9, 'Comuna 3', 10, 1),
(10, 'comuna 4', 7, 1),
(11, 'san bernardo', 6, 1),
(12, '', 6, 1),
(13, 'carupano', 6, 1);

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
-- Estructura de tabla para la tabla `servicio_establecimiento`
--

CREATE TABLE `servicio_establecimiento` (
  `id` int(11) NOT NULL,
  `id_establecimiento` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL,
  `fecha_servicio` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicio_establecimiento`
--

INSERT INTO `servicio_establecimiento` (`id`, `id_establecimiento`, `id_servicio`, `fecha_servicio`) VALUES
(1, 3, 1, '0000-00-00'),
(2, 5, 1, '0000-00-00'),
(3, 5, 2, '0000-00-00');

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
(1, 'default.jpg', '04f005946aa312fea8177d7596ebf13f', 'David L. Molina Ruíz', 'dmolina101@gmail.com', '', 1, 1),
(21, 'default.jpg', '7ecaa2839ee4790d2f0aa6bb5e694c9f', 'Jessica G Rodriguez V', 'jessica0233@gmail.com', 'fonchitr@hotmail.com', 1, 1),
(25, 'default.jpg', '1bbd886460827015e5d605ed44252251', 'usuario 1', 'usuario1@u.com', '', 2, 1),
(26, 'default.jpg', '1bbd886460827015e5d605ed44252251', 'usuario 2', 'usuario2@u.com', '', 2, 1),
(27, 'default.jpg', '1bbd886460827015e5d605ed44252251', 'usuario 3', 'usuario3@u.com', '', 2, 1),
(28, 'default.jpg', 'bbb8aae57c104cda40c93843ad5e6db8', 'usuario 4', 'usuario4@u.com', '', 2, 1),
(29, 'default.jpg', '1bbd886460827015e5d605ed44252251', 'usuario 5', 'usuario5@u.com', '', 2, 1),
(30, 'default.jpg', '1bbd886460827015e5d605ed44252251', 'usuario 6', 'usuario6@u.com', '', 2, 1),
(31, 'default.jpg', '1bbd886460827015e5d605ed44252251', 'usuario 7', 'usuario7@u.com', '', 2, 1),
(32, 'default.jpg', '1bbd886460827015e5d605ed44252251', 'usuario 8', 'usuario8@u.com', '', 2, 1),
(33, 'default.jpg', 'bbb8aae57c104cda40c93843ad5e6db8', 'usuario 9', 'usuario9@u.com', '', 2, 2),
(34, 'default.jpg', 'bbb8aae57c104cda40c93843ad5e6db8', 'usuario 10', 'usuario10@u.com', '', 2, 1),
(35, 'default.jpg', '25d55ad283aa400af464c76d713c07ad', 'Miriam Antich', 'mantich@master7.cl', '', 1, 1);

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
  ADD KEY `id_conductor` (`id_conductor`);

--
-- Indices de la tabla `detalle_despacho_pedagogico`
--
ALTER TABLE `detalle_despacho_pedagogico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_despacho_peda` (`id_despacho_peda`),
  ADD KEY `id_modulo_peda` (`id_modulo_peda`);

--
-- Indices de la tabla `establecimiento`
--
ALTER TABLE `establecimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_region` (`id_region`),
  ADD KEY `id_comuna` (`id_comuna`);

--
-- Indices de la tabla `estatus`
--
ALTER TABLE `estatus`
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
-- Indices de la tabla `modulo_servicio`
--
ALTER TABLE `modulo_servicio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `mod_serv_asig`
--
ALTER TABLE `mod_serv_asig`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_asignatura` (`id_asignatura`),
  ADD KEY `id_modulo` (`id_modulo`);

--
-- Indices de la tabla `nivel_educativo`
--
ALTER TABLE `nivel_educativo`
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
-- Indices de la tabla `servicio_establecimiento`
--
ALTER TABLE `servicio_establecimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_establecimiento` (`id_establecimiento`),
  ADD KEY `id_servicio` (`id_servicio`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de la tabla `curso_esteblecimiento`
--
ALTER TABLE `curso_esteblecimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de la tabla `despacho_pedagogico`
--
ALTER TABLE `despacho_pedagogico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `detalle_despacho_pedagogico`
--
ALTER TABLE `detalle_despacho_pedagogico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT de la tabla `establecimiento`
--
ALTER TABLE `establecimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `estatus`
--
ALTER TABLE `estatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT de la tabla `mensaje_correo`
--
ALTER TABLE `mensaje_correo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `menu_usuario`
--
ALTER TABLE `menu_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT de la tabla `modulo_pedagogico`
--
ALTER TABLE `modulo_pedagogico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `modulo_servicio`
--
ALTER TABLE `modulo_servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `mod_serv_asig`
--
ALTER TABLE `mod_serv_asig`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `nivel_educativo`
--
ALTER TABLE `nivel_educativo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `region`
--
ALTER TABLE `region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `region_comuna`
--
ALTER TABLE `region_comuna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `servicio_establecimiento`
--
ALTER TABLE `servicio_establecimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `transportista`
--
ALTER TABLE `transportista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
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
