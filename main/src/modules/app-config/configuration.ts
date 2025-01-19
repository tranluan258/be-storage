const ENV = process.env;
export default (): Record<string, unknown> => ({
  port: parseInt(ENV.PORT!, 10) || 3000,
  database: {
    host: ENV.DB_HOST,
    port: parseInt(ENV.DB_PORT!, 10) || 5432,
    name: ENV.DB_NAME,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
  },
  supabase: {
    region: ENV.SUPABASE_REGION,
    endpoint: ENV.SUPABASE_ENDPOINT,
    credentials: {
      accessKeyId: ENV.SUPABASE_ACCESS_KEY_ID,
      secretAccessKey: ENV.SUPABASE_SECRET_ACCESS_KEY,
    },
    storageBasePath: ENV.SUPABASE_STORAGAGE_BASEPATH,
  },
  jwt: {
    secret: ENV.JWT_SECRET || 'ac',
  },
});
