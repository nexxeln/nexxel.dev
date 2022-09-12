import Wrapper from "~/components/Wrapper";

const GuestbookPage = () => {
  return (
    <Wrapper
      title="nexxel • guestbook"
      description="Sign my guestbook and cement your name on my website"
    >
      <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">
        Gallery
      </h1>
      <p className="pt-1 text-slate-200">
        These are some cool pictures I have taken. Most of them are from cycling
        trips or my balcony.
      </p>
    </Wrapper>
  );
};

export default GuestbookPage;
