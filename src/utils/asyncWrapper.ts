import { reqType, resType, nextType } from '../config/types';

export default function asyncUtil(fn: (reqType: reqType, resType: resType, next: nextType) => any) {
  return function asyncUtilWrap(req: reqType, res: resType, next: nextType) {
    return Promise.resolve(fn(req, res, next)).catch((e): any => {
      console.log('Error caught at asyncWrapper', req.url, e);
      res.status(404).json({ error: e?.message });
    });
  };
}
