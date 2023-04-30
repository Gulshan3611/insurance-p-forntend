import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { InvoiceService , AuthService} from "../../../_services";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  apiCalled: boolean = false;
  invoiceList: any = [];
  invoiceListLength: any = [];
  searchForm: any = { search: ''};
  page: any = 1;
  limit: any = 10;

  constructor(
    private _toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _invoiceService:InvoiceService,
    private spinner: NgxSpinnerService,
    private _authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getInvoiceListFromApi() 
  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }
  
  getInvoiceListFromApi() {
    this.apiCalled = false;
    this._invoiceService.getInvoiceList({
      page: this.page,
      limit: this.limit,
      searchBy: this.searchForm.search,
    }).subscribe(objS => {
      this.apiCalled = true;
        this.invoiceList = objS;
        this.invoiceListLength = objS.total;
        console.log(this.invoiceListLength)
    }, (err) => {
      console.log(err);
    })
  }

  refreshList(page: any, search: any) {
    this.page = page ? page : 1;
    this.getInvoiceListFromApi();
  }

}
