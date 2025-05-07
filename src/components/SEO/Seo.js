'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

export default function SEO() {
  const pathname = usePathname();
  const canonical = `https://www.qcsstudio.com${pathname}`;

  return (
    <Head>
      <link rel="canonical" href={canonical} />

    </Head>
  );
}
