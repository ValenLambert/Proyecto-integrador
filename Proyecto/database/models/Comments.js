module.exports = function (sequelize, dataTypes){
    let alias = "Comments"; // nombrre de como llame a la tabla
    let cols = {
        id_comentario: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        comentario: {
            type: dataTypes.STRING,
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
    }

    let config = {
        tableName : "comentarios",
        timestamps:true, 
        underscored: true, 
    
    };

    const Comments = sequelize.define(alias, cols, config);

    Comments.associate = function(models){
        Comments.belongsTo(models.User, { // es como lo llamo en el controlador 
            as:'user', //relación dentro del controlador
            foreignKey:'id_delUsuario'
        }),
        Comments.belongsTo(models.Products, {
            as:'products', //relación dentro del controlador
            foreignKey:'id_delProducto'
        },
        )
    }

    return Comments;

}