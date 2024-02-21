import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompetitionService } from 'src/app/services/Competition/competition.service';

@Component({
  selector: 'app-competitions-modal',
  templateUrl: './competitions-modal.component.html',
  styleUrls: ['./competitions-modal.component.css']
})
export class CompetitionsModalComponent {
  competition: any = {};
  @ViewChild('competitionModal') competitionModal!: ElementRef;

  constructor(
    private competitionService: CompetitionService
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.competitionService.addCompetition(this.competition).subscribe(
        (response) => {
          console.log('Competition added successfully:', response);
          this.reloadCompetitions();
        },
        (error) => {
          console.error('Error adding competition:', error);
        }
      );
    }
  }

  reloadCompetitions(): void {
    window.location.reload();
  }
}
