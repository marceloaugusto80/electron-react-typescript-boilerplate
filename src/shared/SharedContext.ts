/**
 * Just an example interface to share information between main process and renderer process.
 * 
 * Defined in ./src/main/preload.ts
 */
export interface SharedContext {
    getSomeData(): any;
    setSomeData(data: any): void;
}