import {AfterViewInit, Component} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-pro-main-db',
  templateUrl: './pro-main-db.component.html',
  styleUrls: ['./pro-main-db.component.scss']
})
export class ProMainDbComponent implements AfterViewInit{

  progressValue = 50;
  progressMode: ProgressSpinnerMode = 'determinate';

  personalProgressValue = 90;
  personalProgressMode: ProgressSpinnerMode = 'determinate';

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
