import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { getIcon } from '../icons'
import { cn } from '../../lib/utils'
import type { FlowNodeData } from './types'

function BaseNode({ data, selected }: NodeProps & { data: FlowNodeData }) {
  const Icon = getIcon(data.icon)
  const isDecision = data.kind === 'decision'
  const isTerminal = data.kind === 'terminal'
  const active = data.active || selected

  return (
    <div
      className={cn(
        'group relative flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300 ease-expo',
        'w-[168px]',
        isDecision && 'border-dashed',
        active
          ? 'border-accent bg-accent/15 shadow-[0_0_0_1px_rgba(232,112,42,0.5),0_8px_30px_-8px_rgba(232,112,42,0.5)]'
          : 'border-white/12 bg-surface-raised hover:border-white/25',
        isTerminal && !active && 'border-accent/40 bg-accent/5',
      )}
    >
      <Handle type="target" position={Position.Left} className="!h-1.5 !w-1.5 !border-0 !bg-white/30" />
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
          active ? 'bg-accent text-white' : 'bg-white/8 text-accent',
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-[13px] font-medium leading-tight text-white/90">{data.label}</span>
      {data.detail && (
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent/70 opacity-0 transition-opacity group-hover:opacity-100" />
      )}
      <Handle type="source" position={Position.Right} className="!h-1.5 !w-1.5 !border-0 !bg-white/30" />
    </div>
  )
}

export const nodeTypes = {
  process: memo(BaseNode),
  decision: memo(BaseNode),
  terminal: memo(BaseNode),
}
