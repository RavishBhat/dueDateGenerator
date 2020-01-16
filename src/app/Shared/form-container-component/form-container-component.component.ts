import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-container-component',
  templateUrl: './form-container-component.component.html',
  styleUrls: ['./form-container-component.component.scss']
})
export class FormContainerComponentComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private sharedDataService: SharedDataService) { }

  @Input() frequencyType: number;
  dueDateList = [];
  @ViewChild('generateDueModal', { static: true }) generateDueModal: ModalDirective;

  // Type Radio
  // 1 => End Date
  // 2 => Occurance
  // 3 => On Going

  dueDatesForm: FormGroup = this.fb.group({
    startDate: [''],
    TypeRadio: [''],
    EndByDate: [''],
    Occurance: ['']
  });

  bsDatepickerConfig = {
    dateInputFormat: 'DD-MMM-YYYY'
  }

  ngOnInit() {
    this.dueDatesForm.patchValue({
      startDate: new Date(),
      TypeRadio: '2',
      Occurance: 5
    });
  }

  // function to close popup
  closePopup() {
    this.generateDueModal.hide();
  }

  // common function to generate the due dates based on the selected frequency
  generateDueDates() {
    this.dueDateList = [];
    let dueDatesObj = this.dueDatesForm.value;
    let startDate = dueDatesObj.startDate;
    startDate.setHours(0, 0, 0, 0);
    let endDate;
    if (dueDatesObj.TypeRadio == 1) {
      endDate = dueDatesObj.EndByDate;
      if (endDate) {
        endDate.setHours(0, 0, 0, 0);
      } else {
        Swal.fire('Select End Date!');
        return;
      }
      if (endDate.getTime() < startDate.getTime()) {
        Swal.fire('End date must me greater than start date!');
        return;
      }

    }
    this.generateDueModal.show();
    switch (this.frequencyType) {
      case 1: {
        this.dueDateList = this.sharedDataService.getDailyDueDates(startDate, endDate, dueDatesObj.TypeRadio, dueDatesObj.Occurance);
        break;
      };
      case 2: {
        this.dueDateList = this.sharedDataService.getWeeklyDueDates(startDate, endDate, dueDatesObj.TypeRadio, dueDatesObj.Occurance);
        break;
      };
      case 3: {
        this.dueDateList = this.sharedDataService.getMonthlyDueDates(startDate, endDate, dueDatesObj.TypeRadio, dueDatesObj.Occurance);
        break;
      };
      case 4: {
        this.dueDateList = this.sharedDataService.getYearlyDueDates(startDate, endDate, dueDatesObj.TypeRadio, dueDatesObj.Occurance);
        break;
      };
      case 5: {
        this.dueDateList.push(startDate);
      }
    }
    console.log('dueDateList', this.dueDateList);
  }

}
