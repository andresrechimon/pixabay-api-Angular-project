import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private $error = new Subject<string>();
  private $searchTerm = new Subject<string>();

  constructor(private http:HttpClient) { }

  setError(msg:string){
    this.$error.next(msg);
  }

  getError():Observable<string>{
    return this.$error.asObservable();
  }

  sendSearchTerm(term:string){
    this.$searchTerm.next(term);
  }

  getSearchTerm():Observable<string>{
    return this.$searchTerm.asObservable();
  }

  getImg(term:string, imgPerPage:number, currentPage:number): Observable<any>{
    const KEY = '24080097-0acc7e3aebefd627ef6cbaf53';
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${term}&per_page=${imgPerPage}&page=${currentPage}`;

    return this.http.get(URL);
  }
}
