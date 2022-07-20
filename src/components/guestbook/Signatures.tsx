import { FC } from "react";

const Signatures = () => {
  return (
    <div className="flex flex-col gap-6">
      <Signature name="nexxel" message="lnice website very cool good job" />
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
