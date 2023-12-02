import { Component, OnInit } from '@angular/core';
import { envrionnment } from 'src/environments/envrionnment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'AIG';
  check  = envrionnment.hostUrl

}
