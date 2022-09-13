import NextImage from "next/future/image";
import NextLink from "next/link";
import { useRef, useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { BsCheck2 } from "react-icons/bs";
import clsx from "clsx";

const Link: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
  ...props
}) => {
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternal) {
    return (
      <NextLink href={href} {...props}>
        <a>{children}</a>
      </NextLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
};

const CodeBlock: React.FC<{
  className: string | undefined;
  children: React.ReactNode;
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
          className={clsx(
            "absolute flex justify-center items-center right-3 top-3 w-7 h-7 p-1 rounded border bg-[#282e33]",
            copied
              ? "focus:border-t-orange border-t-orange text-t-orange"
              : "border-gray-400 text-gray-400"
          )}
          onClick={onCopy}
        >
          {copied ? <BsCheck2 /> : <FiClipboard />}
        </button>
      )}
      <pre
        style={{ fontFamily: "JetBrains Mono" }}
        className="overflow-auto rounded-b-md"
      >
        <code>{children}</code>
      </pre>
    </div>
  );
};

const Image: React.FC<{ src: string; alt: string }> = (props) => {

  return (
    <NextImage {...props} width={600} height={400} className="rounded-md" />
  )
}

const Components = {
  a: Link,
  pre: CodeBlock,
  img: Image,
};

export default Components;
