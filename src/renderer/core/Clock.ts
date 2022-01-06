type TimerCallback = (arg0: string) => void;

export default class Clock {

    private readonly _onTickCallback: TimerCallback;
    private intervalRef: NodeJS.Timeout | null;

    constructor(onTickCallback: TimerCallback) {
        this._onTickCallback = onTickCallback;
        this.intervalRef = null;
        
    }

    run(): void {
        if(!this.intervalRef) {
            this.intervalRef = setInterval(() => {
                let now = new Date();
                this._onTickCallback(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
            }, 1000);
        }
       
    }

    stop() {
        if(this.intervalRef)
            clearInterval(this.intervalRef);
    }

}