import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/services/SharedServices/shared.service';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/services/Member/member.service';

declare var $: any;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {
  selectedCompetitionId: string = '';
  memberInThisCompetition: any[] = [];
  dataTable: any;
  private subscription!: Subscription;

  constructor(
    private sharedService: SharedService,
    private memberService: MemberService
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
    this.memberService.getMembersByCompetitionId(competitionId).subscribe(
      (data) => {
        this.memberInThisCompetition = data;
        this.refreshDataTable(); // Refresh the DataTable when data arrives
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
      this.dataTable.rows.add(this.memberInThisCompetition);
      this.dataTable.draw();
    }
  }

  initializeDataTable(): void {
    this.dataTable = $('#membersTable').DataTable({
      data: this.memberInThisCompetition,
      columns: [
        { data: 'name', title: 'Name', className: 'text-center fw-bold' },
        { data: 'familyName', title: 'Family Name', className: 'text-center fw-bold' },
        { data: 'accessDate', title: 'Access Date', className: 'text-center' },
        { data: 'nationality', title: 'Nationality', className: 'text-center' },
        { data: 'identityDocumentType', title: 'Identity Document Type', className: 'text-center' },
        { data: 'identityNumber', title: 'Identity Number', className: 'text-center' }
      ],
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }

  // Method to trigger fetch when the button is clicked
  triggerFetch(): void {
    this.sharedService.triggerFetchData();
  }
}
