import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Pause, Play, RotateCcw, X } from 'lucide-react'
import type { SchemeFlow } from '../../data/types'
import { nodeTypes } from './nodes'
import type { FlowNodeData } from './types'
import { getIcon } from '../icons'
import { cn } from '../../lib/utils'

const COL_W = 210
const ROW_H = 130

interface Props {
  flow: SchemeFlow
  accent?: string
}

export function FlowDiagram({ flow }: Props) {
  const [detailed, setDetailed] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [playStep, setPlayStep] = useState<number>(-1)
  const [playing, setPlaying] = useState(false)

  const visibleNodeIds = useMemo(() => {
    if (detailed) return new Set(flow.nodes.map((n) => n.id))
    return new Set(flow.nodes.filter((n) => n.core).map((n) => n.id))
  }, [flow, detailed])

  const activeNodeId = playStep >= 0 ? flow.playOrder[playStep] : null

  const nodes: Node<FlowNodeData>[] = useMemo(
    () =>
      flow.nodes
        .filter((n) => visibleNodeIds.has(n.id))
        .map((n) => ({
          id: n.id,
          type: n.kind,
          position: { x: n.col * COL_W, y: n.row * ROW_H },
          data: {
            label: n.label,
            icon: n.icon,
            kind: n.kind,
            detail: n.detail,
            active: n.id === activeNodeId || n.id === selectedId,
          },
          draggable: false,
        })),
    [flow, visibleNodeIds, activeNodeId, selectedId],
  )

  const edges: Edge[] = useMemo(
    () =>
      flow.edges
        .filter(
          (e) =>
            visibleNodeIds.has(e.source) &&
            visibleNodeIds.has(e.target) &&
            (detailed || e.core),
        )
        .map((e, i) => {
          const isActivePath =
            activeNodeId !== null &&
            e.source === activeNodeId &&
            playStep + 1 < flow.playOrder.length &&
            e.target === flow.playOrder[playStep + 1]
          return {
            id: `${e.source}-${e.target}-${i}`,
            source: e.source,
            target: e.target,
            label: e.label,
            className: 'ventures-edge',
            animated: false,
            labelStyle: { fill: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 500 },
            labelBgStyle: { fill: '#141414' },
            labelBgPadding: [4, 2] as [number, number],
            style: {
              stroke: isActivePath ? '#e8702a' : 'rgba(255,255,255,0.18)',
              strokeWidth: isActivePath ? 2.5 : 1.5,
            },
          }
        }),
    [flow, visibleNodeIds, detailed, activeNodeId, playStep],
  )

  // Play mode driver
  useEffect(() => {
    if (!playing) return
    if (playStep >= flow.playOrder.length - 1) {
      const t = setTimeout(() => {
        setPlaying(false)
        setPlayStep(-1)
      }, 1400)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPlayStep((s) => s + 1), 1100)
    return () => clearTimeout(t)
  }, [playing, playStep, flow.playOrder.length])

  const startPlay = () => {
    setSelectedId(null)
    setPlayStep(0)
    setPlaying(true)
  }
  const togglePlay = () => {
    if (playStep < 0) startPlay()
    else setPlaying((p) => !p)
  }
  const resetPlay = () => {
    setPlaying(false)
    setPlayStep(-1)
  }

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    setSelectedId((cur) => (cur === node.id ? null : node.id))
  }, [])

  const selectedDef = flow.nodes.find((n) => n.id === (selectedId ?? activeNodeId))

  return (
    <div className="relative">
      {/* Controls bar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={togglePlay} className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? 'Pause' : playStep >= 0 ? 'Resume' : 'Play walkthrough'}
          </button>
          {playStep >= 0 && (
            <button onClick={resetPlay} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-sm text-white/70 hover:text-white">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          )}
          {activeNodeId && (
            <span className="text-xs text-white/50">
              Step {playStep + 1} / {flow.playOrder.length}
            </span>
          )}
        </div>
        <div className="flex rounded-full border border-white/10 bg-white/5 p-0.5 text-xs">
          <button
            onClick={() => setDetailed(false)}
            className={cn('rounded-full px-3 py-1.5 transition-colors', !detailed ? 'bg-accent text-white' : 'text-white/60')}
          >
            Simple
          </button>
          <button
            onClick={() => setDetailed(true)}
            className={cn('rounded-full px-3 py-1.5 transition-colors', detailed ? 'bg-accent text-white' : 'text-white/60')}
          >
            Detailed
          </button>
        </div>
      </div>

      <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: false }}
          nodesDraggable={false}
          nodesConnectable={false}
          minZoom={0.3}
          maxZoom={1.6}
        >
          <Background variant={BackgroundVariant.Dots} gap={26} size={1} color="rgba(255,255,255,0.06)" />
          <Controls showInteractive={false} className="!border-white/10 !bg-surface [&_button]:!border-white/10 [&_button]:!bg-surface-raised [&_button]:!fill-white/70 [&_button:hover]:!bg-white/10" />
        </ReactFlow>

        {/* Detail side panel */}
        {selectedDef?.detail && (
          <div className="absolute right-0 top-0 z-10 h-full w-full max-w-sm overflow-y-auto border-l border-white/10 bg-surface/95 p-6 backdrop-blur-xl sm:w-96">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  {(() => {
                    const Icon = getIcon(selectedDef.icon)
                    return <Icon className="h-5 w-5" />
                  })()}
                </span>
                <h4 className="text-base font-semibold leading-tight text-white">{selectedDef.label}</h4>
              </div>
              <button onClick={() => setSelectedId(null)} className="text-white/40 hover:text-white" aria-label="Close detail">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{selectedDef.detail.what}</p>

            <div className="mt-5 space-y-3 text-sm">
              {selectedDef.detail.time && <DetailRow label="Time" value={selectedDef.detail.time} />}
              {selectedDef.detail.cost && <DetailRow label="Cost" value={selectedDef.detail.cost} />}
              {selectedDef.detail.tools && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/40">Tools</span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {selectedDef.detail.tools.map((t) => (
                      <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedDef.detail.tips && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/40">Tips</span>
                  <ul className="mt-1.5 space-y-1.5">
                    {selectedDef.detail.tips.map((tip) => (
                      <li key={tip} className="flex gap-2 text-white/70">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-white/40">
        Click any node for detail · drag to pan · scroll to zoom · toggle Simple/Detailed · press Play to walk the process.
      </p>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <span className="text-xs uppercase tracking-wider text-white/40">{label}</span>
      <span className="text-white/80">{value}</span>
    </div>
  )
}
