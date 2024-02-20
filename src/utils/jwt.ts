import jwt from 'jsonwebtoken';
import { UserType } from '../models';

const { JWT_SECRET = 'secret' } = process.env;

// TODO update error and data type
export function verifyToken(token: string): Promise<{ err: any; data: any }> {
  return new Promise(resolve => {
    jwt.verify(token, JWT_SECRET, (err, data: any) => {
      resolve({ err, data });
    });
  });
}

export default function generateToken(
  user: UserType,
  type: jwt.Secret = JWT_SECRET,
  options: jwt.SignOptions | undefined = undefined,
) {
  const token = jwt.sign({ id: user.id, userName: user.user_name }, type, options);
  console.log({ token });
  return token;
};
