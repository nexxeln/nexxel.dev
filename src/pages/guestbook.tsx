import Guestbook from "~/components/Guestbook";

const GuestbookPage = () => {
  return (
    <div>
      <h1 className="text-3xl pt-14 text-t-pink">Guestbook</h1>
      <p className="pt-1 text-slate-200">
        Leave a comment below to sign my Guestbook. It could literally be
        anything - a joke, a quote or even a cool fact. Surprise me!
      </p>

      <div className="pt-8" />

      <Guestbook />
    </div>
  );
};

export default GuestbookPage;
