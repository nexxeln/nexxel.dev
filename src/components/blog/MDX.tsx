import NextLink from 'next/link';
import NextImage, { ImageProps } from 'next/image';
import { FC, ReactNode, useRef, useState } from 'react';
import { FiClipboard } from 'react-icons/fi';
import { BsCheck2 } from 'react-icons/bs';

const Link: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
  ...props
}) => {
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternal) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
};

const Header1: FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  return (
    <h1 id={id} className="ml-2 text-4xl">
      <span className="text-3xl opacity-0 group-hover:opacity-100">#</span>
      {children}
    </h1>
  );
};

const Header3: FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  return (
    <h3>
      <a
        href={`#${id}`}
        className="flex items-center mt-4 mb-5 text-2xl group w-fit header no-outline"
      >
        <span id={id} className="ml-2 text-3xl">
          {children}
        </span>
      </a>
    </h3>
  );
};

const Image: FC<{ alt: string; props: ImageProps }> = ({ alt, props }) => {
  return <NextImage alt={alt} layout="fill" {...props} priority />;
};

const CodeBlock: FC<{
  className: string | undefined;
  children: ReactNode;
}> = ({ children }): JSX.Element => {
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
              ? 'focus:border-green-500 border-green-400 text-green-400'
              : 'border-gray-400 text-gray-400'
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
  pre: CodeBlock,
  Image,
};

export default Components;
