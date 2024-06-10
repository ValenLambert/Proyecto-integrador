module.exports = function (sequelize, dataTypes){

    let alias = 'Products'; 

    let cols = {
        id_producto: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        foto_producto: {
            type: dataTypes.STRING,
        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName : "productos",
        timestamps:false, 
        underscored: true, 
    
    };

    const Products = sequelize.define(alias, cols, config);

    Products.associate = function(models){
        Products.belongsTo(models.User, {
            as:'user', //relación dentro del controlador
            foreignKey:'id_delUsuario'
        });
        Products.hasMany(models.Comments, {
            as: "comentario",
            foreignKey: "id_delProducto"
        })
    }

    return Products;

}