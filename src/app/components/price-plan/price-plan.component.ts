import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGetService } from 'src/Services/api-get.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-plan',
  templateUrl: './price-plan.component.html',
  styleUrls: ['./price-plan.component.scss'],
})
export class PricePlanComponent implements OnInit {
  constructor(
    private router: Router,
    private apiGetService: ApiGetService,
    private route: ActivatedRoute
  ) {}

  data: any;
  pinCode: string = '';
  providerFilter: any = [];
  termLength: any = [];
  displayData1: any = [];
  filteredterm: any = [];
  filteredProvider: any = [];
  showAll1: boolean = true;
  showAll2: boolean = true;
  termFilterActive: boolean = false;
  providerFilterActive: boolean = false;
  btnTxtD: boolean = true;
  btnTxt: string = 'View Plan Details';
  value: string = 'down-arrow.svg';
  testinghiding: any;
  viewDetailsOpen: boolean = false;
  dropDownText: string = 'Most Popular';

  // changeBtnTxt() {
  //   this.btnTxtD = !this.btnTxtD;
  //   if (this.btnTxtD) {
  //     this.btnTxt = 'View Plan Details';
  //   } else {
  //     this.btnTxt = 'Hide Plan Details';
  //   }
  // }

  ngOnInit(): void {
    this.pinCode = this.route.snapshot.paramMap.get('zipcode')!;
    this.apiGetService.getPlanData(this.pinCode).subscribe((data: any) => {
      this.data = data;
      this.displayData1 = this.data;
      this.data.forEach((item: any) => {
        item.isSelected = false;
      });
      this.createFilters();
      this.router.navigate([`/searchresults/${this.pinCode}`]);
    });
  }

  toggleCollapsed(item: any) {
    item['show'] = !item['show'];

    const btn = document.getElementById('clicked' + item.planId);
    const imagebtn = document.getElementById('click' + item.planId);
    if (btn?.innerHTML == ' View Plan Details ') {
      btn.innerHTML = ' Hide Plan Details ';
      imagebtn?.setAttribute('src', '../../../assets/icons/up-arrow.svg');
      this.value = 'up-arrow.svg';
    } else if (btn?.innerHTML == ' Hide Plan Details ') {
      btn.innerHTML = ' View Plan Details ';
      imagebtn?.setAttribute('src', '../../../assets/icons/down-arrow.svg');
    } else {
    }
  }

  getPlanDetails() {
    this.apiGetService.getPlanData(this.pinCode).subscribe((data: any) => {
      this.data = data;
      this.displayData1 = this.data;
      this.createFilters();
    });
    this.router.navigate([`/searchresults/${this.pinCode}`]);
  }

  createFilters() {
    this.providerFilter = [];
    this.termLength = [];
    this.providerFilter = this.providerFilter.filter(
      (item: any, index: any) => this.providerFilter.indexOf(item) === index
    );
    this.providerFilter.sort();
    this.data.forEach((item: any) => {
      let provider = {
        providerName: item.providerName,
        isSelected: false,
        termLength: item.termLength,
      };
      this.providerFilter.push(provider);
    });

    this.providerFilter = this.providerFilter.filter(
      (item: any, index: any) =>
        this.providerFilter.findIndex(
          (item1: any) => item1.providerName === item.providerName
        ) === index
    );
    this.providerFilter.sort((a: any, b: any) =>
      a.providerName.localeCompare(b.providerName)
    );
    this.data.forEach((item: any) => {
      let termlength = {
        termLength: item.termLength,
        isSelected: false,
        providerName: item.providerName,
      };
      this.termLength.push(termlength);
    });
    this.termLength = this.termLength.filter((item: any) => item.termLength);
    this.termLength = this.termLength.filter(
      (item: any, index: any) =>
        this.termLength.findIndex(
          (item1: any) => item1.termLength === item.termLength
        ) === index
    );
    this.termLength.sort((a: any, b: any) => a.termLength - b.termLength);
  }

  toggleAll(arr: any, event: any) {
    if (event.target.checked) {
      arr.forEach((item: any) => {
        item.isSelected = true;
      });
    } else {
      arr.forEach((item: any) => {
        item.isSelected = false;
      });
    }
  }

  isTermLength(term: any, e: any) {
    if (e.target.checked) {
      this.filteredterm.push(term);

      this.termLength.forEach((item: any) => {
        if (item.termLength == term) {
          this.termLength.forEach((item: any) => {
            if (item.termLength == term) {
              item.isSelected = true;
            }
          });
        }
        this.termLength.every((item: any) => item.isSelected)
          ? (this.showAll1 = true)
          : (this.showAll1 = false);
        this.providerFilter.forEach((item: any) => {
          if (item.termLength == term) {
            item.isSelected = true;
          }
        });
      });
    } else {
      this.filteredterm.splice(this.filteredterm.indexOf(term), 1);

      this.providerFilter.forEach((item: any) => {
        if (item.termLength == term) {
          item.isSelected = false;
        }
      });

      this.termLength.every((item: any) => item.isSelected)
        ? (this.showAll1 = true)
        : (this.showAll1 = false);
      this.termLength.forEach((item: any) => {
        if (item.termLength == term) {
          item.isSelected = false;
          this.showAll1 = false;
        } else {
          this.showAll1 = false;
        }
      });
    }
    this.filterData();
    this.checkCheckboxState();
    if (this.providerFilterActive == false) {
      this.activatedTermFilter();
    }
  }

