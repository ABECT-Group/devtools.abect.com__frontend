import { useEffect, useState } from 'react'
import { userApi } from '../../api/user.js'
import useAuthStore from '../../store/authStore.js'
import { formatTokens } from '../../utils/formatTokens.js'
import './ProfileUsage.scss'

const PLAN_LIMITS = { free: 100_000, plus: 5_000_000, pro: 15_000_000 }

const formatDate = iso =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })


export default function ProfileUsage() {
  const user        = useAuthStore(s => s.user)
  const accessToken = useAuthStore(s => s.accessToken)

  const [wallet, setWallet]           = useState(null)
  const [transactions, setTransactions] = useState([])
  const [page, setPage]               = useState(1)
  const [pages, setPages]             = useState(1)
  const [loadingWallet, setLoadingWallet] = useState(true)
  const [loadingTx, setLoadingTx]     = useState(true)

  useEffect(() => {
    if (!accessToken) return
    userApi.getBalance(accessToken)
      .then(data => setWallet(data.data))
      .catch(() => {})
      .finally(() => setLoadingWallet(false))
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return
    setLoadingTx(true)
    userApi.getHistory(accessToken, page)
      .then(data => {
        setTransactions(data.data.transactions)
        setPages(data.data.pages)
      })
      .catch(() => {})
      .finally(() => setLoadingTx(false))
  }, [accessToken, page])

  const plan      = user?.subscription?.plan ?? 'free'
  const planLimit = PLAN_LIMITS[plan] ?? 100_000
  const balance   = wallet?.balance ?? 0
  const pct       = Math.min(100, Math.round((balance / planLimit) * 100))

  return (
    <div className="ProfileUsage">
      <div className="ProfileSection">
        <h2 className="ProfileSection__title">Token wallet</h2>
        {loadingWallet ? (
          <p className="ProfileUsage__loading">Loading…</p>
        ) : (
          <>
            <div className="ProfileUsage__wallet-top">
              <span className="ProfileUsage__plan">
                {plan.charAt(0).toUpperCase() + plan.slice(1)} plan
              </span>
              <span className="ProfileUsage__counts">
                <span className="ProfileUsage__balance" title={balance.toLocaleString()}>{formatTokens(balance)}</span>
                <span className="ProfileUsage__sep">/</span>
                <span className="ProfileUsage__limit" title={planLimit.toLocaleString()}>{formatTokens(planLimit)}</span>
              </span>
            </div>
            <div className="ProfileUsage__bar">
              <div className="ProfileUsage__bar-fill" style={{ width: `${pct}%` }} />
            </div>
            {wallet?.resetAt && (
              <div className="ProfileUsage__reset-row">
                <span className="ProfileUsage__reset">Resets {formatDate(wallet.resetAt)}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="ProfileSection">
        <h2 className="ProfileSection__title">Transaction history</h2>
        {loadingTx ? (
          <p className="ProfileUsage__loading">Loading…</p>
        ) : transactions.length === 0 ? (
          <p className="ProfileUsage__empty">No transactions yet</p>
        ) : (
          <>
            <table className="ProfileUsage__table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx._id}>
                    <td className="ProfileUsage__desc">{tx.description}</td>
                    <td className="ProfileUsage__date">{formatDate(tx.createdAt)}</td>
                    <td className={`ProfileUsage__amount ProfileUsage__amount--${tx.type === 'charge' ? 'minus' : 'plus'}`}>
                      {tx.type === 'charge' ? `−${formatTokens(Math.abs(tx.amount))}` : `+${formatTokens(tx.amount)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pages > 1 && (
              <div className="ProfileUsage__pagination">
                <button
                  className="ProfileUsage__page-btn"
                  onClick={() => setPage(p => p - 1)}
                  disabled={page === 1}
                >
                  ← Prev
                </button>
                <span className="ProfileUsage__page-info">{page} / {pages}</span>
                <button
                  className="ProfileUsage__page-btn"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page === pages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
