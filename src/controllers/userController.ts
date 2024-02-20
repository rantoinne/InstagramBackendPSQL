import bcrypt from 'bcrypt';
import { nextType, reqType, resType } from '../config/types';
import { createUserWithAttributes, getUserByAttribute } from '../services/userService';
import asyncWrapper from '../utils/asyncWrapper';
import { EMAIL_REGEX } from '../utils/regex';
import { UserType } from '../models';
import generateToken from '../utils/jwt';

const createUser = async (req: reqType, res: resType, _next: nextType): Promise<void> => {
  const {
    name,
    password,
    email,
    userName,
  } = req.body;
  const isEmailValid = EMAIL_REGEX.test(email);
  if (!isEmailValid) throw new Error(`Invalid format of email: ${email}`);
  
  // Check if user with email already exists.
  const existingUser = await getUserByAttribute('email', email);
  if (existingUser) throw new Error('User already exists with same email');

  // Create a new entry
  const user = await createUserWithAttributes(name, userName, password, email);

  const token = generateToken(user);

  res.status(200).json({ token, ...user });
};

const loginUser = async (req: reqType, res: resType, _next: nextType): Promise<void> => {
  const {
    userName,
    password,
  } = req.body;

  if (!userName || !password) throw new Error('All fields are mandatory!');

  const user: UserType | undefined = await getUserByAttribute('user_name', userName);
  if (!user) throw new Error(`No user exists with user name - ${userName}`);

  const { hashed_password: hashedPassword } = user;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordCorrect) throw new Error('Password incorrect!');

  const token = generateToken(user);

  res.status(200).json({ token, ...user });
};

const userNameAvailable = async (req: reqType, res: resType, _next: nextType): Promise<void> => {
  const {
    userName,
  } = req.body;
  let userNameAvailable = true;
  const userExists = await getUserByAttribute('user_name', userName);

  if (userExists) userNameAvailable = false;

  res.status(200).json({ userNameAvailable });
};

export default {
  createUser: asyncWrapper(createUser),
  loginUser: asyncWrapper(loginUser),
  userNameAvailable: asyncWrapper(userNameAvailable),
}
