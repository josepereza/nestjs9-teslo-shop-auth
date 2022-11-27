import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback,
) => {
  if (!file) return callback(new Error('file es empty'), false);
  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExtension}`;
  console.log(fileName);
  callback(null, fileName);
};
