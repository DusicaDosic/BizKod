module.exports = (sequelize , DataTypes) => {
  const Klijent = sequelize.define('Klijent', {
      lozinkaKlij: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imeKlij: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prezimeKlij: {
        type: DataTypes.STRING,
        allowNull: false

      },
      imejlKlij: {
        type: DataTypes.STRING,
        allowNull: false
      },
      jmbgKlijenta:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      polKlijenta:{
        type:DataTypes.INTEGER(1),
        allowNull: false
      },
      datRodjenja:{
        type:DataTypes.DATEONLY,
        allowNull: false
      },
      slikaURL: { // Dodavanje kolone za URL slike
        type: DataTypes.STRING,
        allowNull: false // Ako slika nije obavezna

      },
    });

  return Klijent;
}