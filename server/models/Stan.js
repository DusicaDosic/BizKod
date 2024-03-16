module.exports = (sequelize , DataTypes) => {
    const Stan = sequelize.define('Stan', {
        cena: {
          type: DataTypes.STRING,
          allowNull: false
        },
        kvadratura: {
          type: DataTypes.STRING,
          allowNull: false
        },
       
        brSoba:{
          type:DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        opis:{
          type:DataTypes.INTEGER(1),
          allowNull: false
        },
       
        download_url: { // Dodavanje kolone za URL slike
          type: DataTypes.STRING,
          allowNull: false // Ako slika nije obavezna
 
        },
        maxBr: { // Dodavanje kolone za URL slike
            type: DataTypes.INTEGER,
            allowNull: false // Ako slika nije obavezna
   
          },
            cimer:{
            type:DataTypes.STRING,
            allowNull: false
          },
          pol:{
            type:DataTypes.INTEGER,
            allowNull: true
          },
          pusenje:{
            type:DataTypes.INTEGER,
            allowNull: true
          },
 
      });
       Stan.associate = (models)=>{
        Stan.hasMany(models.Lobi,{
          onDelete:"cascade",
        });
        Stan.hasMany(models.OmiljeniStan, {
            onDelete: "cascade"
          });
    };
    return Stan;
  };