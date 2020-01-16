import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { SharedDataService } from './Shared/shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weekDaysList: { id: number; day: string; selected: boolean; }[];
  holidayList = [];
  holidayName = '';
  holidayDate:Date = null ;
  bsDatepickerConfig = {
    dateInputFormat: 'DD-MMM-YYYY'
  }
  // Frequency codes
  // 1 => Daily
  // 2 => Weekly
  // 3 => Monthly
  // 4 => Yearly
  // 5 => One Time

  constructor(private sharedDataService: SharedDataService){

  }

  @ViewChild('holidaysModal',{static: true}) holidaysModal: ModalDirective;
  title = 'Due Date Generator';

  ngOnInit() {
    this.weekDaysList = this.sharedDataService.weeklyOffList;
    this.holidayList = this.sharedDataService.holidayList;
  }

  //function to check if all the days in the week are selected
  checkWeekDays(eve,data) {
    let weelList = this.weekDaysList.filter(ele => ele.selected);
    if(weelList.length == 6 && eve.target.checked){
      eve.preventDefault();
      data.selected = false;
      Swal.fire('Need atleast one working day!');
    }
  }

  //function to close the popup 
  closePopup() {
    this.holidaysModal.hide();
    console.log('Close', this.sharedDataService.weeklyOffList);
  }

  // function to remove holiday
  removeHoliday(id) {
    let index = this.holidayList.findIndex(o => o.id === id);
    this.holidayList.splice(index,1);
  }

  // function to add holidays
  addHoliday() {
    this.holidayDate.setHours(0,0,0,0);
    let obj = {
      id: Math.random(),
      name: this.holidayName,
      date: this.holidayDate
    }
    this.sharedDataService.holidayList.push(obj);
    console.log('Holiday list', this.holidayList);
  }

  
}
