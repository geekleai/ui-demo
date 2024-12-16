import { NgModule } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

@NgModule()
export class FontAwesomeRegularIconsConfigurationModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faUser
    );
  }
}
