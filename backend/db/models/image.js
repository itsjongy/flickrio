'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Image.associate = function (models) {
    Image.belongsTo(models.User, { foreignKey: 'userId' })
    Image.hasMany(models.Comment, {
      foreignKey: 'imageId',
      onDelete: "cascade",
      hooks: true,
    })
  };
  return Image;
};
