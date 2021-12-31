/**
 * @description holds user controller
 */

import {
  GQLContributionsCollection,
  GQLContributionsCollectionTypeResolver,
  GQLQuery,
  GQLUser,
} from '../graphql/schema/schema.generated';
import axios from 'axios';

export class GithubUserController {
  private authorization: any;
  private url: string;

  constructor() {
    this.authorization = '';
    this.url = '';
  }

  getTotalContributions = async (username: string) => {
    const query = {} as GQLQuery;

    query.user = { login: username } as GQLUser;

    var resolver = {
      totalCommitContributions: {},
    } as GQLContributionsCollectionTypeResolver;

    console.log(query);

    // build query with resolver

    const response = await axios.post<any>(
      this.url,
      { query },
      {
        headers: { Authorization: this.authorization },
      }
    );

    console.log(response.data);
    return response.data;
  };
}
