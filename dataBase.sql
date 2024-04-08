CREATE SCHEMA proyectoIntegrador;
USE proyectoIntegrador;

CREATE TABLE usuarios (
    id_usuario INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100),
    contraseña VARCHAR(100) NOT NULL,
    fecha DATE,
    DNI VARCHAR(20),
    foto TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL
);

CREATE TABLE productos (
    id_producto INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_delUsuario INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_delUsuario) REFERENCES usuarios(id_usuario),
    foto_producto TEXT,
    nombre VARCHAR(70),
    descripcion VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL
);

CREATE TABLE comentarios (
    id_comentario INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_delProducto INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_delProducto) REFERENCES productos(id_producto),
	id_delUsuario INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_delUsuario) REFERENCES usuarios(id_usuario),
    comentario VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL
);

-- Modificando usuarios: 
-- 1
INSERT INTO usuarios
VALUES (DEFAULT, "valenlambert@gmail.com", "Hola12", "2004-09-07", "46026423", "https://images.hola.com/imagenes/estar-bien/20221018219233/buenas-personas-caracteristicas/1-153-242/getty-chica-feliz-t.jpg?tx=w_680", NULL, NULL, NULL);
-- 2
INSERT INTO usuarios
VALUES (DEFAULT, "ninaellenberg@gmail.com", "Nina22", "2004-09-02", "46213505", "https://images.hola.com/imagenes/estar-bien/20221018219233/buenas-personas-caracteristicas/1-153-242/getty-chica-feliz-t.jpg?tx=w_680", NULL, NULL, NULL);
-- 3
INSERT INTO usuarios
VALUES (DEFAULT, "catalinagomez@gmail.com", "Cato999", "2008-06-19", "49008697", "https://images.hola.com/imagenes/estar-bien/20221018219233/buenas-personas-caracteristicas/1-153-242/getty-chica-feliz-t.jpg?tx=w_680", NULL, NULL, NULL);
-- 4
INSERT INTO usuarios
VALUES (DEFAULT, "cotitolopez@gmail.com", "Cot777", "2004-10-31", "46097867", "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg", NULL, NULL, NULL);
-- 5
INSERT INTO usuarios
VALUES (DEFAULT, "titisara@gmail.com", "Valentina12", "2004-08-08", "50079999", "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg", NULL, NULL, NULL);

-- Modificando productos:
-- 1
INSERT INTO productos
VALUES (DEFAULT, 1, "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.babolat.com.ar%2Fproductos%2Fraqueta-pure-drive-jr-26%2F&psig=AOvVaw2n0zjUXeiW3oBjSnVyudBs&ust=1712674698810000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNiR3cnwsoUDFQAAAAAdAAAAABAE", "Raqueta de tenis", "Raqueta de tenis Wilson Blade 98 color dorado tornasolado encordado 18 x 20 grip 4 1/2", NULL, NULL, NULL);
-- 2
INSERT INTO productos
VALUES (DEFAULT, 4, "https://http2.mlstatic.com/D_NQ_NP_2X_895628-MLU73332865989_122023-F.webp", "Palo de hockey Grays", "Palo Hockey Grays Ac5 Dynabow Micro Carbono 60% Color Negro", NULL, NULL, NULL);
-- 3
INSERT INTO productos
VALUES (DEFAULT, 4, "https://http2.mlstatic.com/D_NQ_NP_2X_960553-MLA74108971857_012024-F.webp", "Palo de hockey Vlack", "Palo De Hockey Vlack Sabah 10% Carbono Fucsia", NULL, NULL, NULL);
-- 4
INSERT INTO productos
VALUES (DEFAULT, 4, "https://http2.mlstatic.com/D_NQ_NP_2X_811860-MLU75436747356_042024-F.webp", "Raqueta Paddle Wilson", "Paleta Padel - Kaos Komp - Wilson Color Negro/Verde", NULL, NULL, NULL);
-- 5  
INSERT INTO productos
VALUES (DEFAULT, 4, "https://http2.mlstatic.com/D_NQ_NP_2X_744102-MLU74628828938_022024-F.webp", "Raqueta Tenis Babolat", "Raqueta Babolat Boost Aero 4 3/8 102in Grafito Color Negro Tamaño Del Grip 3", NULL, NULL, NULL);
-- 6  
INSERT INTO productos
VALUES (DEFAULT, 4, "https://http2.mlstatic.com/D_NQ_NP_2X_912990-MLA54624360301_032023-F.webp","Palo de hockey Malik", "Palo De Hockey Malik 20% Carbono 37.5 - Gtia Of Hockey House", NULL, NULL, NULL);
-- 7  
INSERT INTO productos
VALUES (DEFAULT, 4, "https://http2.mlstatic.com/D_NQ_NP_2X_899009-MLA75107085017_032024-F.webp","Pelota de Futbol", "Pelota Futbol adidas Epp Club Numero 5 Blanca Solo Deportes", NULL, NULL, NULL);
-- 8 
INSERT INTO productos
VALUES (DEFAULT, 4, "https://http2.mlstatic.com/D_NQ_NP_2X_680482-MLU73121331524_122023-F.webp", "Tubo de pelotas", "Pelota de Padel Head Pro color amarillo por unidad de 1 unidades por 3 por paquete", NULL, NULL, NULL);
-- 9  
INSERT INTO productos
VALUES (DEFAULT, 4, "https://http2.mlstatic.com/D_NQ_NP_2X_610872-MLU73226120152_122023-F.webp", "Raqueta Paddle", "Paleta De Pádel Munich Xdrive Kevlar Y Fibra Vidrio Color Verde", NULL, NULL, NULL);
-- 10 
INSERT INTO productos
VALUES (DEFAULT, 4, "https://http2.mlstatic.com/D_NQ_NP_2X_793318-MLA50937672063_072022-F.webp", "Bochas de Hockey", "Pack X12 Bochas De Hockey Pelota Dimple Pvc Entrenamiento", NULL, NULL, NULL);

-- Modificando comentarios
-- 1
INSERT INTO comentarios
VALUES (DEFAULT, 2, 2, "¿Viene en color rosa?", NULL, NULL, NULL);
-- 2
INSERT INTO comentarios
VALUES (DEFAULT, 1, 1, "¿Aceptas 40.000?", NULL, NULL, NULL);
-- 3
INSERT INTO comentarios
VALUES (DEFAULT, 3,3, "¿Cuanto tiene de carbono?", NULL, NULL, NULL);

