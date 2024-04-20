const db = {
    usuario: {
      usuario: "Valentina Ellenberg",
      email: "valellenberg@example.com",
      contraseña: "hola12",
      nacimiento: "2004-07-09",
      documento: 46026423,
      foto: "images/users/persona2.jpg", 
      
    },
    productos: [
      {
        imagen: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.babolat.com.ar%2Fproductos%2Fraqueta-pure-drive-jr-26%2F&psig=AOvVaw2n0zjUXeiW3oBjSnVyudBs&ust=1712674698810000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNiR3cnwsoUDFQAAAAAdAAAAABAE",
        producto:"Raqueta de tenis",
        descripcion: "Raqueta de tenis Wilson Blade 98 color dorado tornasolado encordado 18 x 20 grip 4 1/2",
        comentarios: [
            {
              usuario: "Usuario1",
              texto: "¡Que bella raqueta!",
              imagenPerfil: "images/users/default-image.png"
            },
            {
                usuario: "Usuario3",
                texto: "¿De donde sos?",
                imagenPerfil: "images/users/default-image.png"
              } ]
      },
      {
       imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_895628-MLU73332865989_122023-F.webp",
       producto: "Palo de hockey Grays", 
       descripcion: "Palo Hockey Grays Ac5 Dynabow Micro Carbono 60% Color Negro",
       comentarios: [
        {
          usuario: "Usuario1",
          texto: "¡Hermoso!",
          imagenPerfil: "images/users/default-image.png"
        } ]
      }, 
      {
        imagen:  "https://http2.mlstatic.com/D_NQ_NP_2X_960553-MLA74108971857_012024-F.webp", 
        producto:"Palo de hockey Vlack", 
        descripcion: "Palo De Hockey Vlack Sabah 10% Carbono Fucsia",
        comentarios: [
            {
              usuario: "Usuario1",
              texto: "¡¿Cuanto mide?!",
              imagenPerfil: "images/users/default-image.png"
            } ]
      },
      {
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_811860-MLU75436747356_042024-F.webp", 
        producto: "Raqueta Paddle Wilson",
        descripcion:  "Paleta Padel - Kaos Komp - Wilson Color Negro/Verde",
        comentarios: [
            {
              usuario: "Usuario1",
              texto: "¿Aceptas 80?",
              imagenPerfil: "images/users/default-image.png"
            },
            {
                usuario: "Usuario2",
                texto: "¡Quiero!",
                imagenPerfil: "images/users/default-image.png"
              } ]
      },
      {
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_744102-MLU74628828938_022024-F.webp", 
        producto: "Raqueta Tenis Babolat",
        descripcion: "Raqueta Babolat Boost Aero 4 3/8 102in Grafito Color Negro Tamaño Del Grip 3",
        comentarios: [
            {
              usuario: "Usuario1",
              texto: "¿Haces envios?",
              imagenPerfil: "images/users/default-image.png"
            } ]
      },
      {
       imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_912990-MLA54624360301_032023-F.webp",
       producto:"Palo de hockey Malik", 
       descripcion: "Palo De Hockey Malik 20% Carbono 37.5 - Gtia Of Hockey House",
       comentarios: [
        {
          usuario: "Usuario1",
          texto: "Medidas?",
          imagenPerfil: "images/users/default-image.png"
        } ]
      }, 
      {
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_899009-MLA75107085017_032024-F.webp",
        producto: "Pelota de Futbol", 
        descripcion: "Pelota Futbol adidas Epp Club Numero 5 Blanca Solo Deportes",
        comentarios: [
            {
              usuario: "Usuario1",
              texto: "¡Que bella!",
              imagenPerfil: "images/users/default-image.png"
            },{
                usuario: "Usuario1",
                texto: "¿Aceptas 30?",
                imagenPerfil: "images/users/default-image.png"
              }
         ]
      },
      {
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_680482-MLU73121331524_122023-F.webp", 
        producto: "Tubo de pelotas", 
        descripcion: "Pelota de Padel Head Pro color amarillo por unidad de 1 unidades por 3 por paquete",
        comentarios: [
            {
              usuario: "Usuario1",
              texto: "¿De donde sos?¿Se puede retirar?",
              imagenPerfil: "images/users/default-image.png"
            } ]
      },
      {
       imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_610872-MLU73226120152_122023-F.webp", 
       producto: "Raqueta Paddle", 
       descripcion: "Paleta De Pádel Munich Xdrive Kevlar Y Fibra Vidrio Color Verde",
       comentarios: [
        {
          usuario: "Usuario1",
          texto: "¿Peso?",
          imagenPerfil: "images/users/default-image.png"
        } ]
      },
      {
        imagen:  "https://http2.mlstatic.com/D_NQ_NP_2X_793318-MLA50937672063_072022-F.webp", 
        producto: "Bochas de Hockey", 
        descripcion: "Pack X12 Bochas De Hockey Pelota Dimple Pvc Entrenamiento",
        comentarios: [
            {
              usuario: "Usuario1",
              texto: "¡Quiero!",
              imagenPerfil: "images/users/default-image.png"
            },{
                usuario: "Usuario2",
                texto: "Wow",
                imagenPerfil: "images/users/default-image.png"
              }
         ]
      },
    ]

   
  };
  
  module.exports = db;
  