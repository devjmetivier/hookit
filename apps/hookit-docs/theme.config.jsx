import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

export default {
  darkMode: true,
  docsRepositoryBase: 'https://github.com/devjmetivier/hookit/tree/master/apps/hookit-docs', // base URL for the docs repository
  footer: { text: `MIT ${new Date().getFullYear()} © Devin Metivier.` },
  head: () => {
    const { frontMatter } = useConfig();

    return (
      <>
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <meta content={frontMatter.description || 'hookit'} name='og:description' />
        <meta content={frontMatter.title || 'hookit'} name='og:title' />
      </>
    );
  },
  logo: <span>hookit</span>,
  navigation: { prev: true, next: true },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s - hookit',
      };
    }
  },
};
