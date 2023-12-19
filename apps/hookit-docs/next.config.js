/** @type {import('next').NextConfig} */
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

if (process.env.NODE_ENV === 'development') {
  console.log('🛜  LAN Url:', `http://${require('address').ip()}:3000`);
}

module.exports = withNextra();
