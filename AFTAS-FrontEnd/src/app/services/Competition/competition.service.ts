import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  constructor(private http: HttpClient) {}

  getCompetitionById(id: number): Observable<any> {
    return this.http.get(`${environment.competitionsApi}/${id}`);
  }

  getAllCompetitions(): Observable<any> {
    return this.http.get(environment.competitionsApi);
  }

  getUpcomingCompetitions(): Observable<any> {
    return this.http.get(`${environment.competitionsApi}/upcoming`);
  }

  addCompetition(competitionRequest: any): Observable<any> {
    return this.http.post(environment.competitionsApi, competitionRequest);
  }

  updateCompetition(competitionRequest: any, id: number): Observable<any> {
    return this.http.put(`${environment.competitionsApi}/${id}`, competitionRequest);
  }

  deleteCompetition(id: number): Observable<any> {
    return this.http.delete(`${environment.competitionsApi}/${id}`);
  }


}
