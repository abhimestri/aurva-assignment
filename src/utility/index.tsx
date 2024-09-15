import { Edge, Node, Position } from "@xyflow/react";
import { parentOffSetPostionValues } from "../App";
import axios from "axios";
import { recipeActions } from "../constant";
import { getFormatedMealDetails, getUniqueId } from "../helpers";
import { Dispatch, SetStateAction } from "react";
import notify from "../components/Notify";

export interface UpdatedNodeListProps {
  items?: any;
  type?: any;
  node?: Node | any;
  nodes: Array<Node>;
  edges: Array<Edge>;
  ingredientsList?: any;
  tagsList?: any;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  infiniteStart?: boolean;
}

export const getBaseNodeAttributes = (data: any) => {
  return {
    ...data,
    type: "custom",
    sourcePosition: Position.Right,
    targetPosition: Position?.Left,
  };
};

export const getUpdatedNodeList = ({
  items,
  nodes,
  edges,
  setNodes,
  setEdges,
}: UpdatedNodeListProps) => {
  const updatedNodeList: Array<Node> = items
    ?.slice(0, 5)
    .map((data: any, i: any) => {
      const yOffset = i * 80;
      const nodeId = `category-${data?.idCategory}`;
      return {
        ...getBaseNodeAttributes({
          source: "explore-parent",
          position: { x: 350, y: parentOffSetPostionValues?.y + yOffset },
          id: nodeId,
          data: {
            label: data?.strCategory,
            payload: {
              category: data?.strCategory,
              /* this index will keep track of previous node
              so that when user clicks a parent node, the succeding children 
              nodes and edges can be removed  */
              index: items?.slice(0, 5)?.length + 1,
            },
            type: "category",
          },
        }),
      };
    });
  const updatedEdgeList: Array<Edge> = items
    ?.slice(0, 5)
    .map((data: any, i: any) => {
      const nodeId = `category-${data?.idCategory}`;
      return {
        id: `e-${data?.idCategory}`,
        target: nodeId,
        source: "explore-parent",
      };
    });
  setNodes([...nodes?.slice(0, 1), ...updatedNodeList]);
  setEdges([...edges?.slice(0, 1), ...updatedEdgeList]);
};

export const getUpdatedSingleNode = ({
  node,
  nodes,
  edges,
  setNodes,
  setEdges,
}: UpdatedNodeListProps) => {
  const uniqueId = getUniqueId();
  const newNode: Node = {
    id: `categoryview-${node?.id}-${uniqueId}`,
    data: {
      label: "View Meals",
      payload: { ...node?.data?.payload, index: nodes?.length + 1 },
      type: "intermediate",
    },
    type: "custom",
    position: {
      ...node?.position,
      x: +node?.position?.x + 300,
    },
  };
  const newEdge: Edge = {
    id: `e-categoryview-${node?.id}`,
    target: `categoryview-${node?.id}-${uniqueId}`,
    source: `${node?.id}`,
  };
  setNodes([...nodes?.slice(0, node?.data?.payload?.index), newNode]);
  setEdges([...edges?.slice(0, node?.data?.payload?.index), newEdge]);
};

export const getCategoryDetails = async ({
  node,
  nodes,
  edges,
  setNodes,
  setEdges,
}: UpdatedNodeListProps) => {
  let updatedList: any = [];
  await axios
    .get(
      node?.data?.payload?.category
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${node?.data?.payload?.category}`
        : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${node?.data?.payload?.name}`
    )
    ?.then((res) => {
      updatedList = [...updatedList, ...res?.data?.meals?.slice(0, 6)];
    });
  const uniqueId = getUniqueId();
  const updatedCategoryNodeList: Array<Node> = updatedList?.map(
    (data: any, i: any) => {
      const yOffset = i * 80;
      const nodeId = `categoryitems-${data?.idMeal}-${uniqueId}`;
      return {
        ...getBaseNodeAttributes({
          position: {
            x: +node?.position?.x + 400,
            y: +node?.position?.y - 100 + yOffset,
          },
          id: nodeId,
          data: {
            label: data?.strMeal,
            payload: {
              categoryName: data?.strMeal,
              index: node?.data?.payload?.index + updatedList?.length,
            },
            type: "categoryItems",
          },
        }),
      };
    }
  );
  const updatedCategoryEdgeList: Array<Edge> = updatedList?.map(
    (data: any, i: any) => {
      const nodeId = `categoryitems-${data?.idMeal}-${uniqueId}`;
      return {
        id: `categoryitemedge-${data?.idMeal}`,
        target: nodeId,
        source: node?.id,
      };
    }
  );

  /* the check for if and else is put to roll back 
  on node which user clicks, this will remove nodes and edges
   which succeed after the node that user has clicked  */
  if (nodes?.length > node?.data?.payload?.index) {
    setNodes([
      ...nodes?.slice(0, +node?.data?.payload?.index - nodes?.length),
      ...updatedCategoryNodeList,
    ]);
  } else {
    setNodes([...nodes, ...updatedCategoryNodeList]);
  }
  if (edges?.length > node?.data?.payload?.index) {
    setEdges([
      ...edges?.slice(0, +node?.data?.payload?.index - edges?.length),
      ...updatedCategoryEdgeList,
    ]);
  } else {
    setEdges([...edges, ...updatedCategoryEdgeList]);
  }
};

