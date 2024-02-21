import { Component, OnInit, AfterViewInit, OnDestroy , OnChanges} from '@angular/core';
import { SharedService } from 'src/app/services/SharedServices/shared.service';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/services/Member/member.service';
import { RankingService } from 'src/app/services/Ranking/ranking.service';

declare var $: any;
@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent {
  private subscription!: Subscription;
  selectedCompetitionId: string = '';
  membersRanking: any[] = [];
  dataTable: any;


  constructor(
    private sharedService: SharedService,
    private rankingService: RankingService
  ) {}

  ngOnInit(): void {
    // Subscribe to the observable to get the selectedCompetitionId when it changes
    this.subscription = this.sharedService.getSelectedCompetitionIdSubject().subscribe(
      (id) => {
        this.selectedCompetitionId = id;

        // Call the method to get members by competition ID
        this.getMembersByCompetitionId(+this.selectedCompetitionId);
      }
    );
  }

  getMembersByCompetitionId(competitionId: number): void {
    this.rankingService.getTop3RankingsByCompetitionId(competitionId).subscribe(
      (data) => {
        this.membersRanking = data;
        console.log("This is the members Ranking for podium :",this.membersRanking);
        this.refreshDataTable();
      },
      (error) => {
        console.error('Error fetching members by competition ID:', error);
      }
    );
  }

  refreshDataTable(): void {
    if (!this.dataTable) {
      this.initializeDataTable();
    } else {
      this.dataTable.clear();
      this.dataTable.rows.add(this.membersRanking);
      this.dataTable.draw();
    }
  }
 
  initializeDataTable(): void {
    this.dataTable = $('#podiumTable').DataTable({
      data: this.membersRanking,
      columns: [
        { data: 'rank', title: 'Rank', className: 'text-center fw-bold' },
        { data: 'memberName', title: 'Member Name', className: 'text-center fw-bold' },
        { data: 'score', title: 'Score', className: 'text-center' }
      ],
    });
  }
  
}
