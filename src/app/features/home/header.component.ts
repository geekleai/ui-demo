import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "component-header",
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: "./header.component.html"
})
export class HeaderComponent {

}
