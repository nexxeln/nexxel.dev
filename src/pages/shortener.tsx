import { useEffect } from "react";
import Shortener from "~/components/Shortener";
import Wrapper from "~/components/Wrapper";

const ShortenerPage = () => {
  return (
    <Wrapper
      title="nexxel • shortener"
      description="Use my domain to shorten your links"
    >
      <div className="items-start">
        <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">
          Shortener
        </h1>
        <p className="pt-1 text-slate-200">
          You can now use my domain to shorten your links! Choose your slug or
          get a random one if you&apos;re feeling adventurous!
        </p>

        <div className="pt-8" />

        <Shortener origin={"nexxel.dev"} />
      </div>
    </Wrapper>
  );
};

export default ShortenerPage;
