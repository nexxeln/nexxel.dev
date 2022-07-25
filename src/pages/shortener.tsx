import { useEffect } from "react";
import Shortener from "~/components/Shortener";

const ShortenerPage = () => {
  return (
    <div className="items-start">
      <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">
        Shortener
      </h1>
      <p className="pt-1 text-slate-200">
        You can now use my domain to shorten your links!
      </p>

      <div className="pt-8" />

      <Shortener origin={"new.nexxel.dev"} />
    </div>
  );
};

export default ShortenerPage;
