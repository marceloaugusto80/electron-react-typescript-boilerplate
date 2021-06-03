/**
 * Defined in jest.config.ts, "globalTeardown" property.
 */
export default function teardown(): Promise<void> {
    console.log("\n## Global teardown executed.");
    return Promise.resolve();
}