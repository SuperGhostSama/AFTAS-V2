import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MemberService } from 'src/app/services/Member/member.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent {
  member: any = {}; 

  constructor(private memberService: MemberService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.memberService.addMember(this.member).subscribe(
        (response) => {
          console.log('Member added successfully:', response);
          location.reload();
        },
        (error) => {
          console.error('Error adding member:', error);
        }
      );
    }
  }

  
}
