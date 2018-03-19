import apigClientFactory from 'aws-api-gateway-client';

export let client; // eslint-disable-line import/no-mutable-exports

export const init = (accessKey, secretKey, sessionToken) => {
  if (!client) {
    const clientConfig = {
      accessKey,
      secretKey,
      sessionToken,
      region: process.env.VUE_APP_AWS_REGION,
      invokeUrl: 'https://h7vip797qj.execute-api.us-west-2.amazonaws.com/beta',
    };
    client = apigClientFactory.newClient(clientConfig);
  }
};
