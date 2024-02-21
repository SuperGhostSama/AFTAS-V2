import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  constructor(private http: HttpClient) {}

  getLevelById(id: number): Observable<any> {
    return this.http.get(`${environment.levelsApi}/${id}`);
  }

  getAllLevels(): Observable<any> {
    return this.http.get(`${environment.levelsApi}`);
  }

  addLevel(level: any): Observable<any> {
    return this.http.post(`${environment.levelsApi}`, level);
  }

  updateLevel(level: any, id: number): Observable<any> {
    return this.http.put(`${environment.levelsApi}/${id}`, level);
  }

  deleteLevel(id: number): Observable<any> {
    return this.http.delete(`${environment.levelsApi}/${id}`);
  }
}
