import { ButtonProps } from "../../types/types";

export const Button = (props: ButtonProps) => {
  const {
    name = "LIQN",
    onClick = () => {},
    className = `rounded-lg border border-solid ml-2 px-2 py-1 text-base 
    font-medium font-sans bg-white border-gray-400 cursor-pointer
   hover:text-blue-500 hover:border-blue-500`,
  } = props;

  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
};
