/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type {Config} from 'jest';

const config: Config = {
    // testes serão pausados com o primeiro erro detectado
    bail: true, 
    // busca testes a partir de src -qualquerpasta**/**qualquerarquivo.spec.js */
    testMatch: [ // spec == test
      "<rootDir>/dist/js/**/*.spec.js",
    ],
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
};

export default config;
