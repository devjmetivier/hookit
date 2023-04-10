/* eslint-disable react/react-in-jsx-scope */

export default {
  projectLink: 'https://github.com/devjmetivier/hookit', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/devjmetivier/hookit/blob/master', // base URL for the docs repository
  titleSuffix: ' - hookit',
  nextLinks: false,
  prevLinks: false,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Devin Metivier.`,
  logo: (
    <>
      {/* <svg>...</svg> */}
      <span>hookit</span>
    </>
  ),
  head: (
    <>
      <meta content='width=device-width, initial-scale=1.0' name='viewport' />
      <meta content='hookit: react hooks' name='description' />
      <meta content='hookit: react hooks' name='og:title' />
    </>
  ),
};
