module.exports = {
  apps: [
    {
      name: 'your-app-name-here',
      script: './bin/www',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3001,
      },
    },
  ],
};
