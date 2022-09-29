import Link from "next/link";
import Wrapper from "~/components/Wrapper";

const ShortenerPage = () => {
  return (
    <Wrapper title="nexxel • 404" description="Looks like you're lost">
      <div className="justify-center pt-28">
        <h2 className="text-4xl text-t-purple">404</h2>
        <p>
          Looks like you&apos;re lost. In the meantime read my{" "}
          <Link href="/blog">
            <a className="text-t-purple opacity-75 transition-opacity duration-300 hover:opacity-100">
              blog
            </a>
          </Link>{" "}
          maybe?
        </p>
      </div>
    </Wrapper>
  );
};

export default ShortenerPage;
