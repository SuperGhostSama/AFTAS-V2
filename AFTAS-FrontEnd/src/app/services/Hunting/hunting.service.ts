import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HuntingService {
  constructor(private http: HttpClient) {}

  addHuntingResult(huntingRequest: any): Observable<any> {
    return this.http.post(`${environment.huntingsApi}/add-hunting-result`, huntingRequest);
  }

  getHuntingById(id: number): Observable<any> {
    return this.http.get(`${environment.huntingsApi}/${id}`);
  }

  getHuntingsByCompetition(competitionId: number): Observable<any> {
    return this.http.get(`${environment.huntingsApi}/competition/${competitionId}`);
  }

  getHuntingsByCompetitionAndMember(competitionId: number, memberId: number): Observable<any> {
    return this.http.get(`${environment.huntingsApi}/competition/${competitionId}/member/${memberId}`);
  }

  updateHunting(huntingUpdateRequest: any, id: number): Observable<any> {
    return this.http.put(`${environment.huntingsApi}/${id}`, huntingUpdateRequest);
  }

  deleteHunting(id: number): Observable<any> {
    return this.http.delete(`${environment.huntingsApi}/${id}`);
  }
}
