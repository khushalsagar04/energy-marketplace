import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiGetPlanDetailsService } from '../../../../Services/api-get-plan-details.service';
import { ApiAuthenticationStorageService } from 'src/Services/Authentication/api-authentication-storage.service';
import { Router } from '@angular/router';
import { ApiGetUserIDService } from 'src/Services/Authentication/api-get-user-id.service';
import { environment } from 'src/environments/environment';
// import {  lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-vendor-manage-plan',
  templateUrl: './vendor-manage-plan.component.html',
  styleUrls: ['./vendor-manage-plan.component.scss'],
  
})
export class VendorManagePlanComponent implements OnInit{
  planList?: any;
  totalLength: any;
  page: number = 1;
  perPage: number[] = [25, 50, 75, 100];
  itemsPerPage: number = this.perPage[0];
  count: number = 0;
  isEnabled: boolean = true;
  publishStatus: boolean= false;
  postData: any = [];
  isManagePlanChecked:any;
  searchText: any;
  filteredPlanList: any;
  planID: any;
  allFiles: any = [];
  uploadFile: File | null = null;
  fileList: boolean = false;
  isSuccessful: number = 2;
  progress: number = 0;
  intervalId: any;
  downloadURL = `${environment.baseApiURL}/csv/GetsampleCSVTemplate`;
  checkBoxlist:any =["All Plans","Live", "Active", "Inactive"];
  CheckBoxValue: string = '';
  fCheckBox:any=[];
  fplst2: any = [];
  listOptActive: string = 'All Plans';
  selectedRow: any;
  copiedDetails: any = {};
  edit_save_toggle: boolean = false;
  isEditable: boolean = false;
  editPlanModal: boolean = false;
  newDetails: any = {};


  constructor(
    private apiGetPlanDetailsService: ApiGetPlanDetailsService,
    private apiAuthenticationStorageService: ApiAuthenticationStorageService,
    private apiGetUserIDService: ApiGetUserIDService,
    private r: Router,
    private elementRef: ElementRef
  ) {}

  async updateResults() {
    this.filteredPlanList = await this.searchByValue(this.planList);
  }

  ngOnInit() {
    if (this.apiAuthenticationStorageService.isLoggedIn()) {
      this.apiAuthenticationStorageService.getuserID();
      this.apiGetUserIDService.providerID(
        this.apiGetUserIDService.getProviderID()
      );
        this.getManagePlans();
    } else {
      this.redirectToLogin();
    }
  }

  getManagePlans(){
    this.apiGetPlanDetailsService
    .getPlanDetails(this.apiGetUserIDService.getProviderID())
    .subscribe({
      next: (data) => {
        this.planList = data;
        this.filteredPlanList = this.planList;
        this.fplst2 = this.planList;
        this.totalLength = this.filteredPlanList.length;
      },

      error: (err) => {
        console.log(err);
        if (err.error) {
          this.planList = JSON.parse(err.error).message;
        } else {
          this.planList = 'Error status: ' + err.message;
        }
      },
    });
  }

  searchByValue(data: any) {
    return data.filter((item: any) => {
      if (this.searchText.trim() == '') {
        return true;
      } else {
        return item.planKey
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      }
    });
  }

  redirectToLogin(): void {
    this.r.navigate(['/vendor/login']);
  }

  downloadCSV() {
    window.open(this.downloadURL);
  }

  handleClick(e: any) {
    let button = document.getElementById('dropdown-button')?.querySelector('p');

    if (button != null) {
      button.textContent = e;
      this.itemsPerPage = e;
    }
  }

  submit = (e:any, planId: any, publishedStatus: any) => {
    if(e.target.checked == true){
      this.postData.push({
        PlanId: planId,
        PublishedStatus: !publishedStatus
      })
      if(this.count == 0){
        this.isEnabled = false;
      }
      this.count++;
    }
    if(e.target.checked == false){
      this.postData = this.postData.filter((obj:any) => obj.PlanId !== planId)
      if(this.count == 1){
        this.isEnabled = true;
      }
      this.count--;
    }
  }

