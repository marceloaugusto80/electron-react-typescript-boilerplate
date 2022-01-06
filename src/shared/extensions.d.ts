import { SharedContext } from "./SharedContext";

export {}; // turns this file into a module

// extends the window global object in the renderer context.
// defined in src/main/preload.ts
declare global {
    
    interface Window {
        sharedContext: SharedContext;
    }
}
