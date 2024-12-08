import { NgClass } from "@angular/common";
import { Component } from "@angular/core";

import { MenuItem } from "./menu-item.model";
import { SearchComponent } from "./search.component";

@Component({
  selector: "component-side-menu",
  imports: [
    NgClass,
    SearchComponent
  ],
  templateUrl: "./side-menu.component.html"
})
export class SideMenuComponent {
  protected menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Admin",
      children: [
        { id: 11, name: "Subsection 1.1" },
        { id: 12, name: "Subsection 1.2" },
        { id: 13, name: "Subsection 1.3" }
      ]
    },
    {
      id: 2,
      name: "Content",
      children: [
        { id: 21, name: "Subsection 2.1" },
        { id: 22, name: "Subsection 2.2" },
        { id: 23, name: "Subsection 2.3" }
      ]
    },
    {
      id: 3,
      name: "Payments"
    }
  ];

  toggleExpand(item: MenuItem): void {
    item.expanded = !item.expanded;
  }
}
