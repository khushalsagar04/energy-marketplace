import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiAuthenticationStorageService } from 'src/Services/Authentication/api-authentication-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiGetPlanDetailsService } from 'src/Services/api-get-plan-details.service';
import { ApiGetUserIDService } from 'src/Services/Authentication/api-get-user-id.service';
import {ChartConfiguration} from 'chart.js';
import { ChartOptions } from 'chart.js';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss'],
})
export class VendorDashboardComponent implements OnInit {
  constructor(
    private apiAuthenticationStorageService: ApiAuthenticationStorageService,
    private apiGetPlanDetailsService: ApiGetPlanDetailsService,
    private apiGetUserIDService: ApiGetUserIDService,
    private r: Router,
    private elementRef: ElementRef
  ) {}

  planHistory = [
    {
      planName: 'Frontier-6',
      planDate: '04/11/2023',
      planTime: '10:52 AM'
    },
    {
      planName: 'Frontier-12',
      planDate: '31/03/2023',
      planTime: '10:52 AM'
    },
    {
      planName: 'Frontier-18',
      planDate: '12/06/2023',
      planTime: '10:52 AM'
    },
    {
      planName: 'Frontier-24',
      planDate: '25/12/2023',
      planTime: '10:52 AM'
    },
    {
      planName: 'Frontier-30',
      planDate: '01/04/2023',
      planTime: '10:52 AM'
    },
  ]

  weeklyPopularPlans = [
    {
      planName: 'Frontier-6',
      enrollments: 12
    },
    {
      planName: 'Frontier-12',
      enrollments: 8
    },
    {
      planName: 'Frontier-18',
      enrollments: 8
    },
    {
      planName: 'Frontier-24',
      enrollments: 6
    },
    {
      planName: 'Frontier-30',
      enrollments: 6
    },
  ]
  monthlyPopularPlans = [
    {
      planName: 'Utilities-7',
      enrollments: 39
    },
    {
      planName: 'Utilities-14',
      enrollments: 23
    },
    {
      planName: 'Utilities-21',
      enrollments: 22
    },
    {
      planName: 'Utilities-28',
      enrollments: 15
    },
    {
      planName: 'Utilities-35',
      enrollments: 9
    },
  ]
  ongoingOffer = [
    {
      offerName: '2 Free Smart Thermostats',
      enrollments: 4
    },
    {
      offerName: 'Popular Fixed-Rate Plan',
      enrollments: 3
    },
    {
      offerName: 'FREE Nights Plan. $129 Deposit',
      enrollments: 1
    }
  ]
  expiredOffer = [
    {
      offerName: 'Offer 1',
      enrollments: 34
    },
    {
      offerName: 'Offer 2',
      enrollments: 27
    },
    {
      offerName: 'Offer 3',
      enrollments: 19
    }
  ]

  userMail: any;
  fileList: boolean = false;
  uploadFile: File | null = null;
  progress: number = 0;
  intervalId: any;
  allFiles: any = [];
  isSuccessful: number = 2;
  planList?: any;
  isBlue: boolean = true;
  togglePlan: boolean = true;
  isOngoing: boolean = true;
  toggleOffer: boolean = true;
  chart: any;
  activePlans: number = 0;
  inactivePlans: number = 0;
  popularPlans: any = this.weeklyPopularPlans;
  offers: any = this.ongoingOffer;
  downloadURL = `${environment.baseApiURL}/csv/GetsampleCSVTemplate`;

  ngOnInit(): void {
    if (!this.apiAuthenticationStorageService.isLoggedIn()) {
      this.redirectToLogin();
    }
    this.userMail = this.apiAuthenticationStorageService.getEmail().toLowerCase();
    this.getManagePlans();
  }
  
  getManagePlans(){
    this.apiGetPlanDetailsService
    .getPlanDetails(this.apiGetUserIDService.getProviderID())
    .subscribe({
      next: (data) => {
        this.planList = data;
        for(let i=0; i<this.planList.length; i++){
          if(this.planList[i].active == true){
            this.activePlans++;
          }
          else{
            this.inactivePlans++;
          }
        }
        this.doughnutChart(this.activePlans, this.inactivePlans)
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
  redirectToLogin(): void {
    this.r.navigate(['/vendor/login']);
  }
  downloadCSV() {
    window.open(this.downloadURL);
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
          this.isSuccessful = 1
        },
        error: (err) => {
          console.log(err);
          this.isSuccessful = 0
        },
      });
    } 
  }
  togglePlans(color: string) {
    if ((color === 'week' && !this.isBlue) || (color === 'month' && this.isBlue)) {
      this.isBlue = !this.isBlue;
      this.togglePlan = !this.togglePlan;
      if (this.togglePlan) {
        this.popularPlans = this.weeklyPopularPlans;
      } else {
        this.popularPlans = this.monthlyPopularPlans;
      }
    }
  }
  toggleOffers(type: string) {
    if ((type === 'ongoing' && !this.isOngoing) || (type === 'expired' && this.isOngoing)) {
      this.isOngoing = !this.isOngoing;
      this.toggleOffer = !this.toggleOffer;
      if (this.toggleOffer) {
        this.offers = this.ongoingOffer;
      } else {
        this.offers = this.expiredOffer;
      }
    }
  }
  doughnutChart(activePlans: number, inactivePlans: number){
    const totalPlans = activePlans + inactivePlans;
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [activePlans, inactivePlans],
            backgroundColor: ["#8AE460", "#A4A3A7"],
            rotation: 180,
            hoverBackgroundColor: ["#8AE460", "#A4A3A7"],
            hoverOffset: 5
          }
        ]
      },
      options: {
        responsive: false,
        cutout: 40,
        aspectRatio: 1.9,
        radius: 70,
        plugins: {
          tooltip: {
            enabled: false
          },
        },
      },
      plugins: [
        {
          id: 'doughnutLabel',
          beforeDatasetDraw(chart: any, args: any, pluginOptions: any){
            const {ctx, data} = chart;
            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = '600 24px sans-serif'
            ctx.fillStyle = '#23262B',
            ctx.textAlign = 'center'
            ctx. fillText(totalPlans.toString(), xCoor, yCoor)   
          }
        }
      ]
    })
  }
  

}
