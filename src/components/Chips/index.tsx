import React from "react";

export interface ChipProps {
  text: string;
  status: "warning" | "success" | "danger" | "";
}

const Chip = ({ text, status }: ChipProps) => {
  const getStyle = () => {
    switch (status) {
      case "warning":
        return { border: "#ffd800", background: "#fff9d9" };
      case "success":
        return { border: "#60d300", background: "#d4ffb0" };
      case "danger":
        return { border: "#ff3f25", background: "#ffb6ab" };
      default:
        return { border: "#bf00d3", background: "#f9bfff" };
    }
  };

  return (
    <div
      className={`px-4 py-1 text-[13px] rounded-[50px] border-solid border-[1px] !border-[${
        getStyle()?.border
      }] !bg-[${getStyle()?.background}]`}
      style={{
        borderColor: getStyle()?.border,
        backgroundColor: getStyle()?.background,
      }}
    >
      {text}
    </div>
  );
};

export default Chip;
