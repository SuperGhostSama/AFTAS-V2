import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<any> {
    return this.http.get(`${environment.membersApi}`);
  }

  getMemberById(id: number): Observable<any> {
    return this.http.get(`${environment.membersApi}/${id}`);
  }

  addMember(member: any): Observable<any> {
    return this.http.post(`${environment.membersApi}`, member);
  }

  updateMember(member: any, id: number): Observable<any> {
    return this.http.put(`${environment.membersApi}/${id}`, member);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${environment.membersApi}/${id}`);
  }

  searchMember(name: string): Observable<any> {
    return this.http.get(`${environment.membersApi}/search?name=${name}`);
  }
  
  getMembersByCompetitionId(competitionId: number): Observable<any> {
    const url = `${environment.membersApi}/byCompetition/${competitionId}`;
    return this.http.get(url);
  }
}
