import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ResponseModel} from "./response.model";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = req.headers;
    // paste token
    const token = localStorage.getItem("token");
    if (token) {
      headers = headers.append('Authorization', token);
    }


    // define response content type
    headers = headers.append('Accept', 'application/json');

    if (req.responseType === 'blob') {
      return next.handle(
        req.clone({headers})
      ).pipe(
        // handle response data
        map(
          event => {
            if (event instanceof HttpResponse) {
              event = event.clone({body: this.processResponseData(event.body, req.url)});
            }
            return event;
          }
        ));
    } else {
      return next.handle(
        req.clone({headers})
      ).pipe(
        // handle response data
        map(
          event => {
            if (event instanceof HttpResponse) {
              event = event.clone({body: this.processResponseData(event.body, req.url)});
            }
            return event;
          }
        ),
        // handle unauthorized request
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.showConsoleError(error.status, req.url);
            if (error.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
          return throwError(error);
        })
      );
    }
  }

  processResponseData(body: any, url: any) {
    const responseModel = new ResponseModel(body);
    if (responseModel.isError()) {
      this.showConsoleError(responseModel.error_code, url);
      throw new Error(responseModel.error_description);
    }
    return responseModel.data;
  }

  showConsoleError(status: any, url: any) {
    // console.log(`Error response ${status} from ${url}`);
  }
}