  isProvider(term: any, e: any) {
    if (e.target.checked) {
      this.filteredProvider.push(term);

      this.providerFilter.forEach((item: any) => {
        if (item.providerName == term) {
          this.providerFilter.forEach((item: any) => {
            if (item.providerName == term) {
              item.isSelected = true;
            }
          });
        }
        this.termLength.forEach((item: any) => {
          if (item.providerName == term) {
            item.isSelected = true;
          }
        });
      });
      this.providerFilter.every((item: any) => item.isSelected)
        ? (this.showAll2 = true)
        : (this.showAll2 = false);
      this.termLength.every((item: any) => item.isSelected)
        ? (this.showAll1 = true)
        : (this.showAll1 = false);
    } else {
      this.filteredProvider = this.filteredProvider.filter(
        (m: any) => m != term
      );
      this.providerFilter.forEach((item: any) => {
        if (item.providerName == term) {
          item.isSelected = false;
          this.showAll2 = false;
        } else {
          this.showAll2 = false;
        }
      });
    }

    this.displayData1.sort((a: any, b: any) =>
      a.providerName.localeCompare(b.providerName)
    );
    this.providerFilter.forEach((item: any) => {
      this.termLength.forEach((item1: any) => {
        if (item1.providerName == item.providerName) {
          item1.isSelected = item.isSelected;
        }
      });
    });
    if (this.termFilterActive == false) {
      this.activatedProviderFilter();
    }

    this.filterData();
    this.checkCheckboxState();
  }

  filterData() {
    this.displayData1 = [];

    if (this.filteredterm.length == 0) {
      this.filteredterm = this.termLength.map((item: any) => item.termLength);
      this.showAll1 = true;
    }
    if (this.filteredProvider.length == 0) {
      this.filteredProvider = this.providerFilter.map(
        (item: any) => item.providerName
      );
      this.showAll2 = false;
    }

    this.data.forEach((item: any) => {
      if (
        this.filteredterm.includes(item.termLength) &&
        this.filteredProvider.includes(item.providerName)
      ) {
        this.displayData1.push(item);
      }
    });
  }

  checkCheckboxState() {
    if (
      this.providerFilter.every((item: any) => !item.isSelected) &&
      this.termLength.every((item: any) => !item.isSelected)
    ) {
      this.filteredterm = [];
      this.filteredProvider = [];
      this.showAll1 = true;
      this.showAll2 = true;
      this.termFilterActive = false;
      this.providerFilterActive = false;
      this.getPlanDetails();
    }
  }

  // it filtered provider is not full set it as active
  activatedTermFilter() {
    if (this.filteredterm.length == 0) {
      this.termFilterActive = false;
    } else {
      this.termFilterActive = true;
    }
  }

  splitData(data: any) {
    let splitData = data.split('•');
    return splitData;
  }

  activatedProviderFilter() {
    if (this.filteredProvider.length == 0) {
      this.providerFilterActive = false;
    } else {
      this.providerFilterActive = true;
    }
  }

  clearAll() {
    this.filteredterm = [];
    this.filteredProvider = [];
    this.showAll1 = true;
    this.showAll2 = true;
    this.providerFilter.forEach((item: any) => {
      item.isSelected = false;
    });
    this.termLength.forEach((item: any) => {
      item.isSelected = false;
    });
    this.termFilterActive = false;
    this.providerFilterActive = false;
  }

  clearTerm() {
    this.filteredterm = [];
    this.showAll1 = false;
    this.showAll2 = true;
    this.termLength.forEach((item: any) => {
      item.isSelected = false;
    });
    this.providerFilter.forEach((item: any) => {
      item.isSelected = false;
    });
    this.activatedTermFilter();
    this.getPlanDetails();
  }

  clearProvider() {
    this.filteredProvider = [];
    this.showAll1 = true;
    this.showAll2 = false;
    this.providerFilter.forEach((item: any) => {
      item.isSelected = false;
    });
    this.termLength.forEach((item: any) => {
      item.isSelected = false;
    });
  }
  accordianDynamic(element: any, attr: any) {
    element.classList.toggle('active');
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }
  sortByPriceLowToHigh() {
    this.displayData1.sort((a: any, b: any) => a.pricePer500 - b.pricePer500);
    this.dropDownText = 'Price Low to High';
  }
  sortByPriceHighToLow() {
    this.displayData1.sort((a: any, b: any) => b.pricePer500 - a.pricePer500);
    this.dropDownText = 'Price High to Low';
  }
  sortByMostPopular() { 
    this.dropDownText = 'Most Popular';
  }
  sortByNewest() { 
    this.dropDownText = 'Newest';
  }
}
