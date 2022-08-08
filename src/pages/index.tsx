import type { NextPage } from "next";
import Image from "next/future/image";
import Home from "~/components/Home";
import Wrapper from "~/components/Wrapper";

const HomePage: NextPage = () => {
  return (
    <Wrapper title="nexxel • home" description="17 yo self-taught developer">
      <Home />
    </Wrapper>
  );
};

export default HomePage;
