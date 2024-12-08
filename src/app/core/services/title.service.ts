import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class TitleService extends TitleStrategy {
  private readonly _titleService = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot): void {
    this.setTitle(this.buildTitle(routerState));
  }

  setTitle(newTitle: string | undefined): void {
    if (newTitle) {
      this._titleService.setTitle(`Geekle AI - ${newTitle}`);
    } else {
      this._titleService.setTitle("Geekle AI");
    }

  }
}
