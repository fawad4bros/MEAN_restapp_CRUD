import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/services/ItemsServices/item.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-iteams',
  templateUrl: './iteams.component.html',
  styleUrls: ['./iteams.component.scss']
})
export class IteamsComponent implements OnInit {
  items: any;
  constructor(private itemservice: ItemService,private _router: Router) { }

  ngOnInit(): void {
    this.itemservice.getItems().subscribe((data)=>{
      this.items = data
    })
  }
  viewItem(id:any){
    this._router.navigate([`item/${id}`])

  }
}
