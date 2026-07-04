import type { FlowNodeDetail, FlowNodeKind } from '../../data/types'

export interface FlowNodeData extends Record<string, unknown> {
  label: string
  icon: string
  kind: FlowNodeKind
  detail?: FlowNodeDetail
  active?: boolean
}
