import { client } from './apiGatewayClient';

let id = 0;

export default {
  parse(text) {
    return [
      {
        type: 'message',
        unstructured: {
          id,
          text,
          timestamp: Date.now(),
        },
      },
    ];
  },
  async send(text) {
    if (!client) {
      Promise.reject(new Error('Please init client before making requests'));
    }

    const pathTemplate = '/chatbot';
    const messages = [
      {
        type: 'message',
        unstructured: {
          id,
          text,
          timestamp: Date.now(),
        },
      },
    ];
    id += 1;

    return client.invokeApi({}, pathTemplate, 'POST', {}, { messages });
  },
};
