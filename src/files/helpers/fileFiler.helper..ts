export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback,
) => {
  if (!file) return callback(new Error('file es empty'), false);
  console.log(file)
  callback(null, true);

};
