import NextLink from "next/link";
import NextImage, { ImageProps } from "next/image";
import { FC, ReactNode, useRef, useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { BsCheck2 } from "react-icons/bs";

const Link: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternal) {
    return (
      <NextLink href={href}>
        <a>{children}</a>
      </NextLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

const Header1: FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  return (
    <a
      href={`#${id}`}
      className="flex items-center my-12 group w-fit header no-outline"
    >
      <h1 className="text-3xl opacity-0 group-hover:opacity-100">#</h1>
      <h1 id={id} className="ml-2 text-4xl">
        {children}
      </h1>
    </a>
  );
};

const Header3: FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  return (
    <a
      href={`#${id}`}
      className="flex items-center mt-4 mb-5 text-2xl group w-fit header no-outline"
    >
      <h3 className="opacity-0 group-hover:opacity-100">#</h3>
      <h3 id={id} className="ml-2 text-3xl">
        {children}
      </h3>
    </a>
  );
};

const Image: FC<{ alt: string; props: ImageProps }> = ({ alt, props }) => {
  return <NextImage alt={alt} layout="fill" {...props} priority />;
};

const CodeBlock: FC<{
  className: string | undefined;
  children: ReactNode;
}> = ({ className, children }): JSX.Element => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = () => {
    setHovered(true);
  };

  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current?.textContent!);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative"
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute flex justify-center items-center right-3 top-3 w-7 h-7 p-1 rounded border bg-[#282e33] ${
            copied
              ? "focus:border-green-500 border-green-400 text-green-400"
              : "border-gray-400 text-gray-400"
          }`}
          onClick={onCopy}
        >
          {copied ? <BsCheck2 /> : <FiClipboard />}
        </button>
      )}

      <pre>{children}</pre>
    </div>
  );
};

const Components = {
  a: Link,
  h1: Header1,
  h3: Header3,
  pre: CodeBlock,
  Image,
};

export default Components;
