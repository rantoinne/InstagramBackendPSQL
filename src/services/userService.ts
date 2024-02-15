import { ColumnRef, Expression, PrimitiveValue } from "objection";
import { User, UserType } from "../models";

export const getUserByAttribute = async (
  attributeName: ColumnRef,
  attributeValue: Expression<PrimitiveValue>,
): Promise<UserType | undefined> => {
  const user = await User.query()
    .select('*')
    .where(attributeName, '=', attributeValue)
    .first()
  return user;
};

export const createUserWithAttributes = async (
  name: string,
  user_name: string,
  hashed_password: string,
  email: string,
): Promise<UserType> => {
  const user = await User.query().insert({
    name,
    user_name,
    hashed_password,
    email,
  })
    .returning(['id', 'name', 'user_name', 'email'])

  console.log('In service', user);
  return user;
};
