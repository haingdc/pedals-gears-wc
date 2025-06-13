import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./components/stop-watch/stop-watch.ts";
import {
  TimerSessionConsumer,
  TimerSessionProvider,
  type TimerSessionService,
} from "./services/timer-session/index.ts";
import WindowStateManager, {
  UtilsWindowArray,
  WINDOW_STATE_MANAGER_EVENT,
  WINDOW_UPDATE_EVENT,
  type WindowUpdateEvent,
} from "./services/window-state-manager-service.ts";
import {
  TIMER_UPDATE_EVENT,
  type TimerUpdateEvent,
  UtilsTimerSession,
} from "./utils/timer-utils.ts";

@customElement("timer-session")
class TimerSession extends LitElement {
  @state()
  private _ms = NaN;
  @state()
  private _timer: TimerSessionService | null = null;

  @state()
  private _windowStateManager: WindowStateManager;

  constructor() {
    super();
    this._windowStateManager = WindowStateManager.getInstance();
  }

  override connectedCallback() {
    super.connectedCallback();
    this._windowStateManager.addEventListener(WINDOW_UPDATE_EVENT, this.handleWindowUpdate);
    this._windowStateManager.addEventListener(
      WINDOW_STATE_MANAGER_EVENT.WINDOW_DEACTIVATE_EVENT,
      this.handleWindowDeactivate,
    );
  }

  private handleWindowDeactivate = () => {
    UtilsWindowArray.dropWindowArray();
    UtilsTimerSession.dropValue();
  };

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._windowStateManager.removeEventListener(WINDOW_UPDATE_EVENT, this.handleWindowUpdate);
    this._windowStateManager.removeEventListener(
      WINDOW_STATE_MANAGER_EVENT.WINDOW_DEACTIVATE_EVENT,
      this.handleWindowDeactivate,
    );
    if (this._timer) {
      this._timer.removeEventListener(TIMER_UPDATE_EVENT, this.handleTimerUpdate);
    }
  }

  private handleWindowUpdate = (evt: WindowUpdateEvent) => {
    if (evt.isMainWindow) {
      this.setTimer(new TimerSessionProvider());
    } else {
      this.setTimer(new TimerSessionConsumer());
    }
  };

  private setTimer(value: TimerSessionService | null) {
    const oldValue = this._timer;
    if (oldValue) {
      oldValue.removeEventListener(TIMER_UPDATE_EVENT, this.handleTimerUpdate);
    }
    this._timer = value;
    if (this._timer) {
      this._timer.addEventListener(TIMER_UPDATE_EVENT, this.handleTimerUpdate);
    }
  }

  private handleTimerUpdate = (
    evt: TimerUpdateEvent<TimerSessionService>,
  ) => {
    this._ms = evt.value;
    this.requestUpdate();
  };

  override render() {
    const error_nan = isNaN(this._ms);
    const error_supporting_zero = this._timer instanceof TimerSessionConsumer && this._ms === 0;
    if ([error_nan, error_supporting_zero].includes(true)) {
      return html`

      `;
    }
    return html`
      <stop-watch
        .value="${this._ms}"
        class="stop-watch"
      >
      </stop-watch>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "timer-session": TimerSession;
  }
}

export default TimerSession;
