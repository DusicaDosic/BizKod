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
      godineOd: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    godineDo: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    });
     Lobi.associate = (models)=>{
      Lobi.hasMany(models.KorisnikLobi,{
        onDelete:"cascade",
        as: 'korisnici'
      });
  };
     
  return Lobi;
  };
