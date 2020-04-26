import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/common/api.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'image', 'eventdate', 'noOfseat', 'actions'];
  dataSource: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getEventData();
  }

  getEventData() {
    this.api.getEvent()
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res);

        this.dataSource.filterPredicate = 
          (data: any, filter: string) => data.name.toLowerCase().indexOf(filter) != -1;
      });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue;
  }

}
