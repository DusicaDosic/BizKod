module.exports = (sequelize , DataTypes) => {
 
    const Mesto = sequelize.define('Mesto', {

        nazivMesta: {
            type: DataTypes.STRING,
            allowNull: false
          },
      });
      Mesto.associate = (models)=>{
        Mesto.hasMany(models.Stan,{
          onDelete:"cascade",
        });
    };
 
    return Mesto;
    };