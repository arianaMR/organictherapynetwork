import currentEnvironment from '../../constants/currentEnvironment';
import { Env } from './base';
import dev from './dev';
// had to rename this so jest would ignore this file. razzle does nto currently support ignor patterns with jest
import test from './testEnv';
import stage from './stage';
import shadow from './shadow';
import smoke from './smoke';
import prod from './prod';

const environments = {
  dev,
  test,
  stage,
  shadow,
  smoke,
  prod,
};

const env: Env = environments[currentEnvironment];

export default env;
