import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { MarkdownComponent } from "ngx-markdown";

import { Header, HeadersStore } from "../../store/headers.store";

@Component({
  selector: "component-markdown-viewer",
  templateUrl: "./markdown-viewer.component.html",
  imports: [
    MarkdownComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownViewerComponent  {
  markdownContent = input.required<string>();
  private readonly _headersStore = inject(HeadersStore);

  protected extractAndSetHeaders(): void {
    const headers = this.extractHeaders(this.markdownContent());
    this.addHeaderIds(headers);
    this._headersStore.setHeaders(headers);
  }

  private extractHeaders(markdown: string): Header[] {
    const lines = markdown.split("\n");
    const headers: Header[] = [];
    const headerRegex = /^(#{1,6})\s+(.+)$/;

    lines.forEach((line) => {
      const match = line.match(headerRegex);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = this.generateId(text);
        headers.push({ level, text, id });
      }
    });

    return headers;
  }

  private generateId(text: string): string {
    return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }

  private addHeaderIds(headers: Header[]): void {
    headers.forEach(header => {
      const elements = Array.from(document.querySelectorAll(`h${header.level}`));
      const element = elements.find(el => el.textContent?.trim() === header.text);
      if (element && !element.id) {
        element.id = header.id;
      }
    });
  }
}
