"use client"

import type React from "react"

import { useCallback } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from "reactflow"
import "reactflow/dist/style.css"
import { WireframeThumbnail } from "./wireframe-thumbnail"
import { sitePages } from "@/lib/sitemap-data"
import type { PageNode } from "@/lib/sitemap-data"

interface FlowDiagramProps {
  onNodeClick?: (page: PageNode) => void
}

// Custom node component
const CustomPageNode = ({ data }: { data: PageNode }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <WireframeThumbnail page={data} size="sm" />
    </div>
  )
}

const nodeTypes = {
  pageNode: CustomPageNode,
}

export function FlowDiagram({ onNodeClick }: FlowDiagramProps) {
  // Create nodes from site pages
  const initialNodes: Node[] = sitePages.map((page, index) => {
    const row = Math.floor(index / 4)
    const col = index % 4

    return {
      id: page.id,
      type: "pageNode",
      position: { x: col * 200, y: row * 180 },
      data: page,
    }
  })

  // Create edges from connections
  const initialEdges: Edge[] = []
  sitePages.forEach((page) => {
    page.connections.forEach((connectionId) => {
      if (sitePages.find((p) => p.id === connectionId)) {
        initialEdges.push({
          id: `${page.id}-${connectionId}`,
          source: page.id,
          target: connectionId,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#8b5cf6", strokeWidth: 2 },
        })
      }
    })
  })

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep }, eds)),
    [setEdges],
  )

  const onNodeClickHandler = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        onNodeClick(node.data as PageNode)
      }
    },
    [onNodeClick],
  )

  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClickHandler}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const page = node.data as PageNode
            switch (page.category) {
              case "public":
                return "#3b82f6"
              case "auth":
                return "#10b981"
              case "user":
                return "#8b5cf6"
              case "quiz":
                return "#f59e0b"
              case "admin":
                return "#6b7280"
              default:
                return "#9ca3af"
            }
          }}
          maskColor="rgb(240, 240, 240, 0.6)"
        />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}
