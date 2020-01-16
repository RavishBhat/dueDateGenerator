import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  weeklyOffList = [
    { id: 0, day: 'Sunday', selected: true },
    { id: 1, day: 'Monday', selected: false },
    { id: 2, day: 'Tuesday', selected: false },
    { id: 3, day: 'Wednesday', selected: false },
    { id: 4, day: 'Thursday', selected: false },
    { id: 5, day: 'Friday', selected: false },
    { id: 6, day: 'Saturday', selected: true }
  ];
  holidayList = [
    { id: 1, name: 'Govt. Holiday', date: new Date(2020, 0, 2, 0) },
    { id: 2, name: 'Random Holiday', date:  new Date(2020, 0, 12, 0) }
  ];

  duesDatesList = [];

  // function to get the due dates for frequency = Daily (1)
  getDailyDueDates(startDate: Date, endDate: Date, SelectedType, occurance) {
    let dueDates = [];   
    let alteredDate = new Date(startDate);
    if(SelectedType == 1) {
      var DiffInTime = endDate.getTime() - startDate.getTime();
      var DiffDays = DiffInTime / (1000 * 3600 * 24);  
      occurance = Math.ceil(DiffDays/1);
    }
      this.times(occurance)( ()=>{
        let holidayDate = this.checkHoliday(alteredDate);
        dueDates.push(new Date(holidayDate));   
        let latestDate = dueDates[dueDates.length - 1];
        latestDate = new Date(latestDate);       
        alteredDate.setDate(latestDate.getDate() + 1);
      });
      return dueDates;    
  }

  // function to check if the date falls on weekend/holiday 
  // if the date falls on weekend/holiday the function returns the alternate date 
  checkHoliday(date: Date) {
    let weekOff = [];
    date = new Date(date);
    weekOff = this.weeklyOffList.filter(ele=> ele.selected);
    let weekOffIndex = weekOff.findIndex(o => o.id === date.getDay());
    let holidayIndex = this.holidayList.findIndex(o => o.date.getTime() == date.getTime());
    if(weekOffIndex !==-1 || holidayIndex !== -1) {
      date.setDate(date.getDate() + 1);
      return this.checkHoliday(date);
    }
    return date;
  }

 // function to get the due dates for frequency = Weekly (2)
  getWeeklyDueDates(startDate: Date, endDate: Date, SelectedType, occurance) {
    let dueDates = [];   
    let alteredDate = new Date(startDate);
    if(SelectedType == 1) {
      var DiffInTime = endDate.getTime() - startDate.getTime();
      var DiffDays = DiffInTime / (1000 * 3600 * 24);  
      occurance = Math.ceil(DiffDays/7);   // Calculete occurance between given date if end date selected
    }
      this.times(occurance)( ()=>{
        let holidayDate = this.checkHoliday(alteredDate);
        dueDates.push(new Date(holidayDate));             
        alteredDate.setDate(alteredDate.getDate() + 7);
      });
      return dueDates;
    
  }

  // function to get the due dates for frequency = Monthly (3)
  getMonthlyDueDates(startDate: Date, endDate: Date, SelectedType, occurance) {
    let dueDates = [];   
    let alteredDate = new Date(startDate);
    if(SelectedType == 1) {
      var DiffInTime = endDate.getTime() - startDate.getTime();
      var DiffDays = DiffInTime / (1000 * 3600 * 24);  
      occurance = Math.ceil(DiffDays/31); // Calculete occurance between given date if end date selected
    }
      this.times(occurance)( ()=>{
        let holidayDate = this.checkHoliday(alteredDate);
        dueDates.push(new Date(holidayDate));            
        alteredDate.setMonth(alteredDate.getMonth() + 1);
      });
      return dueDates;    
  }

  // function to get the due dates for frequency = Yearly (4)
  getYearlyDueDates(startDate: Date, endDate: Date, SelectedType, occurance) {
    let dueDates = [];   
    let alteredDate = new Date(startDate);
    if(SelectedType == 1) {
      var DiffInTime = endDate.getTime() - startDate.getTime();
      var DiffDays = DiffInTime / (1000 * 3600 * 24);  
      occurance = Math.ceil(DiffDays/365); // Calculete occurance between given date if end date selected
    }
      this.times(occurance)( ()=>{
        let holidayDate = this.checkHoliday(alteredDate);
        dueDates.push(new Date(holidayDate));            
        alteredDate.setFullYear(alteredDate.getFullYear() + 1);
      });
      return dueDates;    
  }
  

  // function to loop throught the occurance 
  times = x => f => {
    if (x > 0) {
        f()
        this.times(x - 1)(f)
    }
}

}
