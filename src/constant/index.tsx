import { MarkerType, Position } from "@xyflow/react";
import { getUniqueId } from "../helpers";
import { ReactComponent as Explore } from "../assets/earth.svg";

export const initialNodes = [
  {
    id: "explore-parent",
    label: "Explore",
    data: {
      label: (
        <div className="flex items-center gap-x-2">
          <Explore className="h-[20px] w-[20px]" />
          <p>Explore</p>
        </div>
      ),
      payload: {
        index: 0,
      },
    },
    type: "input",
    position: { x: 50, y: 120 },
    sourcePosition: Position.Right,
  },
];

export const initialEdges = [
  {
    id: "e1-1",
    source: "explore-parent",
    target: "explore-parent",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#000",
    },
  },
];

export const recipeActions = (node: any, nodes: any) => {
  const uniqueId = getUniqueId();
  return {
    newNodes: [
      {
        id: `ingredientslist-${node?.id}-${uniqueId}`,
        data: {
          label: (
            <div className="py-2 border-solid border-sm border-[#000]">
              View Ingredients
            </div>
          ),
          payload: {
            index: node?.data?.payload?.index + 3,
          },
          type: "intermediate",
        },
        position: {
          x: node?.position?.x + 400,
          y: node?.position?.y,
        },
        sourcePosition: Position.Left,
        targetPosition: Position?.Right,
        type: "custom",
      },
      {
        id: `tagslist-${node?.id}-${uniqueId}`,
        data: {
          label: (
            <div className="py-2 border-solid border-sm border-[#000]">
              View Tag
            </div>
          ),
          payload: {
            index: node?.data?.payload?.index + 3,
          },
          type: "intermediate",
        },
        position: {
          x: node?.position?.x + 400,
          y: node?.position?.y + 80,
        },
        sourcePosition: Position.Left,
        targetPosition: Position?.Right,
        type: "custom",
      },
      {
        id: `details-${node?.id}-${uniqueId}`,
        data: {
          label: (
            <div className="py-2 border-solid border-sm border-[#000]">
              View Details
            </div>
          ),
          payload: {
            index: node?.data?.payload?.index + 3,
          },
          type: "intermediate",
        },
        position: {
          x: node?.position?.x + 400,
          y: node?.position?.y + 160,
        },
        source: node?.id,
        sourcePosition: Position.Left,
        targetPosition: Position?.Right,
        type: "custom",
      },
    ],
    newEdges: [
      {
        id: `ingredientslist-category-${node?.id}`,
        source: node?.id,
        target: `ingredientslist-${node?.id}-${uniqueId}`,
      },
      {
        id: `tagslist-category-${node?.id}`,
        source: node?.id,
        target: `tagslist-${node?.id}-${uniqueId}`,
      },
      {
        id: `details-category-${node?.id}`,
        source: node?.id,
        target: `details-${node?.id}-${uniqueId}`,
      },
    ],
  };
};
