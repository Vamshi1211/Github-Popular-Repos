import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const failureValueConstant = {
  failure: 'initial',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    languagesList: [],
    isLoading: true,
    failure: failureValueConstant.failure,
  }

  componentDidMount() {
    this.getLanguagesData()
  }

  getLanguagesData = async () => {
    const {activeId} = this.state
    this.setState({isLoading: true})

    // const url = 'https://apis.ccbp.in/popular-repos'

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        id: eachItem.id,
        name: eachItem.name,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        starsCount: eachItem.stars_count,
      }))

      this.setState({languagesList: updatedData, isLoading: false})
    } else if (response.ok !== true) {
      this.setState({failure: 'FAILURE', isLoading: false})
    }
  }

  languageItemClicked = activeId => {
    this.setState({activeId}, this.getLanguagesData)
  }

  getLanguages = () => {
    const {activeId} = this.state
    return (
      <>
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            eachLanguageItem={eachItem}
            languageItemClicked={this.languageItemClicked}
            activeIdValue={activeId === eachItem.id}
          />
        ))}
      </>
    )
  }

  getRepositoryList = () => {
    const {languagesList, failure} = this.state
    const failureValue = failure === 'FAILURE'
    return (
      <>
        {failureValue ? (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
              className="failure-image"
            />
            <h1 className="failure-heading">Something Went Wrong</h1>
          </div>
        ) : (
          <ul className="repository-list-container">
            {languagesList.map(eachItem => (
              <RepositoryItem key={eachItem.id} eachRepoItem={eachItem} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading, failure} = this.state

    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="languages-container">{this.getLanguages()}</ul>
        {isLoading ? this.renderLoading() : this.getRepositoryList()}
      </div>
    )
  }
}

export default GithubPopularRepos
