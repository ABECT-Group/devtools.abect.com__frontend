import useAuthStore from '../../store/authStore.js'
import { formatTokens } from '../../utils/formatTokens.js'
import './TokenBadge.scss'

function LightningIcon() {
  return (
    <svg className="TokenBadge__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
    </svg>
  )
}

export default function TokenBadge() {
  const user    = useAuthStore(s => s.user)
  const balance = user?.tokenWallet?.balance

  if (balance == null) return null

  return (
    <div className="TokenBadge" title={`${balance.toLocaleString()} tokens`}>
      <LightningIcon />
      <span className="TokenBadge__value">{formatTokens(balance)}</span>
    </div>
  )
}
