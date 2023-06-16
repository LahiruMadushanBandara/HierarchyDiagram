import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-consequences',
  templateUrl: './consequences.component.html',
  styleUrls: ['./consequences.component.css']
})
export class ConsequencesComponent implements OnInit {
  @ViewChild('consequencesTemplate') consequencesTemplateInput;
  @Input() nodeDetail: any;
  
  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  sendTemplateData(data:any) 
  {
    this.dataService.setData(data);
  }
}
