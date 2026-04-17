"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EcoLens AI API',
            version: '1.0.0',
            description: 'REST API for EcoLens AI — plastic detection and eco-guidance platform. All protected endpoints require a valid Supabase JWT in the Authorization header.',
            contact: { name: 'EcoLens AI' },
        },
        servers: [
            { url: 'http://localhost:4000', description: 'Development' },
            { url: 'https://ecolens-api.onrender.com', description: 'Production' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Paste your Supabase access token here',
                },
            },
            schemas: {
                EcoGuidance: {
                    type: 'object',
                    properties: {
                        disposalInstructions: { type: 'array', items: { type: 'string' } },
                        environmentalImpact: { type: 'string' },
                        recyclabilityLabel: {
                            type: 'string',
                            enum: ['Widely Recyclable', 'Check Locally', 'Rarely Recyclable', 'Not Recyclable'],
                        },
                        decompositionYears: { type: 'string' },
                    },
                },
                ScanResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                            type: 'object',
                            properties: {
                                scanId: { type: 'string', format: 'uuid' },
                                plasticType: {
                                    type: 'string',
                                    enum: ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Other'],
                                },
                                confidenceScore: { type: 'number', minimum: 0, maximum: 1 },
                                biodegradableProbability: { type: 'number', minimum: 0, maximum: 1 },
                                recyclabilityLabel: { type: 'string' },
                                guidance: { $ref: '#/components/schemas/EcoGuidance' },
                            },
                        },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        error: {
                            type: 'object',
                            properties: {
                                code: { type: 'string' },
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map