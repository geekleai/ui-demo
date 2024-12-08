import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { HeaderComponent } from "./header.component";

@Component({
  selector: "component-home",
  templateUrl: "./home.component.html",
  imports: [
    HeaderComponent,
    RouterLink
  ]
})
export class HomeComponent {

}
