module.exports = function (sequelize, dataTypes) {
    let alias = "Comments"; // mimso nombre qu ele del modelo
    let cols = {
        id_comentario: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        comentario: {
            type: dataTypes.STRING,
        },
        id_delProducto: {
            type: dataTypes.INTEGER,
            field: 'id_delProducto'
        },
        id_delUsuario: {
            type: dataTypes.INTEGER,
            field: 'id_delUsuario'
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
        tableName: "comentarios",
        timestamps: true,
        underscored: false
    };

    const Comments = sequelize.define(alias, cols, config); //mismo nombre que el del modelo

    Comments.associate = function (models) {
        Comments.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'id_delUsuario'
        });
        Comments.belongsTo(models.Products, {
            as: 'products',
            foreignKey: 'id_delProducto'
        });
    };

    return Comments;
};
