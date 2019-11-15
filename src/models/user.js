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
    nameAlt: {
      type: DataTypes.STRING,
      field: 'name_alt'
    },
    nameAlt2: {
      type: DataTypes.STRING,
      field: 'name_alt_2'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email'
    },
    emailAlt: {
      type: DataTypes.STRING,
      field: 'email_alt'
    },
    emailAlt2: {
      type: DataTypes.STRING,
      field: 'email_alt_2'
    },
    ip: {
      type: DataTypes.STRING,
      field: 'ip_address'
    },
    geo: {
      type: DataTypes.STRING,
      field: 'geo'
    },
    ips: {
      type: DataTypes.STRING,
      field: 'ips'
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
    tagline: {
      type: DataTypes.STRING,
      field: 'member_title'
    },
    bio: {
      type: DataTypes.STRING,
      field: 'bio'
    },
    bioAlt: {
      type: DataTypes.STRING,
      field: 'bio_alt'
    },
    interests: {
      type: DataTypes.STRING,
      field: 'interests'
    },
    ideology: {
      type: DataTypes.STRING,
      field: 'ideology'
    },
    photo: {
      type: DataTypes.STRING,
      field: 'photo'
    },
    photoAlt: {
      type: DataTypes.STRING,
      field: 'photo_alt'
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
    },
    location: {
      type: DataTypes.STRING,
      field: 'location'
    },
    gender: {
      type: DataTypes.STRING,
      field: 'gender'
    },
    url: {
      type: DataTypes.STRING,
      field: 'url'
    },
    socialAim: {
      type: DataTypes.STRING,
      field: 'social_aim'
    },
    socialMsn: {
      type: DataTypes.STRING,
      field: 'social_msn'
    },
    socialIcq: {
      type: DataTypes.STRING,
      field: 'social_icq'
    },
    socialSkype: {
      type: DataTypes.STRING,
      field: 'social_skype'
    },
    socialYahoo: {
      type: DataTypes.STRING,
      field: 'social_yahoo'
    },
    socialJabber: {
      type: DataTypes.STRING,
      field: 'social_jabber'
    },
    socialTwitter: {
      type: DataTypes.STRING,
      field: 'social_twitter'
    }
  },
  { sequelize: db, modelName: 'user', tableName: 'users', timestamps: false }
)

module.exports = User
