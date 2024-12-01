/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  supabase: {
    region: process.env.SUPABASE_REGION,
    endpoint: process.env.SUPABASE_ENDPOINT,
    credentials: {
      accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID,
      secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY,
    },
    storageBasePath: process.env.SUPABASE_STORAGAGE_BASEPATH,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'ac',
  },
});
