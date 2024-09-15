import React, { Dispatch, SetStateAction, useContext } from "react";
import { MealDetailsContext } from "../context";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import Chip from "../components/Chips";
import { getStatus } from "./utility";
import { MealDetailProps } from "../helpers";

interface MealsDetailsSideBarProps extends Partial<MealDetailProps> {
  openMealDetailsSidebar: boolean;
  setOpenMealDetailSidebar: Dispatch<SetStateAction<boolean>>;
}

const MealsDetailsSideBar = ({
  openMealDetailsSidebar,
  setOpenMealDetailSidebar,
}: MealsDetailsSideBarProps) => {
  const { mealDetails }: any = useContext(MealDetailsContext);

  const getChipList = () => {
    const chipList = mealDetails?.tags?.map((tag: string) => {
      return (
        <Chip
          text={tag?.split("-")[0]}
          status={getStatus(tag?.split("-")[0])}
        />
      );
    });
    return chipList;
  };

  return (
    <div
      className={`bg-white absolute z-[100] overflow-scroll w-[80vw] h-[100vh] text-[14px] transition-all ease-in-out delay-650 duration-500 ${
        openMealDetailsSidebar
          ? "left-[20vw] shadow-[-26px_2px_81px_-80px_rgba(0,0,0,0.69)]"
          : "left-[100vw]"
      } sm:w-[50vw] ${
        openMealDetailsSidebar ? "sm:left-[50vw]" : "left-[100vw]"
      } md:w-[30vw] ${
        openMealDetailsSidebar ? "md:left-[70vw]" : "left-[100vw]"
      }`}
    >
      <div className="flex justify-between items-center mt-2 px-4 py-2 sticky top-0 bg-[#fff]">
        <p className="font-semibold text-[18px]">
          {mealDetails?.parsedMealDetails?.mealName}
        </p>
        <div
          className="cursor-pointer "
          onClick={() => setOpenMealDetailSidebar(false)}
        >
          <CloseIcon className="text-[#000] w-[30px] h-[30px]" />
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="h-[1px] w-full bg-[#ccc] mt-2 mb-4" />
        <div>
          {mealDetails?.parsedMealDetails?.mealThumbnail ? (
            <img
              src={mealDetails?.parsedMealDetails?.mealThumbnail}
              className="aspect-square w-full bg-[#ccc] rounded-[10px]"
              alt=""
            />
          ) : (
            <div className="aspect-square w-full bg-[#ccc] rounded-[10px] text-center pt-10">
              No image found!
            </div>
          )}
          <div className="">
            <div className="flex my-5 gap-x-2 gap-y-2 flex-wrap">
              {getChipList()}
            </div>
            <div className="">
              {mealDetails?.parsedMealDetails?.category && (
                <div className="flex my-4 w-[100%]">
                  <p className="w-[50%]">Category :</p>
                  <p className="">{mealDetails?.parsedMealDetails?.category}</p>
                </div>
              )}
              {mealDetails?.parsedMealDetails?.area && (
                <div className="flex my-4">
                  <p className="w-[50%]">Area :</p>
                  <p className="">{mealDetails?.parsedMealDetails?.area}</p>
                </div>
              )}
              {mealDetails?.parsedMealDetails?.mealYoutube && (
                <div className="flex my-4">
                  <p className="w-[50%]">YouTube : </p>
                  <div className="w-[50%]">
                    <a
                      className="w-full underline transition-all ease-in-out duration-300 hover:!text-[#267fff]"
                      href={mealDetails?.parsedMealDetails?.mealYoutube}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      {mealDetails?.parsedMealDetails?.mealYoutube}
                    </a>
                  </div>
                </div>
              )}
              {mealDetails?.parsedMealDetails?.mealSource && (
                <div className="flex my-4">
                  <p className="w-[50%]">Recipe :</p>
                  <div className="w-[50%]">
                    <a
                      className="w-full underline transition-all ease-in-out duration-300 hover:!text-[#267fff]"
                      href={mealDetails?.parsedMealDetails?.mealSource}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      {mealDetails?.parsedMealDetails?.mealSource}
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="border-[1px] mb-6 border-[#e7e7e7] rounded-[10px] p-2 px-4">
              <p className="font-semibold text-[16px]">Instructions</p>
              <p className="mt-4">
                {mealDetails?.parsedMealDetails?.instructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsDetailsSideBar;
