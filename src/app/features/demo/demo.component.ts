import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { InteractiveComponent } from "./sections/interactive/interactive.component";
import { MarkdownSectionComponent } from "./sections/markdown/markdown.component";
import { SideMenuComponent } from "./sections/side-menu/side-menu.component";

@Component({
  selector: "component-demo",
  imports: [
    SideMenuComponent,
    MarkdownSectionComponent,
    InteractiveComponent
  ],
  templateUrl: "./demo.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit {
  protected markdownContent!: string;

  ngOnInit(): void {
    this.getMarkdown();
  }

  getMarkdown(): void {
    // open markdown content from assets markdown.md
    fetch("assets/markdown-template2.md")
      .then(response => response.text())
      .then(data => {
        this.markdownContent = data;
      })
      .catch(error => console.error("Error fetching markdown:", error));
  }
}
