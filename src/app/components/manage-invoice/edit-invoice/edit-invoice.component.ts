import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService, RoleService, AuthService, InvoiceService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
// import locale from 'date-fns/locale/en-US';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  submitted = false;
  addInvoice: any = { fixed: [], cgst: '', icgst: '', sgst: '', paidAmount: 0, discountFixed: 0 };
  currentDate: any = new Date();
  percentageValue: any;
  gstCountry: any;
  milestone: any;
  invoiceDateData: any;
  dueDateData: any;

  venderList: any;
  projectList: any;
  projectData: any;

  vendorId: any = '';
  totalAmount: any = 0;
  proAmount: any = 0;
  cgstPer: any = 0;
  sgstPer: any = 0;
  icgstPer: any = 0;
  percentage: any = 0;
  invoiceId: any;

  percentageBox: boolean = false;


  addMilestone: any = [{
    milestoneName: "",
    paymentPercentage: "",
    milestoneAmount: '',
    payable_amount: ''
  }];

  fixedMilestone: any = [{
    milestoneId: "",
    paymentPercentage: '',
  }];

  addMilestone1: any = [{
    description: "",
    month: "",
    monthly_amount: '',
    payable_amount: ''
  }];

  invoiceDate: FlatpickrOptions = {
    // locale: locale, // date-fns locale,
    format: 'LLLL do yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    // mode: 'range',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
    minDate: this.currentDate,
    // onChange: (selectedDates: any) => {
    //   this.addInvoice.date = selectedDates.toString();
    //   console.log(this.addInvoice.date)
    // },
  };

  invoiceDueDate: FlatpickrOptions = {
    // locale: locale, // date-fns locale,
    format: 'LLLL do yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    // mode: 'range',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
    minDate: this.currentDate,
    onChange: (selectedDates: any) => {
      this.addInvoice.date = selectedDates.toString();
    },
  };

  month: FlatpickrOptions = {
    // locale: locale, // date-fns locale,
    format: 'LLLL do yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    // mode: 'range',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
    minDate: this.currentDate,
    onChange: (selectedDates: any) => {
      this.addInvoice.date = selectedDates.toString();
    },
  };

  constructor(
    private _projectService: ProjectService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _invoiceService: InvoiceService
  ) { }

  ngOnInit(): void { 

    if (this.activatedRoute.snapshot.params['id']) {
      this.invoiceId = this.activatedRoute.snapshot.params['id'];
      this.getInvoiceDetailFromApi(this.invoiceId);
    }
  }

  getInvoiceDetailFromApi(id: any){
    this._invoiceService.invoiceDetails(this.invoiceId).subscribe((res) => {
      if (res['data']) {
        this.addInvoice = res['data'];

        this.getVendorListFromApi()

        this.addInvoice.clientName = this.addInvoice.vendorId
        this.projectDetailApi(this.addInvoice.projectId)
        this.projectListApi(this.addInvoice.vendorId)
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }

  getVendorListFromApi() {
    this.apiCalled = false;
    this._invoiceService.getVendorLists().subscribe(objS => {
      this.apiCalled = true;
      this.venderList = objS;
      // console.log(this.venderList)
    }, (err) => {
      console.log(err);
    })
  }

  getProject(event) {
    console.log(event)
    this.clearProjectDetail()
    // this.clearProjecList()
    this.projectListApi(event)
  }

  projectListApi(id){
    this.apiCalled = false;
    this._invoiceService.getProjectLists({
      vendorId: id,
    }).subscribe(objS => {
      this.apiCalled = true;
      this.projectList = objS;
      // console.log(this.projectList)
    }, (err) => {
      console.log(err);
    })
  }

  clearProjectDetail() {
    this.projectData = '';
    this.invoiceDateData = '';
    this.dueDateData = ''
    this.addInvoice.projectType = '';
    this.milestone = ''
    this.addMilestone = '';
    this.vendorId = '';
  }

  projectDetail(event) {
    console.log(event)
    this.clearProjectDetail()
    this.projectDetailApi(event);
  }

  projectDetailApi(id) {
    this.apiCalled = false;
    this._invoiceService.getProjectDetail(id).subscribe(objS => {
      this.apiCalled = true;
      this.projectData = objS.data;
      // console.log(this.projectData)

      // this.invoiceDateData = moment.parseZone(this.projectData?.createdAt).format('YYYY-MM-DD');
      // this.dueDateData = moment.parseZone(this.invoiceDateData).add(15, 'days').format('YYYY-MM-DD')
      if (this.projectData.projectType === 'FIXED') {
        this.addInvoice.projectType = 'FIXED';
        this.milestone = 'FIXED'
        this.addMilestone = this.projectData.fixed;
        this.calTotalAmount(1);
        this.fixedMile();
        // console.log('=================', this.fixedMilestone)
        // this.percentageBox = true;
      }

    }, (err) => {
      console.log(err);
    })

  }

  calTotalAmount(event) {
    if(event === 1) {
      this.totalAmount = 0
      for (let i = 0; i < this.projectData.fixed.length; i++) {
        this.totalAmount = this.totalAmount + this.projectData.fixed[i].milestoneAmount;
        this.proAmount = this.totalAmount
      } 
      this.addInvoice.total_payable_amount = this.totalAmount;
    } else {
      this.totalAmount = 0
      for (let i = 0; i < this.addMilestone.length; i++) {
        this.totalAmount = this.totalAmount + this.addMilestone[i].milestoneAmount;
      } 
      this.addInvoice.total_payable_amount = this.totalAmount;
    }
  }

  fixedMile() {
    let newArray = this.addMilestone.map(item => {
      return { milestoneId: item._id, paymentPercentage: item.projectPercentage };
    });
    this.fixedMilestone = newArray
  }
  
  add() {
    this.addMilestone.push({
      milestoneName: "",
      projectPercentage: "",
      milestoneAmount: "",
      payable_amount: ""
    });
  }

  remove(index: any) {
    if (this.addMilestone.length > 1) {
      this.addMilestone.splice(index, 1);
    }
  }

  item() {
    this.addMilestone1.push({
      description: "",
      month: "",
      monthly_amount: "",
      payable_amount: ""
    });
  }

  removeItem(index: any) {
    if (this.addMilestone1.length > 1) {
      this.addMilestone1.splice(index, 1);
    }
  }

  percentageChange(event: any) {
    console.log(event.target.value)
    this.gstCountry = event.target.value;
  }

  selectItem(event: any) {
    this.milestone = event;
    // console.log('------------',event)
  }

  selectedDates(event: any) {
    // moment.parseZone(event)
    console.log(event.target.value)
    console.log(moment.parseZone(event.target.value).add(15, 'days').format())
    this.addInvoice.invoiceDueDate = moment.parseZone(event.target.value).add(15, 'days').format()
    // 2023-04-26T18:30:00.000Z

    this.dueDateData = moment.parseZone(event.target.value).add(15, 'days').format('YYYY-MM-DD')
  }

  selectcgst(event){
    this.cgstPer = event.target.value;
    this.percentage = (Number(this.icgstPer) + Number(this.cgstPer) + Number(this.sgstPer))
    if(this.totalAmount !== 0) {
      var percentage = (this.percentage*this.totalAmount)/100;
      this.addInvoice.total_payable_amount =  this.totalAmount - percentage;
      console.log(percentage)
    } else {
      this.addInvoice.total_payable_amount = 0;
    }
  }
  
  selectIcgst(event){
    this.icgstPer = event.target.value;
    this.percentage = (Number(this.icgstPer) + Number(this.cgstPer) + Number(this.sgstPer))
    if(this.totalAmount !== 0) {
      var percentage = (this.percentage*this.totalAmount)/100;
      this.addInvoice.total_payable_amount =  this.totalAmount - percentage;
    } else {
      this.addInvoice.total_payable_amount = 0;
    }
  }
  
  selectSgst(event){
    this.sgstPer = event.target.value;
    this.percentage = (Number(this.icgstPer) + Number(this.cgstPer) + Number(this.sgstPer))
    if(this.totalAmount !== 0) {
      var percentage = (this.percentage*this.totalAmount)/100;
      this.addInvoice.total_payable_amount =  this.totalAmount - percentage;
    } else {
      this.addInvoice.total_payable_amount = 0;
    }
  }

  updatemilestonePer(i,item) {
    var percentage = (item.projectPercentage*this.proAmount)/100;
    this.addMilestone[i].milestoneAmount = percentage

    this.calTotalAmount(2);
    this.fixedMile();
  }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true; 
 
      // console.log('--------------ssssssss',this.addInvoice)

      let data = {
        vendorId: this.addInvoice.clientName,
        projectId:  this.addInvoice.projectId,
        invoiceNumber: this.addInvoice.InvoiceNumber,
        invoiceDate: this.addInvoice.invoiceDate,
        invoiceDueDate: this.addInvoice.invoiceDueDate,
        note: this.addInvoice.note,
        bankConversionCharges: this.addInvoice.bankConversionCharges,
        fixed: this.fixedMilestone,
        discountFixed: this.addInvoice.discountFixed,
        paidAmount: this.addInvoice.paidAmount,
      }
      // console.log('--------------',data, this.projectData.fixed)

      this.loading = true;
      // this.spinner.show();

      this._invoiceService.updateInvoiceDetails(data, this.invoiceId).subscribe(objS => {
        if (objS.code == 200) {
          this.loading = false;
          // this.spinner.hide();
          this._toastrService.success(objS.message);
          this._router.navigate(['/invoice-management/list']);
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
