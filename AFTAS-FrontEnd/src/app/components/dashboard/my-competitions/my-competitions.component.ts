import { Component, OnInit } from '@angular/core';
import { CompetitionService } from 'src/app/services/Competition/competition.service';

@Component({
  selector: 'app-my-competitions',
  templateUrl: './my-competitions.component.html',
  styleUrls: ['./my-competitions.component.css']
})
export class MyCompetitionsComponent implements OnInit {
  competitions: any[] = [];


  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.loadMyCompetitions();
  }

  loadMyCompetitions() {
    this.competitionService.getMyCompetitions().subscribe(
      (data) => {
        this.competitions = data; 
        
        console.log(this.competitions);
      },
      (error) => {
        console.error('Error fetching my competitions:', error);
      }
    );
  }

}
