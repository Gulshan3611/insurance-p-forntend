import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { GstService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-view-gst',
  templateUrl: './view-gst.component.html',
  styleUrls: ['./view-gst.component.scss']
})
export class ViewGstComponent implements OnInit {

  
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
}
