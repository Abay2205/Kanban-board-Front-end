import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
// import 'rxjs-compat/add/operator/map';
import {Store} from '@ngxs/store';
import {Observable} from "rxjs";

// For set token to header for <img src...
@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) {
  }

  transform(url: string): Observable<SafeUrl> {
    return this.http.get(url, {responseType: 'blob'}).pipe(map(val => {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val));
    }));
  }
}
