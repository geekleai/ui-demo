import { HttpErrorResponse,HttpInterceptorFn } from "@angular/common/http";
import { isDevMode } from "@angular/core";

import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error("HTTP error occurred:", error);
      if (isDevMode()) {
        alert(`HTTP error occurred: ${error.status} ${error.statusText}`);
      }

      return throwError(() => error);
    })
  );
};
