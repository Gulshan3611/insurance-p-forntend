import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../../_services";
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userType: any = "";
  public pathname: any;
  url: any;
  currentRoute: string;


  constructor(
    public _sidebarService: SidebarService,
    private route: ActivatedRoute,
    private router: Router,
    ) { 
      
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.url = event.url;
      }
    });
    }

  ngOnInit(): void { 
  }

  // status: boolean = false;
  menuBtn(){
    this._sidebarService.IsSideBarShow = !this._sidebarService.IsSideBarShow; 
  }

}
