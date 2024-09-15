import "./App.css";
import {
  Background,
  Controls,
  Edge,
  MarkerType,
  Node,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import { initialEdges, initialNodes } from "./constant";
import { useCallback, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import axios from "axios";
import {
  getCategoryDetails,
  getIngredientsNodes,
  getRecipeActions,
  getTagsNodes,
  getUpdatedNodeList,
  getUpdatedSingleNode,
} from "./utility";
import MealsDetailsSideBar from "./SideBar/MealsDetailsSideBar";
import { MealDetailsContext } from "./context";
import CustomNode from "./components/CustomNode";
import { Toaster } from "react-hot-toast";
import { MealDetailProps } from "./helpers";

export const parentOffSetPostionValues = {
  x: 50,
  y: 30,
};

const nodeTypes = {
  custom: CustomNode,
};

const App = () => {
  const [nodes, setNodes] = useState<Array<Node>>(initialNodes);
  const [edges, setEdges] = useState<Array<Edge>>(initialEdges);
  const [mealDetails, setMealDetails] = useState<MealDetailProps>();
  const [openMealDetailsSidebar, setOpenMealDetailSidebar] =
    useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<any>([]);

  const handleNodeClick = useCallback(
    (_event: any, node: any) => {
      switch (node?.id?.split("-")[0]) {
        case "explore":
          getUpdatedNodeList(
            {
              items: categoryList,
              type: node?.id?.split("-")[0],
              nodes,
              edges,
              setEdges,
              setNodes,
            }
            // this will give info about whether it is main node,category node,tag nodes etc
          );
          break;
        case "category":
          getUpdatedSingleNode({ node, nodes, edges, setNodes, setEdges });
          break;
        case "categoryview":
          getCategoryDetails({ node, nodes, edges, setNodes, setEdges });
          break;
        case "categoryitems":
          getRecipeActions({ node, nodes, edges, setNodes, setEdges })?.then(
            (res) => {
              setMealDetails({ ...res });
            }
          );
          break;
        case "ingredientslist":
          getIngredientsNodes({
            node,
            nodes,
            edges,
            ingredientsList: mealDetails?.ingredients,
            setNodes,
            setEdges,
          });
          break;
        case "tagslist":
          getTagsNodes({
            node,
            nodes,
            edges,
            tagsList: mealDetails?.tags,
            setNodes,
            setEdges,
          });
          break;
        case "ingredients":
          getUpdatedSingleNode({
            node,
            nodes,
            edges,
            setNodes,
            setEdges,
          });
          break;
        case "details":
          setOpenMealDetailSidebar(true);
          break;
        default: {
          return null;
        }
      }
    },
    [categoryList, edges, nodes, mealDetails]
  );

  useEffect(() => {
    if (!categoryList?.length) {
      axios
        .get("https://www.themealdb.com/api/json/v1/1/categories.php")
        ?.then((res) => {
          setCategoryList([...res?.data?.categories]);
        });
    }
  }, [categoryList]);

  return (
    <MealDetailsContext.Provider
      value={{
        mealDetails: mealDetails,
        setMealDetails: setMealDetails,
      }}
    >
      <div className="w-full h-[100vh]">
        <MealsDetailsSideBar
          openMealDetailsSidebar={openMealDetailsSidebar}
          setOpenMealDetailSidebar={setOpenMealDetailSidebar}
        />
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{ markerEnd: { type: MarkerType.ArrowClosed } }}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <Toaster />
    </MealDetailsContext.Provider>
  );
};

export default App;
