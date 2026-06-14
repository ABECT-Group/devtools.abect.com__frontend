import { useEffect, useState } from 'react'
import { userApi } from '../../api/user.js'
import './TokenBadge.scss'

function LightningIcon() {
  return (
    <svg className="TokenBadge__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
    </svg>
  )
}

export default function TokenBadge({ token }) {
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    if (!token) return
    userApi.getBalance(token)
      .then(data => setBalance(data.data.balance))
      .catch(() => {})
  }, [token])

  if (balance === null) return null

  return (
    <div className="TokenBadge">
      <LightningIcon />
      <span className="TokenBadge__value">{balance.toLocaleString()}</span>
    </div>
  )
}
