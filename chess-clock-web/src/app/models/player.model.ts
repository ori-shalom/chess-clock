export class Player {
  time: Date;
  timer: NodeJS.Timer;
  last30seconds = false;
  onGameOver: () => void;
  onSecondPassOnLast30seconds: (seconds: number) => void;

  constructor(time: Date,
        onGameOver: () => void = () => {},
        onSecondPassOnLast30seconds: (seconds: number) => void = () => {}) {
    this.time = time;
    this.onGameOver = onGameOver;
    this.onSecondPassOnLast30seconds = onSecondPassOnLast30seconds;
    this.last30seconds = this.time.getMinutes() <= 0 && this.time.getSeconds() <= 30;
  }

  startClock() {
    const clicked = new Date().getTime() + this.time.getTime();
    let seconds;
    this.timer = setInterval(() => {
      const tempTime = new Date(clicked - new Date().getTime());
      this.last30seconds = this.last30seconds || (tempTime.getMinutes() <= 0 && tempTime.getSeconds() <= 30);
      if (tempTime.getHours() === 23 && tempTime.getMinutes() === 59 && tempTime.getSeconds() === 59) {
        this.stopClock();
        this.onGameOver();
        return;
      }
      this.time = tempTime;
      if (this.last30seconds && seconds !== tempTime.getSeconds()) {
        seconds = tempTime.getSeconds();
        this.onSecondPassOnLast30seconds(seconds);
      }
    }, 10);
  }

  stopClock() {
    clearInterval(this.timer);
  }
}
