import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent implements OnInit {
  imgName:string = '';

  constructor(private imgS:ImageService) { }

  ngOnInit(): void {
  }

  searchImg(){
    if(this.imgName === ''){
      this.imgS.setError('Especifica qué imagen querés buscar...')
      return;
    }

    this.imgS.sendSearchTerm(this.imgName);
  }
}
