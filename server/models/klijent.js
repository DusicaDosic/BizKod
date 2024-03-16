module.exports = (sequelize , DataTypes) => {
  const Klijent = sequelize.define('Klijent', {
      lozinkaKlij: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prezimeKlij: {
        type: DataTypes.STRING,
        allowNull: false

      },
      imejlKlij: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      polKlijenta:{
        type:DataTypes.INTEGER(1),
        allowNull: false
      },
      datRodjenja:{
        type:DataTypes.DATEONLY,
        allowNull: false
      },
      download_url: { // Dodavanje kolone za URL slike
        type: DataTypes.STRING,
        allowNull: true // Ako slika nije obavezna
      },
      drusMreza_url: { // Dodavanje kolone za URL slike
        type: DataTypes.STRING,
        allowNull: true // Ako slika nije obavezna
      },
    });

    Klijent.associate = (models) => {
      Klijent.hasMany(models.Stan, {
        onDelete: "cascade"
      });
      Klijent.hasMany(models.OmiljeniStan, {
        onDelete: "cascade"
      });
      Klijent.hasMany(models.KorisnikLobi, {
        onDelete: "cascade"
      });

}; 
  return Klijent;
};