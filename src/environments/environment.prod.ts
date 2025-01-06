import { env } from './.env';

export const environment = {
  apiBaseUrl:"http://localhost:3000",
  production: true,
  version: env['npm_package_version'] + '-dev',
};
