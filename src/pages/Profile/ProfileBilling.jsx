import useAuthStore from '../../store/authStore.js'
import { formatTokens } from '../../utils/formatTokens.js'
import './ProfileBilling.scss'

const PLAN_LIMITS = { free: 100_000, plus: 5_000_000, pro: 15_000_000 }

export default function ProfileBilling() {
  const user = useAuthStore(s => s.user)
  if (!user) return null

  const plan  = user.subscription?.plan ?? 'free'
  const limit = PLAN_LIMITS[plan]

  return (
    <div className="ProfileBilling">
      <div className="ProfileSection">
        <h2 className="ProfileSection__title">Current plan</h2>
        <div className="ProfileBilling__current">
          <span className={`ProfileBilling__plan ProfileBilling__plan--${plan}`}>
            {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </span>
          <span className="ProfileBilling__desc">{formatTokens(limit)} tokens / month</span>
        </div>
      </div>

      <div className="ProfileSection">
        <h2 className="ProfileSection__title">Upgrade</h2>
        <div className="ProfileBilling__plans">
          <div className="ProfileBilling__card">
            <div className="ProfileBilling__card-header">
              <span className="ProfileBilling__card-name">Plus</span>
              <span className="ProfileBilling__card-tokens">{formatTokens(PLAN_LIMITS.plus)} tokens / month</span>
            </div>
            <p className="ProfileBilling__card-desc">
              For developers working on multiple projects
            </p>
            <button className="ProfileBilling__upgrade-btn" disabled>
              Upgrade to Plus <span className="ProfileBilling__soon">Coming soon</span>
            </button>
          </div>

          <div className="ProfileBilling__card">
            <div className="ProfileBilling__card-header">
              <span className="ProfileBilling__card-name">Pro</span>
              <span className="ProfileBilling__card-tokens">{formatTokens(PLAN_LIMITS.pro)} tokens / month</span>
            </div>
            <p className="ProfileBilling__card-desc">
              For teams and power users
            </p>
            <button className="ProfileBilling__upgrade-btn" disabled>
              Upgrade to Pro <span className="ProfileBilling__soon">Coming soon</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
