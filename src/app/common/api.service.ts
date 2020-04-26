import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const localUrl = 'assets/data/eventdata.json';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


constructor(private http: HttpClient) { }


getEvent() {
  return this.http.get(localUrl);
}


}
