import Head from 'next/head';
import Homepage from '@/containers/MainContainer/Homepage';

const Page = () => {
  return (
    <>
      <Head>
        <title>AI-Powered IT & SaaS Development Services in Mohali | QuantumCrafters</title>
        <meta
          name="description"
          content="Discover reliable IT solutions and custom SaaS development at QuantumCrafters—Mohali's go-to tech partner for cutting-edge digital innovation and scalable growth."
        />
        <link rel="canonical" href="https://www.qcsstudio.com/" />
      </Head>
      <main>
        <Homepage />
      </main>
    </>
  );
};

export default Page;
