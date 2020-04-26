import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
const localUrl = 'assets/data/eventdata.json';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  CONTEXT_PATH = "http://event-book.com"; //Server URL
  constructor(private http: HttpClient, private _router: Router) { }

  getEvent(): Observable<any> {
    return this.http.get(localUrl, { headers: this.getHeaders() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  bookEvent(data: any): Observable<any> {
    return this.http.post(this.CONTEXT_PATH + '/book-event', data, { headers: this.getHeaders() })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  private getHeaders(): any {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return httpHeaders;
  }

  private handleResponse(res: Response) {
    return res;
  }

  private handleError = (error: any) => {
    if (error.status === 401) {
      localStorage.clear();
      this._router.navigateByUrl('/event');
      return;
    }
    return error;
  }

}
