
module.exports = (sequelize, DataType) => {
  const Users = sequelize.define('User', {

    name: {
      type: DataType.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      },
      set (field) {
        return this.setDataValue('name', field.trim())
      }
    },

    forgot: {
      type: DataType.TEXT
    },

    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }

  })

  return Users
}
