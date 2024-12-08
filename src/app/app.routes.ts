import { Routes } from "@angular/router";

import { DemoComponent } from "./features/demo/demo.component";
import { HomeComponent } from "./features/home/home.component";

export const routes: Routes = [
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "demo", component: DemoComponent, title: "Demo" },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];
