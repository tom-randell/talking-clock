"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const conversion_1 = require("./conversion");
const server = (0, fastify_1.default)();
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
        var _a, _b, _c, _d;
        const timeRequest = (_b = (_a = request.query) === null || _a === void 0 ? void 0 : _a.numericTime) !== null && _b !== void 0 ? _b : new Date();
        const sanitizedInput = (0, conversion_1.sanitizeInput)(timeRequest);
        const result = (0, conversion_1.makeTimeStringHumanFriendly)(sanitizedInput);
        reply.send({
            result,
            originalInput: (_d = (_c = request.query) === null || _c === void 0 ? void 0 : _c.numericTime) !== null && _d !== void 0 ? _d : undefined,
            sanitizedInput: sanitizedInput,
        });
    },
});
server.listen({ host: '0.0.0.0', port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=api.js.map