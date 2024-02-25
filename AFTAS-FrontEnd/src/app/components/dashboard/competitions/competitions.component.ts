import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CompetitionService } from 'src/app/services/Competition/competition.service';
declare var $: any;

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit, AfterViewInit, OnDestroy {
  competitions: any[] = [];
  dataTable: any;
  userRole: string | null = localStorage.getItem('role');

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.loadCompetitions();
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  loadCompetitions(): void {
    this.competitionService.getAllCompetitions().subscribe((data) => {
        this.competitions = data.data;
        console.log(this.competitions);
        this.refreshDataTable();
      }
    );
  }

  initializeDataTable(): void {
    this.dataTable = $('#competitionTable').DataTable({
      data: this.competitions,
      columns: [
        { data: 'code', title: 'Code', className: 'text-center fw-bold' },
        { data: 'date', title: 'Date', className: 'text-center' },
        { data: 'startTime', title: 'StartTime', className: 'text-center' },
        { data: 'endTime', title: 'EndTime', className: 'text-center' },
        { data: 'numberOfParticipants', title: 'Participants', className: 'text-center' },
        { data: 'location', title: 'Location', className: 'text-center' },
        { data: 'amount', title: 'Amount', className: 'text-center' }
      ],
    });
  }
  

  refreshDataTable(): void {
    if (this.dataTable) {
      this.dataTable.clear();
      this.dataTable.rows.add(this.competitions);
      this.dataTable.draw();
    }
  }
}
