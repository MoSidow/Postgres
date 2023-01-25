const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}


Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newProductData) => {
        if (newProductData.image) {
          return newProductData.image
        } else {
      switch(newProductData.category) {
        case "ring":
          newProductData.image = "https://via.placeholder.com/150/000000/FFFFFF/?text=RING"
          break;
        case "necklace":
          newProductData.image = "https://via.placeholder.com/150/000000/FFFFFF/?text=NECKLACE"
          break;
        case "bracelet":
          newProductData.image = "https://via.placeholder.com/150/000000/FFFFFF/?text=BRACELET"
          break;
        case "earring":
          newProductData.image = "https://via.placeholder.com/150/000000/FFFFFF/?text=EARRING"
          break;
        default:
          console.log ("no placeholder")
        }
      }},
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Product',
  }
);

module.exports = Product;
