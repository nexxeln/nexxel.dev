import Head from "next/head";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import Navbar from "./Navbar";

const Wrapper: FC<{
  title: string;
  description: string;
  children: ReactNode;
}> = ({ title, description, children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={description} name="description" />
        <meta
          property="og:url"
          content={`https://nexxel.dev${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shoubhit Dash" />
        <meta name="theme-color" content="#fabec0" />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content="/images/banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/images/banner.png" />
      </Head>

      <div className="items-center h-screen mx-4 md:flex md:flex-col md:mx-auto md:w-4/5 lg:w-2/5">
        <div className="pt-10" />
        <div className="px-2 md:px-5">
          <Navbar />
        </div>

        <main id="main" className="">
          {children}
          <div className="pb-8" />
        </main>
      </div>
    </>
  );
};

export default Wrapper;
