'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@demo.com',
        username: 'demo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'hellokittyrocks@gmail.com',
        username: 'hellokitty',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'sheeeesh1@gmail.com',
        username: 'xXedgyprincessXx',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'msluvr@gmail.com',
        username: 'milkyomo',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: '0range@gmail.com',
        username: 'tsangerine',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'yeisimp@gmail.com',
        username: 'itsLV',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        email: 'iluvjongy@gmail.com',
        username: 'adrianuwu',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'studying@gmail.com',
        username: 'alysuh',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        email: 'jkhehe@gmail.com',
        username: 'jungkookstan',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        email: 'pom4life@gmail.com',
        username: 'jongy',
        hashedPassword: bcrypt.hashSync('password10')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
