import { FC, ReactNode } from "react";

import Navbar from "./Navbar";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center h-screen mx-6 md:mx-auto md:w-4/5 lg:w-2/5">
      <div className="pt-10" />
      <div className="px-5">
        <Navbar />
      </div>

      <main id="main" className="">
        {children}
        <div className="pb-8" />
      </main>
    </div>
  );
};

export default Wrapper;
