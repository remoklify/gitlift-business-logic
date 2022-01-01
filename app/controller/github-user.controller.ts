/**
 * @description holds user controller
 */

import axios from 'axios';
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

    return response.data;
  };
}
