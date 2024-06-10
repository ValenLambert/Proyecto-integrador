modeule.exports = function(sequelize, dataTypes){
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
        }
    };
    let config = {
        tableName : "users",
        timestamps: false, 
        underscored: true, 
    };

    const User = sequelize.define(alias, cols, config);

    return User;
}

