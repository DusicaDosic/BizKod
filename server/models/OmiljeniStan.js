module.exports = (sequelize , DataTypes) => {
 
    const OmiljeniStan = sequelize.define('OmiljeniStan', {

      });
      OmiljeniStan.associate = (models) => {
        OmiljeniStan.hasMany(models.Klijent, {
          foreignKey: 'id', // Pretpostavka o imenu foreign key-a
          onDelete: 'CASCADE'
        });

   
   
    };
 
    return OmiljeniStan;
    };