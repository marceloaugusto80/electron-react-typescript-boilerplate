type TimerCallback = (n: number) => void;

/**
 * Just an example class.
 */
export default class ExampleCoreLogic {

    private readonly _onTickCallback: TimerCallback;
    private intervalRef: NodeJS.Timeout | null;
    n: number;

    constructor(onTickCallback: TimerCallback) {
        this._onTickCallback = onTickCallback;
        this.intervalRef = null;
        this.n = 0;
        
    }

    run(): void {
        if(!this.intervalRef) {
            this.intervalRef = setInterval(() => {
                this._onTickCallback(++this.n);
            }, 1000);
        }
       
    }

    stop() {
        if(this.intervalRef)
            clearInterval(this.intervalRef);
    }

}