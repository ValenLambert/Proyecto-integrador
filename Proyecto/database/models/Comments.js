module.exports = function (sequelize, dataTypes){
    let alias = "Comments"; // nombrre de como llame a la tabla
    let cols = {
        id_comentario: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        created_at : {
            type: dataTypes.DATE,
            allowNull:true,
        },
        comentario: {
            type: dataTypes.STRING,
        }
    }

    let config = {
        tableName : "comentarios",
        timestamps:true, 
        underscored: true, 
    
    };

    const Comments = sequelize.define(alias, cols, config);

    Comments.associate = function(models){
        Comments.belongsTo(models.Users, {
            as:'user', //relación dentro del controlador
            foreignKey:'id_delUsuario'
        }),
        Comments.belongsTo(models.Products, {
            as:'products', //relación dentro del controlador
            foreignKey:'id_delProducto'
        },
        )
    }

    return Products;

}