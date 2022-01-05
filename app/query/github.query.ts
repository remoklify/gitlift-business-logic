export const GITHUB_USER_DETAILS = `query
{
    user(login: "{{username}}") {
      name
      avatarUrl
      bio
      company
      email
      isDeveloperProgramMember
      isGitHubStar
      isHireable
      repositories(first: 100) {
        nodes {
          languages(first: 100) {
            nodes {
              name
            }
          }
        }
      }
      repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
        totalCount
        nodes {
          nameWithOwner
          languages(first: 100) {
            nodes {
              name
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
            firstDay
          }
        }
      }
    }
}`;