type CalloutType = 'tip' | 'warning' | 'success' | 'info'

const styles: Record<CalloutType, { bg: string; border: string; text: string; icon: string }> = {
  tip: { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-800', icon: '💡' },
  warning: { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-800', icon: '⚠️' },
  success: { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-800', icon: '✅' },
  info: { bg: 'bg-gray-50', border: 'border-gray-400', text: 'text-gray-800', icon: 'ℹ️' },
}

export default function Callout({
  type = 'tip',
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}) {
  const s = styles[type]
  return (
    <div className={`${s.bg} border-l-4 ${s.border} p-4 rounded-r-lg my-4`}>
      {title && (
        <p className={`${s.text} font-semibold text-sm mb-1`}>
          {s.icon} {title}
        </p>
      )}
      <div className={`${s.text} text-sm leading-relaxed`}>{children}</div>
    </div>
  )
}
