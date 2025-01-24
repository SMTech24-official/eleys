import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  aws: {
    do_space_endpoint: process.env.DO_SPACE_ENDPOINT,
    do_space_secret_key: process.env.DO_SPACE_SECRET_KEY,
    do_space_access_key: process.env.DO_SPACE_ACCESS_KEY,
    do_space_bucket: process.env.DO_SPACE_BUCKET,
  },
};
