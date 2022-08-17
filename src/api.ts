import fastify from 'fastify';
import { makeTimeStringHumanFriendly, sanitizeInput } from './conversion';

const server = fastify();

server.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      numericTime: {
        type: 'string',
        pattern: '^([0-2]{1})?[0-9]{1}:[0-9]{2}',
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          result: { type: 'string' },
          originalInput: { type: 'string' },
          sanitizedInput: { type: 'string' },
        },
      },
    },
  },
  handler: function (request, reply) {
    const timeRequest = (request.query as any)?.numericTime ?? new Date();
    const sanitizedInput = sanitizeInput(timeRequest);
    const result = makeTimeStringHumanFriendly(sanitizedInput);
    reply.send({
      result,
      originalInput: (request.query as any)?.numericTime ?? undefined,
      sanitizedInput: sanitizedInput,
    });
  },
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
