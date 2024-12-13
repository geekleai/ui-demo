import { computed, Injectable } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

export interface Header {
  level: number;
  text: string;
  id: string;
}

interface HeadersState {
  headers: Header[];
}

const initialState: HeadersState = {
  headers: []
};

@Injectable()
export class HeadersStore extends signalStore(
  withState(initialState),
  withMethods((store) => ({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    setHeaders(headers: Header[]) {
      patchState(store, { headers });
    }
  })),
  withComputed((state) => ({
    sortedHeaders: computed(() =>
      [...state.headers()].sort((a, b) => a.level - b.level)
    )
  }))
) {}
