import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { ReactComponent as Category } from "../../assets/category.svg";
import { ReactComponent as Ingredient } from "../../assets/ingredients.svg";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as CategoryItems } from "../../assets/categoryItems.svg";

const CustomNode = ({ data }: any) => {
  const getLogo = () => {
    switch (data?.type) {
      case "category":
        return {
          bg: "#ff5b5b",
          icon: (
            <Category fill="#fff" className="h-[20px] w-[20px] text-[#fff]" />
          ),
        };
      case "categoryItems":
        return {
          bg: "#5bbcff",
          icon: (
            <CategoryItems
              fill="#fff"
              className="h-[20px] w-[20px] text-[#fff]"
            />
          ),
        };
      case "ingredient":
      case "tag":
        return {
          bg: "#b45bff",
          icon: (
            <Ingredient fill="#fff" className="h-[20px] w-[20px] text-[#fff]" />
          ),
        };
      case "intermediate":
        return {
          bg: "#fff",
          icon: (
            <Arrow fill="#" className="h-[20px] w-[20px] !text-[#89ff46]" />
          ),
        };
    }
  };

  return (
    <div
      className={`px-3 py-2 min-w-[200px] max-w-[300px] shadow-md shadow-lg bg-white border-[1px] border-[#e7e7e7] z-900 ${
        data?.type === "intermediate"
          ? "rounded-[50px] py-[2px]"
          : "rounded-[4px]"
      }`}
    >
      <div className="text-[14px] flex items-center gap-x-2">
        <div
          className="w-fit h-fit p-2 rounded-[5px]"
          style={{ backgroundColor: getLogo()?.bg }}
        >
          {getLogo()?.icon}
        </div>
        <p className="line-clamp-1 leading-[26px] px-2">{data?.label}</p>
      </div>
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
};

export default memo(CustomNode);
