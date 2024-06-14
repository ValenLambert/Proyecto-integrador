module.exports = function (sequelize, dataTypes) {
    let alias = "Products";
    let cols = {
        id_producto: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        id_delUsuario: {
            type: dataTypes.INTEGER,
            field: 'id_delUsuario'
        },
        foto_producto: {
            type: dataTypes.TEXT,
        },
        nombre: {
            type: dataTypes.STRING(70),
        },
        descripcion: {
            type: dataTypes.STRING(200),
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
        tableName: "productos",
        timestamps: true,
        underscored: false
    };

    const Products = sequelize.define(alias, cols, config);

    Products.associate = function (models) {
        Products.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'id_delUsuario'
        });
        Products.hasMany(models.Comments, {
            as: 'comments',
            foreignKey: 'id_delProducto'
        });
    };

    return Products;
};
