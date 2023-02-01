import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../_services';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  constructor(
    public _sidebarService: SidebarService
  ) { }
  ngOnInit(): void {
  }

}