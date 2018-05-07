import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ConfigPanelComponent } from './config-panel/config-panel.component';
import { Color, Side } from './models/enums.module';
import { Player } from './models/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private initTime = new Date(0, 0, 0, 0, 5, 0, 0);
  private gameOverAudio: HTMLAudioElement;

  black: Player;
  white: Player;
  turn: Color;
  gameOver: boolean;
  side = Side.One;
  paused = true;
  private onGameOver = () => {
    this.paused = true;
    this.gameOver = true;
    this.gameOverAudio.play();
  }

  constructor(private modalService: NgbModal) {
    this.gameOverAudio = new Audio('../assets/sounds/alarm2.mp3');
    this.gameOverAudio.load();
    this.initGame();
  }

  initGame() {
    this.gameOver = false;
    this.black = new Player(this.initTime, this.onGameOver);
    this.white = new Player(this.initTime, this.onGameOver);
    this.turn = null;
    this.paused = true;
  }

  changeTurn() {
    if (!this.turn) {
      this.turn = Color.White;
      this.white.startClock();
    } else {
      this[this.turn].stopClock();
      this.turn = this.turn === Color.Black ? Color.White : Color.Black;
      this[this.turn].startClock();
    }
  }

  switchSides() {
    this.side = this.side === Side.One ? Side.Two : Side.One;
  }

  pauseResumeToggle() {
    if (this.paused) {
      if (this.gameOver) {
        this.resetGame();
      }
      if (!this.turn) {
        this.turn = Color.White;
      }
      this[this.turn].startClock();
    } else {
      this[this.turn].stopClock();
    }
    this.paused = !this.paused;
  }

  resetGame() {
    this.black.stopClock();
    this.white.stopClock();
    this.initGame();
  }

  openConfigPanel() {
    const modalRef = this.modalService.open(ConfigPanelComponent);
    modalRef.componentInstance.time = {
      hour: 0,
      minute: this.initTime.getMinutes(),
      second: this.initTime.getSeconds()
    };
    modalRef.result.then((time: NgbTimeStruct) => {
      this.initTime = new Date(0, 0, 0, 0, time.minute , time.second, 0);
      if (this.paused && !this.turn) {
        this.resetGame();
      }
    });
  }
}
