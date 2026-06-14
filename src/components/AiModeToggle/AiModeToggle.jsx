import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore.js'
import './AiModeToggle.scss'

export default function AiModeToggle({ formRoute, aiRoute, activeMode }) {
  const navigate = useNavigate()
  const user          = useAuthStore(s => s.user)
  const openAuthModal = useAuthStore(s => s.openAuthModal)

  const handleAiClick = () => {
    if (user) {
      navigate(aiRoute)
    } else {
      openAuthModal()
    }
  }

  return (
    <div className="AiModeToggle">
      <button
        className={`AiModeToggle__tab${activeMode === 'form' ? ' AiModeToggle__tab--active' : ''}`}
        onClick={() => navigate(formRoute)}
      >
        Form
      </button>
      <button
        className={`AiModeToggle__tab${activeMode === 'ai' ? ' AiModeToggle__tab--active' : ''}`}
        onClick={handleAiClick}
      >
        AI
      </button>
    </div>
  )
}
