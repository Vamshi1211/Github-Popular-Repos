// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepoItem} = props
  const {avatarUrl, name, issuesCount, forksCount, starsCount} = eachRepoItem

  return (
    <li className="repo-list-item-container">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="name-heading">{name}</h1>
      <div className="des-container">
        <div className="stars-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stars-image"
          />
          <p className="stars-count">{starsCount} stars</p>
        </div>
        <div className="stars-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="stars"
            className="stars-image"
          />
          <p className="stars-count">{forksCount} forks</p>
        </div>
        <div className="stars-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="stars"
            className="issues-image"
          />
          <p className="issues-count">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
