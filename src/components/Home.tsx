import Image from "next/future/image";

const Hero = () => {
  return (
    <div className="flex flex-col items-center h-screen pt-32">
      <Image
        src="/images/nexxel.webp"
        alt="nexxel's avatar"
        width={165}
        height={165}
        priority
        className="rounded-full"
      />

      <h1 className="pt-2 text-5xl font-bold text-center text-transparent bold-text bg-clip-text bg-gradient-to-r from-t-pink via-t-purple to-t-orange animate-gradient-text">
        nexxel
      </h1>

      <p className="pt-1 text-xl text-center">
        Hi, I&apos;m Shoubhit. I&apos;m a 17 y/o self-taught developer and I
        like to build cool stuff
      </p>
    </div>
  );
};

const Home = () => {
  return <Hero />;
};

export default Home;
