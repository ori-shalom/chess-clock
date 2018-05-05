import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ConfigPanelComponent } from './config-panel/config-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  initTime = new Date(0, 0, 0, 0, 5, 0, 0);

  black: Player;
  white: Player;

  turn: Players;
  side = Sides.One;
  paused = true;

  constructor(private modalService: NgbModal) {
    this.black = new Player(this.initTime);
    this.white = new Player(this.initTime);
  }

  changeTurn() {
    if (!this.turn) {
      this.turn = Players.White;
      this.white.startClock();
    } else {
      this[this.turn].stopClock();
      this.turn = this.turn === Players.Black ? Players.White : Players.Black;
      this[this.turn].startClock();
    }
  }
  switchSides() {
    this.side = this.side === Sides.One ? Sides.Two : Sides.One;
  }

  pauseResumeToggle() {
    if (this.paused) {
      if (!this.turn) {
        this.turn = Players.White;
      }
      this[this.turn].startClock();
    } else {
      this[this.turn].stopClock();
    }
    this.paused = !this.paused;
  }

  reset() {
    this.black.stopClock();
    this.white.stopClock();
    this.black = new Player(this.initTime);
    this.white = new Player(this.initTime);
    this.turn = null;
    this.paused = true;
  }

  open() {
    const modalRef = this.modalService.open(ConfigPanelComponent);
    modalRef.componentInstance.time = {
      hour: 0,
      minute: this.initTime.getMinutes(),
      second: this.initTime.getSeconds()
    };
    modalRef.result.then((time: NgbTimeStruct) => {
      this.initTime = new Date(0, 0, 0, 0, time.minute , time.second, 0);
      if (this.paused && !this.turn) {
        this.reset();
      }
    });
  }
}
enum Players {
  Black = 'black',
  White = 'white'
}

enum Sides {
  One = 1,
  Two = 2
}

class Player {
  time: Date;
  timer: NodeJS.Timer;

  constructor(time: Date) {
    this.time = time;
  }

  startClock() {
    const clicked = new Date().getTime() + this.time.getTime();
    this.timer = setInterval(() => {
      this.time = new Date(clicked - new Date().getTime());
    }, 10);
  }
  stopClock() {
    clearInterval(this.timer);
  }
}
