export const healthCheckTypeDefs = `
    type HealthCheckResponse {
        status: String!
    }

    type Query {
        healthCheck: HealthCheckResponse!
    }
`;
