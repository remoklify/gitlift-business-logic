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
      } as GithubUser;
    }

    return githubUser;
  };
}