export const getRecipeActions = async ({
  node,
  nodes,
  edges,
  setNodes,
  setEdges,
}: UpdatedNodeListProps) => {
  const { newNodes, newEdges }: any = recipeActions(node, nodes);
  let mealDetails: any = {};
  await axios
    .get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${
        node?.id?.split("-")[1]
      }`
    )
    ?.then((res) => {
      mealDetails = {
        ...getFormatedMealDetails(res?.data?.meals[0]),
      };
    });

  if (nodes?.length > node?.data?.payload?.index) {
    const updatedNodeList = [
      ...nodes?.slice(0, +node?.data?.payload?.index - nodes?.length),
      ...newNodes,
    ];
    setNodes([...updatedNodeList]);
  } else {
    setNodes([...nodes, ...newNodes]);
  }

  edges?.length > node?.data?.payload?.index
    ? setEdges([
        ...edges?.slice(0, +node?.data?.payload?.index - edges?.length),
        ...newEdges,
      ])
    : setEdges([...edges, ...newEdges]);
  return mealDetails;
};

export const getIngredientsNodes = ({
  node,
  nodes,
  edges,
  ingredientsList,
  setNodes,
  setEdges,
}: UpdatedNodeListProps) => {
  const uniqueId = getUniqueId();
  const updatedNodeList: Array<Node> = ingredientsList?.map(
    (ingredient: any, i: number) => {
      const yOffset = i * 80;
      const nodeId = `ingredients-${ingredient}-${uniqueId}`;
      return {
        ...getBaseNodeAttributes({
          position: {
            x: +node?.position?.x + 400,
            y: +node?.position?.y - 100 + yOffset,
          },
          id: nodeId,
          data: {
            label: ingredient?.split("-")[0],
            payload: {
              index: nodes?.length + ingredientsList?.length,
              name: ingredient?.split("-")[0],
            },
            type: "ingredient",
          },
        }),
      };
    }
  );
  const updatedEdgeList: Array<Edge> = ingredientsList?.map(
    (ingredient: any, i: any) => {
      const nodeId = `ingredients-${ingredient}-${uniqueId}`;
      return {
        id: `e-${ingredient}-${uniqueId}`,
        target: nodeId,
        source: node?.id,
      };
    }
  );
  if (nodes?.length > node?.data?.payload?.index) {
    setNodes([
      ...nodes?.slice(0, +node?.data?.payload?.index - nodes?.length),
      ...updatedNodeList,
    ]);
  } else {
    setNodes([...nodes, ...updatedNodeList]);
  }
  if (edges?.length > node?.data?.payload?.index) {
    setEdges([
      ...edges?.slice(0, +node?.data?.payload?.index - edges?.length),
      ...updatedEdgeList,
    ]);
  } else {
    setEdges([...edges, ...updatedEdgeList]);
  }
};

export const getTagsNodes = ({
  node,
  nodes,
  edges,
  tagsList,
  setNodes,
  setEdges,
}: UpdatedNodeListProps) => {
  const uniqueId = getUniqueId();
  if (tagsList?.length) {
    const updatedNodeList: Array<Node> = tagsList?.map((tag: any, i: any) => {
      const yOffset = i * 80;
      const nodeId = `tags-${tag}-${uniqueId}`;
      return {
        ...getBaseNodeAttributes({
          position: {
            x: +node?.position?.x + 300,
            y: +node?.position?.y - 40 + yOffset,
          },
          id: nodeId,
          data: {
            label: tag?.split("-")[0],
            payload: {
              index: nodes?.length + tagsList?.length,
            },
            type: "tag",
          },
        }),
      };
    });
    const updatedEdgeList: Array<Edge> = tagsList?.map((tag: any, i: any) => {
      const nodeId = `tags-${tag}-${uniqueId}`;
      return {
        id: `e-${tag}-${uniqueId}`,
        target: nodeId,
        source: node?.id,
      };
    });
    return {
      tagsNodes:
        nodes?.length > node?.data?.payload?.index
          ? setNodes([
              ...nodes?.slice(0, +node?.data?.payload?.index - nodes?.length),

              ...updatedNodeList,
            ])
          : setNodes([...nodes, ...updatedNodeList]),
      tagsEdges:
        edges?.length > node?.data?.payload?.index
          ? setEdges([
              ...edges?.slice(0, +node?.data?.payload?.index - edges?.length),
              ...updatedEdgeList,
            ])
          : setEdges([...edges, ...updatedEdgeList]),
    };
  } else {
    notify({ type: "error", text: "Oops, No tags found!" });
  }
};
