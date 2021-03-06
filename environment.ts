import { DbArgs, EnvArgs, MqArgs, TokenArgs } from '@open-template-hub/common';

export class Environment {
  constructor(private _args: EnvArgs = {} as EnvArgs) {
    var tokenArgs = {
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
      responseEncryptionSecret: process.env.RESPONSE_ENCRYPTION_SECRET,
    } as TokenArgs;

    var dbArgs = {
      mongoDbConnectionLimit: process.env.MONGODB_CONNECTION_LIMIT,
      mongoDbUri: process.env.MONGODB_URI,
    } as DbArgs;

    var mqArgs = {
      messageQueueConnectionUrl: process.env.CLOUDAMQP_URL,
      businessLogicServerMessageQueueChannel:
        process.env.BUSINESS_LOGIC_SERVER_QUEUE_CHANNEL,
      orchestrationServerMessageQueueChannel:
        process.env.ORCHESTRATION_SERVER_QUEUE_CHANNEL,
    } as MqArgs;

    this._args = {
      tokenArgs,
      dbArgs,
      mqArgs,
    } as EnvArgs;
  }

  args = () => {
    return this._args;
  };
}
