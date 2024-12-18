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

    headers.filter(header => header.level > 1).forEach(header => {
      const elements = Array.from(document.querySelectorAll(`h${header.level}`));
      const element = elements.find(el => el.textContent?.trim() === header.text);
      if (element) {
        const html = `
        <span class="ml-1 inline-flex items-center">
         <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg>
         <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil" class="svg-inline--fa fa-pencil text-sm ml-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
        </span>
      `;
        element.innerHTML = element.textContent + html;
      }
    });
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
