module.exports = function (sequelize, dataTypes){

    let alias = 'Products'; 

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        created_at : {
            type: dataTypes.DATE,
            allowNull:true,
        },
        foto_producto: {
            type: dataTypes.STRING,
        },
        nombre: {
            type: dataTypes.STRING
        },
        descipcion: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName : "productos",
        timestamps:true, 
        underscored: true, 
    
    };

    const Products = sequelize.define(alias, cols, config);

    Products.associate = function(models){
        Products.belongsTo(models.Users, {
            as:'User', //relación dentro del controlador
            foreignKey:'id_delUsuario'
        })
    }

    return Products;

}