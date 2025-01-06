import { env } from './.env';

export const environment = {
  apiBaseUrl:"http://localhost:3000",
  production: false,
  version: env['npm_package_version'] + '-dev',
};
