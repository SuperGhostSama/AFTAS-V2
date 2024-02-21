import { Component, OnInit } from '@angular/core';
import { CompetitionService } from 'src/app/services/Competition/competition.service'; 
import { MemberService } from 'src/app/services/Member/member.service';
import { FishService } from 'src/app/services/Fish/fish.service';
import { HuntingService } from 'src/app/services/Hunting/hunting.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  openCompetitions: any[] = [];
  openCompetitionsMembers: any[] = [];
  fishes: any[] = [];
  //
  selectedOpenCompetitionId: string ='';
  selectedOpenCompetitionsMembersId: string ='';
  selectedFishId: string ='';
  fishWeight: string='';
  //
  hunting: any = {};

  constructor(
    private competitionService: CompetitionService,
    private memberService: MemberService,
    private fishService: FishService,
    private huntingService: HuntingService
    ) {}

  ngOnInit(): void {
    this.loadopenCompetitions();
    this.loadFishes();
  }

  loadopenCompetitions(): void {
    this.competitionService.getUpcomingCompetitions().subscribe(
      (data) => {
        this.openCompetitions = data.data; 
        console.log(this.openCompetitions);
      }
    );
  }

  loadFishes():void {
    this.fishService.getAllFishes().subscribe(
      (data) => {
        this.fishes= data.data;
        console.log(this.fishes)
      }
    )
  }

  onSelectChange(): void {
    this.loadMembersByCompetitionId();
  }

  loadMembersByCompetitionId(): void {
    this.memberService.getMembersByCompetitionId(+this.selectedOpenCompetitionId).subscribe(
      (data) => {
        this.openCompetitionsMembers = data; 
        console.log(this.openCompetitionsMembers);
      }
    );
  }

  onSubmit(): void {
    //Setting object data to send to endpoint
    this.hunting = {
      "competitionId": this.selectedOpenCompetitionId,
      "memberId": this.selectedOpenCompetitionsMembersId,
      "fishId": this.selectedFishId,
      "weight": this.fishWeight
    };
    console.log(this.hunting);
    
    this.huntingService.addHuntingResult(this.hunting).subscribe(
      (response) => {
        console.log('Hunting added successfully:', response);
        // window.location.reload();
      },
      (error) => {
        console.error('Error adding hunting:', error);
      }
    );
  }
}
