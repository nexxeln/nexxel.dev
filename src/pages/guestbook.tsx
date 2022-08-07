import Guestbook from "~/components/Guestbook";
import Wrapper from "~/components/Wrapper";

const GuestbookPage = () => {
  return (
    <Wrapper
      title="nexxel • guestbook"
      description="Sign my guestbook and cement your name on my website"
    >
      <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">
        Guestbook
      </h1>
      <p className="pt-1 text-slate-200">
        Leave a comment below to sign my Guestbook. It could literally be
        anything - a joke, a quote or even a cool fact. Surprise me!
      </p>

      <div className="pt-8" />

      <Guestbook />
    </Wrapper>
  );
};

export default GuestbookPage;
