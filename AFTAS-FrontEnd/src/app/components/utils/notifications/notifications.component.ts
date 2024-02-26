import { Component } from '@angular/core';
import { NotificationService } from '../../../services/Notification/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  public messages : string[] = [];

  public type : 'success' | 'warning' | 'error' = 'success';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(){

    this.notificationService.notification$.subscribe(
      (notification) => {
        if(notification){
          this.messages = notification.messages;
          this.type = notification.type;
          setTimeout(() => this.closeNotification() , 6000 )
        }
      }
    )


  }

  closeNotification(){
    this.messages = [];
    this.type = 'success';
  }

}
