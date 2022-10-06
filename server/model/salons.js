import { DataTypes } from 'sequelize'

const Salons = sequelize => {
  const Schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
  return sequelize.define('salons', Schema)
}

export default Salons
