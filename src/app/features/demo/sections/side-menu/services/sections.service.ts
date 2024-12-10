import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";

import { SectionModel } from "../models/section.model";

@Injectable({
  providedIn: "root"
})
export class SectionsService {
  private readonly _url = "assets/mocks/sections.json";
  private readonly _http: HttpClient = inject(HttpClient);

  getAll(): Observable<SectionModel[]> {
    return this._http.get<SectionModel[]>(this._url).pipe(
      delay(1000)
    );
  }
}
