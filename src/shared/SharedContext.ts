/**
 * Just an example interface to share information between main process and renderer process.
 */
export interface SharedContext {
    getSomeData(): any;
    setSomeData(data: any): void;
}