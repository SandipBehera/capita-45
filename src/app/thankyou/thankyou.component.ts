import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare var gtag:Function;
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor(public router:Router) { 
    this.router.events.subscribe((event:any)=>{
      if(event instanceof NavigationEnd){
        gtag('config', 'AW-401331995',{
          'page_path':event.urlAfterRedirects
        });
      }
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }

}
