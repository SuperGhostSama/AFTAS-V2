import { Component , OnInit, AfterViewInit  } from '@angular/core';
import { MemberService } from 'src/app/services/Member/member.service';
declare var $: any;

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.css']
})
export class ViewMembersComponent implements OnInit, AfterViewInit{
  
  membersList: any[] = [];
  dataTable: any;

  
  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  loadMembers(): void {
    this.memberService.getAllMembers().subscribe(
      (data) => {

        this.membersList = data.data;
        console.log(this.membersList);
        this.refreshDataTable();
      },
      (error) => {

        console.error('Error fetching members:', error);
      }
    );
  }

  initializeDataTable(): void {
    this.dataTable = $('#view-members-table').DataTable({
      data: this.membersList,
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

  refreshDataTable(): void {
    if (this.dataTable) {
      this.dataTable.clear();
      this.dataTable.rows.add(this.membersList);
      this.dataTable.draw();
    }
  }


}
