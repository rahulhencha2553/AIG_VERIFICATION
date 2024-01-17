import { Component, OnInit } from '@angular/core';
import { envrionnment } from 'src/environments/envrionnment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  title = 'AIG';
  check  = envrionnment.hostUrl

  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    //this.getOfficer();

  }

  getOfficer(){
    this.authService.getLoggedInOfficer().subscribe({
      next:(data:any)=>{
        this.authService.portalOfficer.next(data.officer);
      }
    })
  }

 
}
