import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private router:Router){
    
  }

  doSearch(value:string){
    console.log("search content: "+value);
    // console.log("button :" +value);
    this.router.navigateByUrl(`/search/${value}`)

  }
}
