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
      if(objS.code != 401) {
        this.invoiceList = objS;
        this.invoiceListLength = objS.total;
        console.log(this.invoiceListLength)
      } else {
        this._toastrService.error(objS.message);
        this._authService.adminLogout();
        this.router.navigate(['/auth/login']);
      }
    }, (err) => {
      console.log(err);
    })
  }

  refreshList(page: any, search: any) {
    this.page = page ? page : 1;
    this.getInvoiceListFromApi();
  }

  deleteInvoice(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this Invoice?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        console.log(request.id);
        this._invoiceService.deleteInvoice(request.id).subscribe(objS => {
          this.apiCalled = true;
          this.getInvoiceListFromApi();
          this._toastrService.success(objS.message);
        }, (err) => {
          console.log(err);
        })
      }
    })
    
  }

}
