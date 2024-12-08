import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { FontAwesomeIconLibraryModule } from "./shared/modules/font-awesome/font-awesome-icon-library.module";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, FontAwesomeIconLibraryModule],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>`
})
export class AppComponent {
  title = "Geekle_AI_Demo";
}

