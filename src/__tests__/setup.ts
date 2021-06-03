/**
 * Defined in jest.config.ts, "globalSetup" property.
 */
export default function setup():Promise<void> {
    console.log("\n\n## Global setup executed\n");
    return Promise.resolve();
}