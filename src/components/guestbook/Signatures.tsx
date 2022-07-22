import { FC } from "react";

const Signatures = ({ isLoading, data }) => {
  if (isLoading) {
    return <div>Fetching all the messages...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {data?.map((sig, index) => (
        <Signature key={index} name={sig.name} message={sig.message} />
      ))}
    </div>
  );
};

const Signature: FC<{ name: string; message: string }> = ({
  name,
  message,
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl">{message}</h3>
      <p className="text-t-pink">- {name}</p>
    </div>
  );
};

export default Signatures;
