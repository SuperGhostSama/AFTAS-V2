import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //transfer the selectedCompetitionId
  private selectedCompetitionIdSubject = new Subject<string>();

  getSelectedCompetitionIdSubject(): Subject<string> {
    return this.selectedCompetitionIdSubject;
  }

  setSelectedCompetitionId(id: string): void {
    this.selectedCompetitionIdSubject.next(id);
  }

  //Transfer the event from members component to add member competition component
  private triggerFetch = new Subject<void>();

  // Observable to notify subscribers when to trigger fetch
  triggerFetch$ = this.triggerFetch.asObservable();

  // Method to trigger fetch
  triggerFetchData(): void {
    this.triggerFetch.next();
  }
}
