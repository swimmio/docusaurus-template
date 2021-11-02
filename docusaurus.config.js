/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Swimm Documentation',
  tagline: 'Built With Docusaurus',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Cyberdyne', // Usually your GitHub org/user name.
  projectName: 'skynet', // Usually your repo name.
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Swimm',
        src: 'https://firebasestorage.googleapis.com/v0/b/swimmio/o/Docusaurus%2Flogo.png?alt=media&token=ec1e095a-5db5-4546-ae19-a2296fe2fb6e',
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexPages: true,
      },
    ],
  ],
};
