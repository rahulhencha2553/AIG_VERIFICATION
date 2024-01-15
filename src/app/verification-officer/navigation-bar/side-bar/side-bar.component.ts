import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  public checkEndpoint: string = 'dashboard';

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.getPath();
    this.router.events.subscribe((event: any) => {
      this.getPath();
    });
  }

  public getByValue(value: string) {
    this.checkEndpoint = value;
  }

  public getPath() {
    const path = this.location.path();
    let url = path.toString().substring(8).split('?')[0];
    if (url == '') {
      this.checkEndpoint = 'dashboard';
    } else {
      this.checkEndpoint = url;
    }
  }
}
