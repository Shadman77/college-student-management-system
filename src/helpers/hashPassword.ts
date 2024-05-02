import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export default (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};
