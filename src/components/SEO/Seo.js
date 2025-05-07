import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO = ({ title, description, canonicalUrl }) => {
  const router = useRouter();
  const baseUrl = 'https://www.qcsstudio.com';

  // Dynamically generate canonical URL
  const canonical = canonicalUrl || `${baseUrl}${router.asPath.split('?')[0]}`;

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
    </Head>
  );
};

export default SEO;
