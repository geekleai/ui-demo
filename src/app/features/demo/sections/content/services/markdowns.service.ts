import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MarkdownsService {
  private readonly _introTemplatePath = "assets/markdowns/intro.md";
  private readonly _defaultTemplatePath = "assets/markdowns/markdown-template.md";
  private readonly _withCodeTemplatePath = "assets/markdowns/markdown-template2.md";
  private readonly _http: HttpClient = inject(HttpClient);

  get(sectionName: string): Observable<string> {
    return this._http.get(this.getTemplatePath(sectionName), { responseType: "text" }).pipe(
      delay(2000),
      map(template => this.processTemplate(template, sectionName))
    );
  }

  private processTemplate(template: string, sectionName: string): string {
    sectionName = this.processSectionName(sectionName);

    const regex = new RegExp(`\\{\\{SECTION_NAME\\}\\}`, "g");
    const processedTemplate = template.replace(regex, sectionName);
    /* for (const [key, value] of Object.entries(replacements)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
      processedTemplate = processedTemplate.replace(regex, value);
    } */
    return processedTemplate;
  }

  private processSectionName(sectionName: string): string {
    const words = sectionName.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(" ");
  }

  /**
   * Gets the path to the template based on the given section name.
   * If the first letter of the section name is before "m", returns the path to the template without code.
   * Otherwise, returns the path to the template with code.
   * This is done for the demo purposes.
   * @param {string} sectionName The name of the section.
   * @returns {string} The path to the template.
   */
  private getTemplatePath(sectionName: string): string {
    if(sectionName.toLowerCase() === "introduction") {
      return this._introTemplatePath;
    } else {
      const firstLetter = sectionName.charAt(0).toLowerCase();
      return firstLetter < "m" ? this._defaultTemplatePath : this._withCodeTemplatePath;
    }
  }
}
