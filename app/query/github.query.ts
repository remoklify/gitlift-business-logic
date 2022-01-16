export const GITHUB_USER_DETAILS = `query
{
    user(login: "{{username}}") {
      login
      name
      avatarUrl
      bio
      company
      location
      email
      websiteUrl
      isDeveloperProgramMember
      isGitHubStar
      isHireable
      followers {
          totalCount
      }
      repositories(first: 100) {
        nodes {
          forkCount
          stargazerCount
          nameWithOwner
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
          forkCount
          stargazerCount
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
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
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
