"use strict";
import { Model,UUID,UUIDV4 } from "sequelize";

interface UserAttributes{
  id:string,
  firstName:string,
  lastName:string,
  email:string,
  password:string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!:string
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  User.init(
    {
      id:{
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true
      },
      firstName: {type:DataTypes.STRING},
      lastName: {type:DataTypes.STRING},
      email: {type:DataTypes.STRING},
      password:{type:DataTypes.STRING}
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
