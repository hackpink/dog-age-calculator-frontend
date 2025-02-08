import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  endpoint = 'http://localhost:8080/calculate';

  constructor(private http: HttpClient) { }

  // A dogAgeToHumanAge metódus egy Observable-t ad vissza,
  // ami egy HTTP POST kérést indít a megadott végpont felé.
  dogAgeToHumanAge(dogAge: number): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.endpoint,
      { dogAge: dogAge },
      {
        headers: { 'Content-Type': 'application/json' },
        observe: 'response'
      }
    );
  }


}
