module.exports = function (sequelize, dataTypes) {
    let alias = "User";
    let cols = {
        id_usuario: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING(100),
        },
        contraseña: {
            type: dataTypes.STRING(100),
        },
        fecha: {
            type: dataTypes.DATE,
        },
        DNI: {
            type: dataTypes.STRING(20),
        },
        foto: {
            type: dataTypes.TEXT,
        },
        createdAt: {
            type: dataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'updatedAt'
        },
        deletedAt: {
            type: dataTypes.DATE,
            field: 'deletedAt'
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps: true,
        underscored: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.hasMany(models.Comments, {
            as: 'comments',
            foreignKey: 'id_delUsuario'
        });
        User.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'id_delUsuario'
        });
    };

    return User;
};
