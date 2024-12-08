import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, TitleStrategy } from "@angular/router";

import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { httpErrorInterceptor } from "./app/core/interceptors/http-error-inerceptor.service";
import { GlobalErrorHandler } from "./app/core/services/global-error-handler.service";
import { TitleService } from "./app/core/services/title.service";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    {
      provide: TitleStrategy,
      useClass: TitleService
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    )
  ]
}).catch(err => console.error(err));
