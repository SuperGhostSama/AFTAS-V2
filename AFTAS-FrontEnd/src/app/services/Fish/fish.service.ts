import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FishService {
  constructor(private http: HttpClient) {}

  getFishById(id: number): Observable<any> {
    return this.http.get(`${environment.fishesApi}/${id}`);
  }

  getAllFishes(): Observable<any> {
    return this.http.get(environment.fishesApi);
  }

  addFish(fishRequest: any): Observable<any> {
    return this.http.post(environment.fishesApi, fishRequest);
  }

  updateFish(fishRequest: any, id: number): Observable<any> {
    return this.http.put(`${environment.fishesApi}/${id}`, fishRequest);
  }

  deleteFish(id: number): Observable<any> {
    return this.http.delete(`${environment.fishesApi}/${id}`);
  }
}
