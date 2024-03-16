module.exports = (sequelize , DataTypes) => {
const Lobi = sequelize.define('Lobi', {
    pol: {
        type: DataTypes.INTEGER(1),
        allowNull: false
              },

        pusenje: {
        type: DataTypes.INTEGER,
         allowNull: false
                      },
        kucniLjubimac: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  });
   Lobi.associate = (models)=>{
    Lobi.hasMany(models.KorisnikLobi,{
      onDelete:"cascade",
    }); 
};
   
return Lobi;
};