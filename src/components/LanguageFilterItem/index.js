// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageItem, languageItemClicked, activeIdValue} = props
  const {id, language} = eachLanguageItem

  const languageButtonClicked = () => {
    languageItemClicked(id)
  }

  const activeIdClass = activeIdValue ? 'active-btn' : ''

  return (
    <li className="list-item-container">
      <button
        type="button"
        className={`language-button ${activeIdClass}`}
        onClick={languageButtonClicked}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
