import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification-portal',
  templateUrl: './verification-portal.component.html',
  styleUrls: ['./verification-portal.component.scss'],
})
export class VerificationPortalComponent implements OnInit {
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.getOfficer();
    
  }

  getOfficer(){
    this.authService.getLoggedInOfficer().subscribe({
      next:(data:any)=>{
        this.authService.portalOfficer.next(data.officer);
      }
    })
  }
}
