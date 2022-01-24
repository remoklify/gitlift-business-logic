import { Language } from './language.interface';

export interface Contribution {
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  totalRepositoryContributions: number;
  totalContributionsCount: number;
  totalStargazerCount: number;
  totalForkCount: number;
  totalFollowersCount: number;
  lastWeekEvents: any;
  languages: Language[];
}
