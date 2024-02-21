import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(private http: HttpClient) {}

  getRankingsByMemberIdAndCompetitionId(competitionId: number, memberId: number): Observable<any> {
    return this.http.get(`${environment.rankingsApi}/${competitionId}/${memberId}`);
  }

  updateRanking(updateRankingRequestDTO: any, competitionId: number, memberId: number): Observable<any> {
    return this.http.put(`${environment.rankingsApi}/${competitionId}/${memberId}`, updateRankingRequestDTO);
  }

  registerMemberForCompetition(ranking: any): Observable<any> {
    return this.http.post(`${environment.rankingsApi}/register`, ranking);
  }

  getTop3RankingsByCompetitionId(competitionId: number): Observable<any> {
    return this.http.get(`${environment.rankingsApi}/top3/${competitionId}`);
  }
}
