import { FC, ReactNode } from "react";
import Wrapper from "~/components/Wrapper";

const Qna: FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xl font-bold text-t-pink bold-text">{question}</p>
      <p>{answer}</p>
    </div>
  );
};

const CustomQna = ({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xl font-bold text-t-pink bold-text">{question}</p>
      {children}
    </div>
  );
};

const Link: FC<{ to: string; text: string }> = ({ to, text }) => {
  return (
    <a
      href={to}
      target="_blank"
      rel="noreferrer"
      className="transition-opacity duration-300 text-t-purple opacity-90 hover:opacity-100"
    >
      {text}
    </a>
  );
};

const FAQPage = () => {
  return (
    <Wrapper
      title="nexxel • faq"
      description="Questions frequently asked to me"
    >
      <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">FAQ</h1>
      <p className="pt-1 text-slate-200">
        These are some questions that are asked to me pretty frequently, so I
        compiled them all into one page!
      </p>

      <div className="pt-10" />

      <div className="flex flex-col gap-6">
        <Qna question="Are you actually 17?!" answer="Yes." />

        <CustomQna question="Why is your name nexxel?">
          <p>
            Checkout <Link to="https://why.nexxel.dev" text="why.nexxel.dev" />
          </p>
        </CustomQna>

        <Qna
          question="When did you start coding?"
          answer="Technically in 6th grade but seriously in December 2021."
        />

        <Qna question="How did you learn to code?" answer="Building stuff." />

        <CustomQna question="What programming languages do you know?">
          <p>
            I&apos;m most comfortable with{" "}
            <Link to="https://typescriptlang.org" text="TypeScript" /> and{" "}
            <Link to="https://python.org/" text="Python" />. I also write some{" "}
            <Link to="https://rust-lang.org/" text="Rust" /> and{" "}
            <Link to="https://go.dev/" text="Go" />.
          </p>
        </CustomQna>

        <CustomQna question="What are you working on nowadays?">
          <p>
            Nothing big at the moment. Mostly studying and maintaining{" "}
            <Link
              to="https://github.com/t3-oss/create-t3-app"
              text="create-t3-app"
            />
            .
          </p>
        </CustomQna>

        <CustomQna question="What is your favourite web framework?">
          <p>
            <Link to="https://remix.run" text="Remix" /> has got to be my
            favourite framework, It isn&apos;t perfect, nor the best tool to use
            for most cases, but I still enjoy writing code with Remix. I use the{" "}
            <Link to="https://init.tips" text="T3 Stack" /> for most things.
          </p>
        </CustomQna>

        <CustomQna question="Did you build create-t3-app?">
          <p>
            I started it, the community built it. If you don&apos;t know,{" "}
            <Link to="https://create.t3.gg" text="create-t3-app" /> is the
            quickest way to start a web app with the{" "}
            <Link to="https://init.tips" text="T3 Stack" />.
          </p>
        </CustomQna>

        <CustomQna question="What code editor do you use?">
          <p>
            I use <Link to="https://neovim.io/" text="NeoVim" /> and the occasional <Link to="https://code.visualstudio.com/" text="VSCode" />.
          </p>
        </CustomQna>


        <CustomQna question="What terminal emulator do you use?">
          <p>
            I use <Link to="https://alacritty.org/" text="Alacritty" />. It&apos;s great.
          </p>
        </CustomQna>

        <CustomQna question="What theme do you use?">
          <p>
            I use <Link to="https://github.com/shaunsingh/oxocarbon.nvim" text="oxocarbon.nvim" /> for NeoVim, <Link to="https://marketplace.visualstudio.com/items?itemName=pmndrs.pmndrs" text="poimandres" /> for VSCode, and a custom theme based on <Link to="https://www.nordtheme.com/" text="Nord" /> and <Link to="https://marketplace.visualstudio.com/items?itemName=antfu.theme-vitesse" text="Vitesse" /> created by <Link to="https://github.com/asrvd" text="asrvd" /> for my terminal.
          </p>
        </CustomQna>

        <CustomQna question="What font do you use for coding?">
          <p>
            I am a big fan of{" "}
            <Link to="https://jetbrains.com/lp/mono" text="JetBrains Mono" />{" "}
            but currently I use{" "}
            <Link
              to="https://github.com/source-foundry/Hack"
              text="Hack"
            />
            .
          </p>
        </CustomQna>
      </div>
    </Wrapper>
  );
};

export default FAQPage;
