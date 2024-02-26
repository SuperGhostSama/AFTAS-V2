import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/Member/member.service';
import { NotificationService } from 'src/app/services/Notification/notification.service';

@Component({
  selector: 'app-member-verification',
  templateUrl: './member-verification.component.html',
  styleUrls: ['./member-verification.component.css']
})
export class MemberVerificationComponent {
  notVerifiedMembers: any[] = [];
  selectedMemberId: number | null = null;

  constructor(
    private memberService: MemberService,
    private notification : NotificationService,
    private router: Router
    
    ) {}

  ngOnInit(): void {
    this.fetchNotVerifiedMembers();
  }

  fetchNotVerifiedMembers(): void {
    this.memberService.getAllMembersNotVerified().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.notVerifiedMembers = response.data;
        } else {
          console.error('Error fetching not verified members:', response.message);
          this.notification.show([response.message], 'error');
        }
      },
      (error) => {
        console.error('Error fetching not verified members:', error);
        this.notification.show([error.error.message], 'error');

      }
    );
  }


  onSubmit(): void {
    console.log('Member selected for verification:', this.selectedMemberId);
    if (this.selectedMemberId !== null) {
      this.memberService.enableMemberAccount(this.selectedMemberId).subscribe(
        (response: any) => {
          if (response.status === 200) {
            console.log('Member account enabled successfully:', response.data);
            this.notification.show(['Member account enabled successfully'], 'success');

            this.router.navigate(['/Verification']);
          } else {
            console.error('Error enabling member account:', response.message);
            this.notification.show([response.message], 'error');
          }
        },
        (error) => {
          console.error('Error enabling member account:', error);
          this.notification.show([error.error.message], 'error');
        }
      );
    } else {
      console.warn('No member selected for verification.');
      this.notification.show(['No member selected for verification'], 'warning');
    }
  }


}
