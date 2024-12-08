import { NgModule } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

@NgModule()
export class FontAwesomeSolidIconsConfigurationModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faUser
    );
  }
}
