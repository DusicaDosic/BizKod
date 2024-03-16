module.exports = (sequelize , DataTypes) => {
    const Stan = sequelize.define('Stan', {
        cena: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        kvadratura: {
          type: DataTypes.STRING,
          allowNull: false
        },
       
        brSoba:{
          type:DataTypes.FLOAT,
          allowNull: false
        },
        opis:{
          type:DataTypes.STRING,
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
            type:DataTypes.BOOLEAN,
            allowNull: false
          },
          pol:{
            type:DataTypes.BOOLEAN,
            allowNull: true
          },
          pusenje:{
            type:DataTypes.BOOLEAN,
            allowNull: true
          },
 
      });
       Stan.associate = (models)=>{
        Stan.hasMany(models.Lobi,{
          onDelete:"cascade",
        });
        Stan.hasMany(models.OmiljeniStan, {
            onDelete: "cascade",
          });
    };
    return Stan;
  };