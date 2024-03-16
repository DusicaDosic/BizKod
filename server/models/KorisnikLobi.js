module.exports = (sequelize , DataTypes) => {
 
    const KorisnikLobi = sequelize.define('KorisnikLobi', {
        cena: {
            type: DataTypes.STRING,
            allowNull: false
          }// definicija atributa modela
      });
 
 
 
    return KorisnikLobi;
  };