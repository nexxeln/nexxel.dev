import { FC, ReactNode } from "react";

import Navbar from "./Navbar";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-4/5 h-screen mx-auto md:w-2/5">
      <div className="pt-10" />
      <div className="px-5">
        <Navbar />
      </div>

      <main id="main" className="">
        {children}
      </main>
    </div>
  );
};

export default Wrapper;
