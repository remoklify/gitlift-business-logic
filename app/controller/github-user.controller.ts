/**
 * @description holds user controller
 */

import axios from 'axios';
import { GithubUser } from '../interface/github-user.interface';
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
        u.repositoriesContributedTo?.nodes
      );
      githubUser = {
        name: u.name,
        avatar: u.avatarUrl,
        bio: u.bio,
        company: u.company,
        email: u.email,
        isDeveloperProgramMember: u.isDeveloperProgramMember,
        isGithubStar: u.isGitHubStar,
        isHireable: u.isHireable,
        totalContributionsCount:
          u.contributionsCollection.contributionCalendar.totalContributions,
        lastWeekEvents:
          u.contributionsCollection.contributionCalendar.weeks.pop(),
        languages: languages.languages,
        primaryLanguages: languages.primaryLanguages,
      } as GithubUser;
    }

    return githubUser;
  };

  getLanguagesAndPrimaryLanguages = (repositoriesContributedTo: any[]) => {
    var languagesList: any[] = [];
    var primaryLanguages: string[] = [];

    if (repositoriesContributedTo) {
      for (let i = 0; i < repositoriesContributedTo.length; i++) {
        const contributed = repositoriesContributedTo[i];
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

    languagesList = languagesList.sort((a: any, b: any) => {
      if (a.count > b.count) {
        return -1;
      }

      if (a.count < b.count) {
        return 1;
      }

      return 0;
    });

    console.log(languagesList);

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
}
