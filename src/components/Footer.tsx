import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <p className="py-24">
        This website is open source on{" "}
        <a
          href="https://github.com/nexxeln/nexxel.dev"
          target="_blank"
          rel="noreferrer"
          className="transition-opacity duration-300 opacity-75 text-t-purple hover:opacity-100"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
