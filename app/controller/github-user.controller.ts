/**
 * @description holds user controller
 */

import { EncryptionUtil } from '@open-template-hub/common';
import axios from 'axios';
import { Achievement } from '../interface/achievement.interface';
import { Contribution } from '../interface/contribution.interface';
import { CoreInformation } from '../interface/core-information.interface';
import { GithubUser } from '../interface/github-user.interface';
import { Language } from '../interface/language.interface';
import { PersonalInformation } from '../interface/personal-information.interface';
import { GITHUB_USER_DETAILS } from '../query/github.query';
import { CommonEncryptionUtil } from '../util/encryption.util';

export class GithubUserController {
  constructor(
    private authorization: string,
    private url: string,
    private secret: string
  ) {}

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
      const languages = this.getLanguagesList(
        u.repositoriesContributedTo?.nodes,
        u.repositories.nodes,
        u.contributionsCollection.commitContributionsByRepository
      );

      const interactions = this.getInteractions(u.repositories.nodes);

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

      const created = new Date();
      const totalPoint =
        u.contributionsCollection.contributionCalendar.totalContributions +
        interactions.totalForkCount +
        interactions.totalStargazerCount +
        u.followers.totalCount;
      const login = u.login;

      const encryptionUtil: CommonEncryptionUtil = new CommonEncryptionUtil();

      const hash = encryptionUtil.encrypt(
        { created, totalPoint, login },
        this.secret
      );

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
        languages: languages,
        hash,
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

  decryptHash = (hash: string) => {
    const encryptionUtil: CommonEncryptionUtil = new CommonEncryptionUtil();
    var decrypted = {};
    try {
      decrypted = encryptionUtil.decrypt(hash, this.secret);
    } catch (e) {
      console.log('decryptHash > error: ', e);
    }
    return decrypted;
  };

  getInteractions = (repositories: any[]) => {
    var repoNames: string[] = [];
    var totalStargazerCount: number = 0;
    var totalForkCount: number = 0;

    for (let i = 0; i < repositories.length; i++) {
      const repo = repositories[i];
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

  getLanguagesList = (
    repositoriesContributedTo: any[],
    repositories: any[],
    commitContributionsByRepository: any[]
  ) => {
    var primaryLanguages: Language[] = [];
    var languages: Language[] = [];
    var allRepositories: any[] = [];

    allRepositories = [...repositoriesContributedTo, ...repositories];

    languages = this.getLanguages(
      allRepositories,
      commitContributionsByRepository
    );

    console.log(languages);

    languages = languages.sort((a: any, b: any) => {
      if (a.point > b.point) {
        return -1;
      }

      if (a.point < b.point) {
        return 1;
      }

      return 0;
    });

    return languages;
  };

  getLanguages = (
    repositories: any[],
    commitContributionsByRepository: any[]
  ) => {
    var languagesList: Language[] = [];
    repositories = repositories.filter((r: any) => r);
    for (let i = 0; i < commitContributionsByRepository.length; i++) {
      const commit = commitContributionsByRepository[i];
      const repo = repositories.find(
        (r) => r.nameWithOwner === commit.repository.nameWithOwner
      );

      if (repo && repo.languages && repo.languages.nodes) {
        for (let k = 0; k < repo.languages.nodes.length; k++) {
          const language = repo.languages.nodes[k];
          var found = languagesList.find((l) => l.name === language.name);

          if (found) {
            let index = languagesList.indexOf(found);
            let updated = found;
            updated.point += commit.contributions.totalCount;

            languagesList[index] = updated;
          } else {
            languagesList.push({
              name: language.name as string,
              point: commit.contributions.totalCount as number,
            } as Language);
          }
        }
      }
    }

    return languagesList;
  };
}
