import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { GstService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-gst',
  templateUrl: './edit-gst.component.html',
  styleUrls: ['./edit-gst.component.scss']
})
export class EditGstComponent implements OnInit {

  
  submitted = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  currentDate: any = new Date();
  gstForm: any = {};
  gstId: any;

  constructor(
    private _toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _gstService :GstService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    if (this.activatedRoute.snapshot.params['id']) {
      this.gstId = this.activatedRoute.snapshot.params['id'];
      this.getGstDetailFromApi(this.gstId);
    }
  }

  getGstDetailFromApi(id: any){
    this._gstService.gstDetails(this.gstId).subscribe((res) => {
      if (res['data']) {
        this.gstForm = res['data'];
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true; 

    if (valid) {
      console.log(this.gstForm)
      if(this.gstForm.gst > 101 ) {
        this._toastrService.error('The percentage must be between 0 and 100');
        return;
      }

      this.loading = true;
      // this.spinner.show();

      this._gstService.updateGstDetails(this.gstForm, this.gstId).subscribe(objS => {
        if (objS.code == 200) {
          this.loading = false;
          // this.spinner.hide();
          this._toastrService.success(objS.message);
          this.router.navigate(['/gst/list']);
        }
        else {
          this._toastrService.error(objS.message);
          this.loading = false;
          // this.spinner.hide();
        }
      })
    }
  }
}