  publish_plan() {
    if(!this.isEnabled){
      this.apiGetPlanDetailsService.postUpdate(this.postData)
      .subscribe({
        next: (data) => {
          this.isEnabled = true;
          this.publishStatus = true;
          this.postData.length = 0
          this.count = 0;
          this.getManagePlans();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  
  sortFilter(e:any, plan:any){
    this.filteredPlanList = [];

    if(e.target.checked ){
      this.fplst2.forEach((item :any) => {
        if(plan == "All Plans"){
          this.filteredPlanList = this.fplst2;
          this.changeListOptText(plan);
        }
        else if(plan == 'Live')  {
        if(item.active == true && item.publishedStatus == true ){
          this.filteredPlanList = [...this.filteredPlanList];    
          this.filteredPlanList.push(item);
          this.changeListOptText(plan);
        }    
      }
      else if(plan == 'Active') {
        if((item.active==true)){
          this.filteredPlanList = [...this.filteredPlanList];
        this.filteredPlanList.push(item);
        this.changeListOptText(plan);
        }
      }
      else if(plan == "Inactive") {
        this.changeListOptText(plan);
        if(!item.active){
          this.filteredPlanList = [];
        this.filteredPlanList.push(item);
        }
      }
      else {
          this.filteredPlanList =[];
          this.changeListOptText(plan);
        }    
      return this.filteredPlanList;
    });
  }
  else{
      this.filteredPlanList= this.fplst2;
    }
  }
  changeListOptText(a: string) {
    this.listOptActive = a;
  }
  droppedFiles(allFiles: File[]): void {
    const filesAmount = allFiles.length;
    for (let i = 0; i < filesAmount; i++) {
      const file = allFiles[i];
      this.allFiles.push(file);
    }
    if (allFiles.length > 0) {
      const mergedFileData = new Blob(allFiles, { type: allFiles[0].type });
      this.uploadFile = new File([mergedFileData], allFiles[0].name, { type: allFiles[0].type });
      
    }
    this.fileList = true;
    this.intervalId = setInterval(() => {
      this.progress = this.progress + 10;
      if (this.progress >= 100) {
        clearInterval(this.intervalId);
      }
    }, 100);
    
  }
  removeFiles(event: any){
    setTimeout(() => {
      this.allFiles.shift();
      this.uploadFile = null;    
      this.fileList = false;
      this.progress = 0;  
      this.isSuccessful = 2;
    }, 1000); 
  }

  onSelectFile():void{
    const input = this.elementRef.nativeElement.querySelector('input[type="file"]');
    input.click();
  }
  onFileSelected(event: any){
    this.uploadFile = event.target.files[0];     
    event.target.value = null  
    this.fileList = true

    this.intervalId = setInterval(() => {
      this.progress = this.progress + 10;
      if (this.progress >= 100) {
        clearInterval(this.intervalId);
      }
    }, 100);
  }

  onUpload() {
    if (this.uploadFile) {
      this.apiGetPlanDetailsService.postCSV(this.uploadFile).subscribe({
        next: (data) => {
          this.planList = data;
          this.getManagePlans();
          this.isSuccessful = 1
        },
        error: (err) => {
          console.log(err);
          this.isSuccessful = 0
        },
      });
    }    
  }
  editPlan(planDetails: any){
    this.selectedRow = planDetails;
    this.copiedDetails = {...this.selectedRow} 
  }
  enforceMaxValue(event: any) {
    const value = parseInt(event.target.value);
    if (value > 100) {
      event.target.value = '100';
      this.copiedDetails.renewalPercentage = '100';
    }
  }
  toggleEditable(){
    this.edit_save_toggle = true;
    this.isEditable = !this.isEditable   
  }
  cancel(){
    if(this.edit_save_toggle){
      this.isEditable = !this.isEditable
      this.edit_save_toggle = false;
    }
    this.getManagePlans();
  }
  savePlan(){
    this.editPlanModal = false;
    this.newDetails  = {
      planKey: this.copiedDetails.planKey,
      termLength: this.copiedDetails.termLength,
      earlyTerminationFee: this.copiedDetails.earlyTerminationFee,
      renewalPercentage: this.copiedDetails.renewalPercentage,
      description: this.copiedDetails.description,
      planInfoDescription: this.copiedDetails.planInfoDescription,
      isHiddenFee: this.copiedDetails.isHiddenFee,
      isDeliveryCharges: this.copiedDetails.isDeliveryCharges,
      isDiscount: this.copiedDetails.isDiscount,
      termsUrl: this.copiedDetails.termsUrl,
      factsUrl: this.copiedDetails.factsUrl,
      yracUrl: this.copiedDetails.yracUrl
    }
    
    this.apiGetPlanDetailsService.updatePlan(this.newDetails, this.copiedDetails.planId).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.editPlanModal = true;
        }, 10)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  updatePlan(){
    this.getManagePlans();
  }
}
