import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

import { SectionModel } from "../models/section.model";
import { SectionsService } from "../services/sections.service";
import { SearchComponent } from "./search.component";

interface MenuItem {
  name: string;
  children?: MenuItem[];
  expanded?: boolean;
  path?: string;
}

@Component({
  selector: "component-side-menu",
  templateUrl: "./side-menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, SearchComponent]
})
export class SideMenuComponent implements OnInit {
  protected menuItems: WritableSignal<MenuItem[] | undefined> = signal<MenuItem[] | undefined>(undefined);
  protected currentUrl: WritableSignal<string> = signal("");
  private readonly _sectionsService = inject(SectionsService);
  private readonly _router = inject(Router);
  private readonly _menuItemsLoaded$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this._sectionsService.getAll().subscribe(sections => {
      const menuItems: MenuItem[] = this.buildMenuItems(sections);
      const decodedUrl = decodeURIComponent(this._router.url);
      this.menuItems.set(menuItems);
      this.currentUrl.set(decodedUrl); // Set the initial URL
      this.updateMenuBasedOnUrl(decodedUrl);
    });
  }

  protected selectMenuItem(item: MenuItem): void {
    if (!item.children) {
      // Only navigate if it's a leaf item
      this._router.navigate(["/demo" + item.path]);
      // Update the currentUrl manually
      this.currentUrl.set("/demo" + item.path);
    } else {
      // Toggle the expanded state for non-leaf items
      item.expanded = !item.expanded;
    }
  }

  protected isItemHighlighted(item: MenuItem): boolean {
    return this.currentUrl().endsWith(item.path!);
  }

  private buildMenuItems(sections: SectionModel[], parentPath: string = ""): MenuItem[] {
    return sections.map(section => {
      const pathSegment = section.name.toLowerCase().replace(/\s+/g, "-");
      const path = `${parentPath}/${encodeURIComponent(pathSegment)}`;
      return {
        name: section.name,
        children: section.subSections ? this.buildMenuItems(section.subSections, path) : undefined,
        path: path,
        expanded: false
      };
    });
  }

  private updateMenuBasedOnUrl(url: string): void {
    this.currentUrl.set(url);

    if (this.menuItems()!.length === 0) {
      return;
    }

    const pathSegments = url.split("/").filter(segment => segment !== "" && segment !== "demo")
      .map(segment => decodeURIComponent(segment));

    const expandMenuItems = (items: MenuItem[], depth: number = 0): boolean => {
      if (depth >= pathSegments.length) {
        return false;
      }

      const segment = pathSegments[depth];
      const matchingItem = items.find(item => {
        const itemPathSegment = item.path!.split("/").pop() || "";
        return itemPathSegment.toLowerCase() === segment.toLowerCase();
      });

      if (matchingItem) {
        matchingItem.expanded = true;
        if (matchingItem.children) {
          return expandMenuItems(matchingItem.children, depth + 1);
        }
        return true; // Found and expanded a matching item
      }
      return false;
    };

    const itemSelected = expandMenuItems(this.menuItems()!);

    if (!itemSelected) {
      if (pathSegments.length > 0) {
        // If URL has segments but no matching item was found, expand to the deepest possible level
        this.expandToDeepestMatch(this.menuItems()!, pathSegments);
      } else if (this.menuItems()!.length > 0) {
        // If no item was selected and there are menu items, select the first one
        const firstItem = this.findFirstSelectableItem(this.menuItems()!);
        if (firstItem) {
          this._router.navigate(["/demo" + firstItem.path]);
          this.currentUrl.set("/demo" + firstItem.path);
        }
      }
    }

    this.menuItems.set([...this.menuItems()!]);
  }

  private expandToDeepestMatch(items: MenuItem[], pathSegments: string[], depth: number = 0): boolean {
    if (depth >= pathSegments.length) {
      return true;
    }

    const segment = pathSegments[depth];
    const matchingItem = items.find(item => {
      const itemPathSegment = item.path!.split("/").pop() || "";
      return itemPathSegment.toLowerCase() === segment.toLowerCase();
    });

    if (matchingItem) {
      matchingItem.expanded = true;
      if (matchingItem.children) {
        return this.expandToDeepestMatch(matchingItem.children, pathSegments, depth + 1);
      }
      return true;
    }
    return false;
  }

  private findFirstSelectableItem(items: MenuItem[]): MenuItem | null {
    for (const item of items) {
      if (!item.children) {
        return item; // This is a leaf item, so it's selectable
      }
      const selectableChild = this.findFirstSelectableItem(item.children);
      if (selectableChild) {
        return selectableChild;
      }
    }
    return null; // No selectable item found
  }
}
