import { NgModule } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faCheck, faPencil, faSearch, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";

@NgModule()
export class FontAwesomeSolidIconsConfigurationModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faUser,
      faSearch,
      faSpinner,
      faCheck,
      faPencil
    );
  }
}
