import { createContext } from "react";

export const MealDetailsContext: any = createContext({
  mealDetails: {},
  setMealDetails: (data: any) => {
    return data;
  },
});
