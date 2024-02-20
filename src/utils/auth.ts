import { nextType, reqType, resType } from '../config/types';
import { verifyToken } from './jwt';
import UserError from './userError';

export const checkAuth = async (req: reqType) => {
  let authenticated = false;
  let errorToSend = null;
  const token = (req.get('Authorization') || '').replace('Bearer ', '');
  if (token && token.length) {
    const { err, data: userInfo } = await verifyToken(token);
    if (!err && userInfo) {
      errorToSend = err;
      authenticated = true;
      req.user = userInfo;
    }
  }
  console.log('Logging session ----------->', req.session);
  if (!authenticated) {
    if (req.session && req.session.id) {
      authenticated = true;
      // @ts-ignore
      req.user = req.session;
    }
  }
  return { authenticated, errorToSend };
};

export const authHelper = async (req: reqType) => {
  const { authenticated, errorToSend } = await checkAuth(req);
  if (!authenticated) {
    throw new UserError('Not authorized', 401, 'NOT_AUTHORIZED', errorToSend);
  }
}

export const authAppOrWeb = async (req: reqType, _res: resType, next: nextType) => {
  await authHelper(req);
  next();
}
