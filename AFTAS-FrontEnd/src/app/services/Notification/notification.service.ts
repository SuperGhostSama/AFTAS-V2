import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new BehaviorSubject<{ messages: string[], type: 'success' | 'warning' | 'error' } | null>(null);

  public notification$ = this.notificationSubject.asObservable()


  public show(messages: string[], type: 'success' | 'warning' | 'error' = 'success'){
    this.notificationSubject.next({messages, type});
  }
  
}
