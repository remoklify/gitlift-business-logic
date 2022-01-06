/**
 * @description holds github user interface
 */

import { Achievement } from './achievement.interface';
import { Contribution } from './contribution.interface';
import { CoreInformation } from './core-information.interface';
import { PersonalInformation } from './personal-information.interface';

export interface GithubUser {
  coreInformation: CoreInformation;
  personalInformation: PersonalInformation;
  achievement: Achievement;
  contribution: Contribution;
}
