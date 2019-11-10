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
    },
    lookup: {
      type: DataTypes.STRING,
      field: 'lookup'
    },
    emailAlt: {
      type: DataTypes.STRING,
      field: 'email_alt'
    },
    nameAlt: {
      type: DataTypes.STRING,
      field: 'name_alt'
    },
    tagline: {
      type: DataTypes.STRING,
      field: 'member_title'
    },
    bio: {
      type: DataTypes.STRING,
      field: 'bio'
    },
    photo: {
      type: DataTypes.STRING,
      field: 'photo'
    },
    signature: {
      type: DataTypes.STRING,
      field: 'signature'
    },
    dobD: {
      type: DataTypes.INTEGER,
      field: 'bday_day'
    },
    dobM: {
      type: DataTypes.INTEGER,
      field: 'bday_month'
    },
    dobY: {
      type: DataTypes.INTEGER,
      field: 'bday_year'
    }
  },
  { sequelize: db, modelName: 'user', tableName: 'users', timestamps: false }
)

module.exports = User
