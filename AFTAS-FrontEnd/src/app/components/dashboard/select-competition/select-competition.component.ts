import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService } from 'src/app/services/Competition/competition.service';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/services/SharedServices/shared.service';

@Component({
  selector: 'app-select-competition',
  templateUrl: './select-competition.component.html',
  styleUrls: ['./select-competition.component.css']
})
export class SelectCompetitionComponent {

  buttonText: string;
  competitions: any[] = [];
  selectedCompetitionId: string = ''; // Variable to store the selected competition code


  constructor(
    private router: Router, 
    private competitionService: CompetitionService,
    private sharedService: SharedService
  ) {
    this.buttonText = this.router.url === '/Podium' ? 'Show Podium' : 'Show Members';
  }

  ngOnInit(): void {
    this.loadCompetitions();
  }

  loadCompetitions(): void {
    this.competitionService.getAllCompetitions().subscribe(
      (data) => {
        this.competitions = data.data; 
      },
      (error) => {
        console.error('Error loading competitions:', error);
      }
    );
  }


  // onSubmit(): void {
  //   // Handle form submission
  //   console.log('Selected Competition id:', this.selectedCompetitionId);
    
  //   // Set the selectedCompetitionId in the SharedService
  //   this.sharedService.setSelectedCompetitionId(this.selectedCompetitionId);

  // }

  onSelectChange(): void {
    // Handle the change in the selected competition
    console.log('Selected Competition id:', this.selectedCompetitionId);
  
    // Call the method to get members by competition ID
    this.sharedService.setSelectedCompetitionId(this.selectedCompetitionId);
  }
  
}
