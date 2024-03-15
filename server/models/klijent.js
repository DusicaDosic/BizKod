module.exports = (sequelize , DataTypes) => {
    const Klijent = sequelize.define('Klijent', {
        korisnickoImeKlij: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        lozinkaKlij: {
          type: DataTypes.STRING,
          allowNull: false
        },
        imeKlij: {
          type: DataTypes.STRING
        },
        prezimeKlij: {
          type: DataTypes.STRING
        },
        imejlKlij: {
          type: DataTypes.STRING
        }
      });

    return Klijent;
}