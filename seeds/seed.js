const sequelize = require('../config/connection');
const { User, Product, Review } = require('../models');

const userData = require('./userData.json');
const productData = require('./productData.json');
const reviewData = require('./reviews.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const product of productData) {
    await Product.create({
      ...product,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
