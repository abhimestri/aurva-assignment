export const getStatus = (text: any) => {
  switch (text) {
    case "Meat":
    case "Chicken":
    case "Stew":
    case "Alcoholic":
    case "Fish":
      return "danger";
    case "Milk":
    case "Pasta":
    case "Fruity":
    case "Breakfast":
    case "Pulse":
      return "success";
    case "Sweet":
    case "Baking":
      return "warning";
    default:
      return "";
  }
};
