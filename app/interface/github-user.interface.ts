/**
 * @description holds github user interface
 */

export interface GithubUser {
  name: string;
  avatar: string;
  bio: string;
  company: string;
  email: string;
  isDeveloperProgramMember: boolean;
  isGithubStar: boolean;
  isHireable: boolean;
  totalContributionsCount: number;
  languages: string[];
  primaryLanguages: string[];
}
