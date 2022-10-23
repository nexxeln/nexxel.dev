import { BlurImage } from "~/components/Gallery";
import Wrapper from "~/components/Wrapper";

const images = [
  {
    src: "orange-tree.webp",
    alt: "A tree with a beautfiul blue and orange sunset in the backdrop.",
  },
  {
    src: "river.webp",
    alt: "A river flowing with round stones in the bank and hills with trees in the distance.",
  },
  {
    src: "sunset.webp",
    alt: "A very beautiful and bright pink sunset.",
  },
];

const GuestbookPage = () => {
  return (
    <Wrapper
      title="nexxel • gallery"
      description="Some cool picutres I've taken"
    >
      <h1 className="text-3xl font-bold bold-text pt-14 text-t-purple">
        Gallery
      </h1>
      <p className="pt-1 text-slate-200">
        These are some cool pictures I have taken. Most of them are from cycling
        trips or my balcony.
      </p>

      <div className="pt-8" />

      {images.map((img) => {
        return (
          <div key={img.src.split(".")[0]} className="pb-12">
            <BlurImage src={`/images/gallery/${img.src}`} alt={img.alt} />
          </div>
        );
      })}
    </Wrapper>
  );
};

export default GuestbookPage;
