import { makeAutoObservable, observable, computed } from "mobx";

export class UiState {
  language = "en_US";
  pendingRequestCount = 0;
}
