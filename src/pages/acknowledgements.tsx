import Wrapper from "~/components/Wrapper";

const linkStyles =
  "font-medium medium-text text-t-pink hover:opacity-90 transition-opacity duration-300";

const AcknowledgementsPage = () => {
  return (
    <Wrapper
      title="nexxel • acknowledgements"
      description="People who have helped and inspired me in my journey"
    >
      <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">
        Acknowledgements
      </h1>
      <p className="pt-1 text-slate-200">
        This is a list of people who have helped and inspired me throughtout my
        journey and I owe a lot to them.
      </p>

      <div className="pt-6" />
      <ul className="px-4 text-xl list-disc marker:text-slate-300">
        <li className={linkStyles}>My Mom</li>

        <li>
          <a
            href="https://twitter.com/t3dotgg"
            target="_blank"
            rel="noreferrer"
            className={linkStyles}
          >
            Theo Browne
          </a>
        </li>

        <li>
          <a
            href="https://twitter.com/DhravyaShah"
            target="_blank"
            rel="noreferrer"
            className={linkStyles}
          >
            Dhravya Shah
          </a>
        </li>

        <li>
          <a
            href="https://twitter.com/jullerino"
            target="_blank"
            rel="noreferrer"
            className={linkStyles}
          >
            Julius Marminge
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default AcknowledgementsPage;
