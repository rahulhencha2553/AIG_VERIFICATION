import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit{

  checkEndpoint : string = 'dashboard';


  constructor(private location:Location){}

  ngOnInit(): void {
    this.getPath()
  }

  public getByValue(value:string){
    this.checkEndpoint = value
  }

  public getPath() {
    const path = this.location.path();
    
    if(path.toString().substring(8)== ''){
      this.checkEndpoint = 'dashboard'
    }else{
      this.checkEndpoint = path.toString().substring(8);
    }
  }

}
