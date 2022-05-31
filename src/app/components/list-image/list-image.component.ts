import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit {
  term:string = '';
  subscription:Subscription;
  listImg:any[] = [];
  loading:boolean = false;
  imgPerPage:number = 20;
  currentPage:number = 1;
  calculateTotalPages:number = 0;

  constructor(private imgS:ImageService) { 
    this.subscription = this.imgS.getSearchTerm().subscribe(data => {
      this.term = data;
      this.currentPage = 1;
      this.loading = true;
      this.obtainImg();
    })
  }

  ngOnInit(): void {
  }

  obtainImg(){
    this.imgS.getImg(this.term, this.imgPerPage, this.currentPage).subscribe(data => {
      this.loading = false;
      if(data.hits.length === 0){
        this.imgS.setError('No se encontraron resultados...');
        return;
      }
      this.calculateTotalPages = Math.ceil(data.totalHits / this.imgPerPage);
      this.listImg = data.hits;
    }, err => {
      this.loading = false;
      this.imgS.setError('Uff... no obtuvimos respuesta. Intente más tarde.');
    })
  }

  lastPage(){
    this.currentPage--;
    this.loading = true;
    this.listImg = [];
    this.obtainImg();
  }

  nextPage(){
    this.currentPage++;
    this.loading = true;
    this.listImg = [];
    this.obtainImg();
  }

  nextPageClass(){
    if(this.currentPage === this.calculateTotalPages){
      return false;
    }else{
      return true;
    }
  }
}
