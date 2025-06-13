import {
  TIMER_UPDATE_EVENT,
  type TimerUpdateEvent,
  UtilsTimerSession,
} from "../../utils/timer-utils.ts";
import { type TimerSession } from "./timer-session.ts";

/**
 * Class representing a timer session.
 * This class manages a timer session, providing methods to start, stop, and reset the timer,
 * as well as event listeners for the 'timerupdate' event.
 */
class TimerSessionProvider implements TimerSession {
  // Số giây đã đếm được (ban đầu là rỗng)
  #ms = NaN;
  #idTimer: number | null = null;
  // Ai muốn biết khi thời gian thay đổi
  #listeners: ((event: TimerUpdateEvent<this>) => void)[] = [];

  #run(): void {
    this.#ms += 1000;
    const ms = UtilsTimerSession.getValue();
    // Nghi vấn: Vì sao cần so sánh với giá trị ở getValue() - localstorage?
    if (this.#ms > ms) {
      UtilsTimerSession.setValue(this.#ms);
    } else {
      this.#ms = ms;
    }

    // Báo cho mọi người biết
    this.#emitEvent(TIMER_UPDATE_EVENT);
    this.#idTimer = globalThis.setTimeout(() => {
      this.#run();
    }, 1000);
  }

  #play(): void {
    const isPlaying = this.#idTimer !== null;
    if (!isPlaying) {
      this.#ms = UtilsTimerSession.getValue();
      this.#run();
    }
  }

  #reset(): void {
    if (this.#idTimer) {
      clearTimeout(this.#idTimer);
      this.#idTimer = null;
      this.#ms = NaN;
    }
  }

  addEventListener(eventName: string, callback: (event: TimerUpdateEvent<this>) => void): void {
    if (eventName === TIMER_UPDATE_EVENT) {
      this.#listeners.push(callback);
      if (this.#listeners.length > 0) {
        this.#play();
      }
    }
  }

  removeEventListener(eventName: string, callback: (event: TimerUpdateEvent<this>) => void): void {
    if (eventName === TIMER_UPDATE_EVENT) {
      this.#listeners = this.#listeners.filter((listener) => listener !== callback);
      if (this.#listeners.length === 0) {
        this.#reset();
      }
    }
  }

  #emitEvent(eventName: string): void {
    if (eventName === TIMER_UPDATE_EVENT) {
      const event: TimerUpdateEvent<this> = {
        value: this.#ms,
        target: this,
        targetName: TimerSessionProvider.name,
      };
      this.#listeners.forEach((listener) => listener(event));
    }
  }
}

export default TimerSessionProvider;
