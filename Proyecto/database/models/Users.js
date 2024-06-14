module.exports = function(sequelize, dataTypes){
    let alias = "User";
    let cols = {
        id_usuario: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING
        },
        contraseña: {
            type: dataTypes.STRING
        },
        fecha: {
            type: dataTypes.DATE
        },
        DNI: {
            type: dataTypes.INTEGER
        },
        foto: {
            type: dataTypes.STRING
        },
        createdAt:{
            type: dataTypes.DATE
        }, 

        updatedAt:{
            type: dataTypes.DATE
        },

        deletedAt:{
            type:dataTypes.DATE
        },
    };
    let config = {
        tableName : "usuarios",
        underscored: true, 
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.hasMany(models.Products, {
            as: "products", //Como voy a llamar a la relación dentro del controlador
            foreignKey: "id_delUsuario",
        }),
        User.hasMany(models.Comments, {
            as: "comentarios", //Como voy a llamar a la relación dentro del controlador
            foreignKey: "id_delUsuario",
        })}

    return User;
}

