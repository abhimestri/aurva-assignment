import generateUniqueId from "generate-unique-id";

export interface MealDetailProps {
  idMeal: string;
  instructions: string;
  mealName: string;
  mealThumbnail: string;
  mealSource: string;
  mealYoutube: string;
  area: string;
  category: string;
  ingredients: string[];
  tags: string[];
}

export const getFormatedMealDetails = (mealDetails: any) => {
  let tags: any = mealDetails?.strTags
    ? mealDetails?.strTags
        ?.split(",")
        ?.map((tag: any) => `${tag}-${mealDetails?.idMeal}`)
    : [];
  tags = tags?.filter(
    (item: any, index: number) => tags.indexOf(item) === index
  );
  let ingredients: any = [];
  Object.entries(mealDetails)?.forEach(([key, value], index) => {
    if (key?.startsWith("strIngredient") && value) {
      ingredients?.push(`${value}-${mealDetails?.idMeal}`);
    }
  });
  ingredients = ingredients?.filter(
    (item: any, index: number) => ingredients.indexOf(item) === index
  );
  const parsedMealDetails = {
    idMeal: mealDetails?.idMeal,
    instructions: mealDetails?.strInstructions,
    mealName: mealDetails?.strMeal,
    mealThumbnail: mealDetails?.strMealThumb,
    mealSource: mealDetails?.strSource,
    mealYoutube: mealDetails?.strYoutube,
    area: mealDetails?.strArea,
    category: mealDetails?.strCategory,
  };

  return { parsedMealDetails, ingredients, tags };
};

export const getUniqueId = () => {
  return generateUniqueId({
    length: 20,
    useLetters: true,
    useNumbers: true,
  });
};
