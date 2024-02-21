import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/SharedServices/shared.service';
import { MemberService } from 'src/app/services/Member/member.service';
import { CompetitionService } from 'src/app/services/Competition/competition.service';
import { RankingService } from 'src/app/services/Ranking/ranking.service';

declare var $: any;

@Component({
  selector: 'app-add-member-competition',
  templateUrl: './add-member-competition.component.html',
  styleUrls: ['./add-member-competition.component.css']
})
export class AddMemberCompetitionComponent implements OnDestroy {
  private subscription: Subscription;
  competitions: any[] = [];
  members: any[] = [];
  selectedCompetitionId: string = '';
  selectedMemberId: string = '';

  constructor(
    private sharedService: SharedService,
    private memberService: MemberService,
    private competitionService: CompetitionService,
    private rankingService: RankingService
  ) {
    // Subscribe to the trigger to perform fetch
    this.subscription = this.sharedService.triggerFetch$.subscribe(() => {
      this.fetchCompetitionsAndMembers();
    });
  }

  // Method to fetch competitions and members
  fetchCompetitionsAndMembers(): void {
    this.competitionService.getAllCompetitions().subscribe(
      (competitions) => {
        this.competitions = competitions.data;
      },
      (error) => {
        console.error('Error fetching competitions:', error);
      }
    );

    this.memberService.getAllMembers().subscribe(
      (members) => {
        this.members = members.data;
      },
      (error) => {
        console.error('Error fetching members:', error);
      }
    );
  }

  saveChanges(): void {
    // Add your logic to save the selected competition and member
    console.log('Selected Competition ID:', this.selectedCompetitionId);
    console.log('Selected Member ID:', this.selectedMemberId);

    // Create a ranking object with the selected competition and member
    const ranking = {
      competition: {
        "id" : this.selectedCompetitionId
      },
      member: {
        "id" : this.selectedMemberId
      }
    };

    // Call the service method to register the member for the competition
    this.rankingService.registerMemberForCompetition(ranking).subscribe(
      (response) => {
        console.log('Member registered for competition successfully:', response);
        location.reload();
      },
      (error) => {
        console.error('Error registering member for competition:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }
}
