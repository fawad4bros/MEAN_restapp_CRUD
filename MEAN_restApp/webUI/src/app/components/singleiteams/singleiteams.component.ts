import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/shared/services/ItemsServices/item.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-singleiteams',
  templateUrl: './singleiteams.component.html',
  styleUrls: ['./singleiteams.component.scss']
})
export class SingleiteamsComponent implements OnInit {
  imagePath: string = '';
  itemID: string = '';
  itemDetails : any;
  constructor(private itemservice: ItemService, private activateroute: ActivatedRoute,private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.activateroute.params.subscribe((data)=>{
      this.itemID = data.id
    })
    this.itemservice.getItem(this.itemID).subscribe((data)=>{
      this.itemDetails = data;
      this.imagePath = this.itemDetails.item.imagePath
    })
  }
  deleteitem(){
    this.itemservice.deleteItem(this.itemID).subscribe((data) => {
      if(data){
        this._snackBar.open('Item Deleted')
        this._router.navigate(['items'])
      }else{
        this._snackBar.open('Item did not Delete')
      }
    })
  }
  edititem(){
    this._router.navigate([`update/${this.itemID}`])
  }
}
