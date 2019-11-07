const { db, Model, DataTypes } = require('../db')

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'member_id',
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email'
    },
    ip: {
      type: DataTypes.STRING,
      field: 'ip_address'
    },
    joined: {
      type: DataTypes.INTEGER,
      field: 'joined'
    },
    lastLogin: {
      type: DataTypes.INTEGER,
      field: 'last_visit',
      convDate: true
    },
    password: {
      type: DataTypes.STRING,
      field: 'members_pass_hash'
    },
    salt: {
      type: DataTypes.STRING,
      field: 'members_pass_salt'
    },
    timezone: {
      type: DataTypes.STRING,
      field: 'timezone'
    }
  },
  { sequelize: db, modelName: 'users', timestamps: false }
)

module.exports = User
