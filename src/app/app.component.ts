import {Component} from '@angular/core';
import {ImageSelector} from "./imageSelector";
import * as Promise from "bluebird"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private imageTimerId: NodeJS.Timeout | null = null;
  private imageTimerMilliseconds: number = 300_000

  private docHasFocus: boolean = false;

  public title: string = "YAIVR"

  constructor(public imageSelector: ImageSelector) {
    Promise.longStackTraces();
    window.addEventListener("keydown", (event) => this.processKey(event))
    window.addEventListener("blur", (_) => this.loseFocus());
  }

  updateSubreddit(sub: string) {
    console.log(`Updated sub to ${sub}`)
    this.imageSelector.setSubreddit(sub)
    this.resetImageTimer();
  }

  doClick() {
    if (!this.docHasFocus) {
      this.docHasFocus = true;
      return;
    }
    this.imageSelector.nextImage();
  }

  /** Resets the timer that controls flipping to the next image. */
  resetImageTimer() {
    if (this.imageTimerId) {
      clearTimeout(this.imageTimerId)
      this.imageTimerId = null;
    }
    this.imageTimerId = setTimeout(() => {
      this.imageTimerId = null;
      this.imageSelector.nextImage()
    }, this.imageTimerMilliseconds)
  }

  processKey(event: KeyboardEvent): any {
    console.log("Key event: ")
    console.log(event)
    if (event.key == 'ArrowLeft') {
      this.imageSelector.nextImage()
    }
    if (event.key == 'ArrowRight') {
      this.imageSelector.nextImage();
    }
  }

  loseFocus() {
    this.docHasFocus = false;
  }
}
