import { FC } from 'react';
import Head from 'next/head';

interface DocumentProps {
  __NEXT_DATA__: any;
  dangerousAsPath: string;
  docComponentsRendered: {
    Html: boolean;
    Main: boolean;
    Head: boolean;
    NextScript: boolean;
  };
  buildManifest: any;
}

const Document: FC<DocumentProps> = () => {
  return (
    <html lang="pt-BR">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="MOOD.PA - Analisador Técnico de Projetos Arquitetônicos" />
        <meta name="author" content="Caique Tavares Silva" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <title>MOOD.PA - Analisador Técnico de Projetos</title>
      </Head>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </html>
  );
};

export default Document;

// Componentes necessários para o Next.js
const Main = () => <main id="__next" />;
const NextScript = () => null;
