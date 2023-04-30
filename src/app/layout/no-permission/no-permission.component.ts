import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router'
import { AdminService, AuthService, updateHeaderService } from '../../_services';

@Component({
  selector: 'app-no-permission',
  templateUrl: './no-permission.component.html',
  styleUrls: ['./no-permission.component.scss']
})
export class NoPermissionComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router:Router

  ) { }

  ngOnInit(): void {
  }

  bactToLogin() {
    this._authService.adminLogout();
      this._router.navigate(['/auth/login']);
  }

}
