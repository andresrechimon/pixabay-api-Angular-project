import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  text:string = '';
  show:boolean = false;
  subscription:Subscription


  constructor(private imgS:ImageService) { 
    this.subscription = this.imgS.getError().subscribe(data => {
      this.showMsg();
      this.text = data;
    })
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  showMsg(){
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 2000)
  }
}
