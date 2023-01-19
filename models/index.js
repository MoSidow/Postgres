const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Review = require('./Review');

User.hasMany(Product, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Product.belongsTo(User, {
  foreignKey: 'user_id'
});

Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

Product.hasMany(Review, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
})


module.exports = { User, Product, Category, Review };