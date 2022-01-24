/**
 * @description holds user controller
 */

import axios from 'axios';
import { Achievement } from '../interface/achievement.interface';
import { Contribution } from '../interface/contribution.interface';
import { CoreInformation } from '../interface/core-information.interface';
import { GithubUser } from '../interface/github-user.interface';
import { PersonalInformation } from '../interface/personal-information.interface';
import { GITHUB_USER_DETAILS } from '../query/github.query';

export class GithubUserController {
  constructor(private authorization: string, private url: string) {}

  getUserDetails = async (username: string) => {
    const query = GITHUB_USER_DETAILS.replace('{{username}}', username);

    const response = await axios.post<any>(
      this.url,
      { query },
      {
        headers: { Authorization: this.authorization },
      }
    );

    var githubUser: GithubUser = {} as GithubUser;

    if (
      response &&
      response.data &&
      response.data.data &&
      response.data.data.user
    ) {
      const u = response.data.data.user;
      const languages = this.getLanguagesAndPrimaryLanguages(
        u.repositoriesContributedTo?.nodes,
        u.repositories.nodes
      );

      const interactions = this.getInteractions(
        u.repositoriesContributedTo?.nodes,
        u.repositories.nodes
      );

      const coreInformation = {
        login: u.login,
        name: u.name,
        avatarUrl: u.avatarUrl,
        bio: u.bio,
      } as CoreInformation;

      const personalInformation = {
        company: u.company,
        location: u.location,
        email: u.email,
        websiteUrl: u.websiteUrl,
      } as PersonalInformation;

      const achievement = {
        isDeveloperProgramMember: u.isDeveloperProgramMember,
        isGithubStar: u.isGitHubStar,
        isHireable: u.isHireable,
      } as Achievement;

      const contribution = {
        totalForkCount: interactions.totalForkCount,
        totalStargazerCount: interactions.totalStargazerCount,
        totalFollowersCount: u.followers.totalCount,
        totalCommitContributions:
          u.contributionsCollection.totalCommitContributions,
        totalIssueContributions:
          u.contributionsCollection.totalIssueContributions,
        totalPullRequestContributions:
          u.contributionsCollection.totalPullRequestContributions,
        totalPullRequestReviewContributions:
          u.contributionsCollection.totalPullRequestReviewContributions,
        totalRepositoryContributions:
          u.contributionsCollection.totalRepositoryContributions,
        totalContributionsCount:
          u.contributionsCollection.contributionCalendar.totalContributions,
        lastWeekEvents:
          u.contributionsCollection.contributionCalendar.weeks.pop(),
        languages: languages.languages,
        primaryLanguages: languages.primaryLanguages,
      } as Contribution;

      githubUser = {
        coreInformation,
        personalInformation,
        achievement,
        contribution,
      } as GithubUser;
    }

    return githubUser;
  };

  getInteractions = (repositoriesContributedTo: any[], repositories: any[]) => {
    var allRepositories: any[] = [];
    var repoNames: string[] = [];
    var totalStargazerCount: number = 0;
    var totalForkCount: number = 0;

    allRepositories = [...repositoriesContributedTo, ...repositories];

    for (let i = 0; i < allRepositories.length; i++) {
      const repo = allRepositories[i];
      if (repo && repo.nameWithOwner) {
        if (repoNames.indexOf(repo.nameWithOwner) === -1) {
          repoNames.push(repo.nameWithOwner);
          totalStargazerCount += repo.stargazerCount;
          totalForkCount += repo.forkCount;
        }
      }
    }

    return {
      totalStargazerCount,
      totalForkCount,
    };
  };

  getLanguagesAndPrimaryLanguages = (
    repositoriesContributedTo: any[],
    repositories: any[]
  ) => {
    var languagesList: any[] = [];
    var primaryLanguages: string[] = [];
    var allRepositories: any[] = [];

    allRepositories = [...repositoriesContributedTo, ...repositories];

    languagesList = this.getLanguages(allRepositories);

    languagesList = languagesList.sort((a: any, b: any) => {
      if (a.count > b.count) {
        return -1;
      }

      if (a.count < b.count) {
        return 1;
      }

      return 0;
    });

    const length = languagesList.length > 2 ? 3 : languagesList.length;

    for (let i = 0; i < length; i++) {
      primaryLanguages.push(languagesList[i].name);
    }

    const languages: string[] = languagesList.map((l: any) => l.name);

    return {
      languages,
      primaryLanguages,
    };
  };

  getLanguages = (repositories: any[]) => {
    var languagesList: any[] = [];

    if (repositories) {
      for (let i = 0; i < repositories.length; i++) {
        const contributed = repositories[i];
        if (
          contributed &&
          contributed.languages &&
          contributed.languages.nodes
        ) {
          var contributedLangs: any[] = contributed.languages.nodes;
          for (let k = 0; k < contributedLangs.length; k++) {
            const contributedLang = contributedLangs[k];
            const element = languagesList.find(
              (c: any) => c.name === contributedLang.name
            );
            if (element) {
              const index = languagesList.indexOf(element);
              languagesList[index].count += 1;
            } else {
              languagesList.push({ name: contributedLang.name, count: 0 });
            }
          }
        }
      }
    }

    return languagesList;
  };
}
