import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/shared/services/ItemsServices/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {
  fileUploadRes: any;

  getItemData: any;
  getItemTitle: String = '';
  getItemName: String = '';
  getItemPrice?: Number;
  getItemDescription: String = '';
  getItemImagePath: String = '';

  updateItemForm: FormGroup = new FormGroup({});
  itemID: string = '';
  featured?: boolean = true;

  selectedFle?: File;
  formData: FormData = new FormData();
  constructor(private formBuilder: FormBuilder, private itemservice: ItemService, private activateroute: ActivatedRoute,private _snackBar: MatSnackBar,private _router: Router) {
    this.updateItemForm = this.formBuilder.group({
      'id': new FormControl(''),
      'title': new FormControl('',[Validators.required]),
      'name': new FormControl('',[Validators.required]),
      'price': new FormControl('',[Validators.required]),
      'description': new FormControl('',[Validators.required]),
      'featured': new FormControl(this.featured),
      'image': new FormControl({}),
    })
   }

  ngOnInit(): void {
    this.activateroute.params.subscribe((data)=>{
      this.itemservice.getItem(data.id).subscribe((data)=>{
        this.getItemData = data;
        this.getItemTitle = this.getItemData.item.title
        this.getItemName = this.getItemData.item.name
        this.getItemPrice = this.getItemData.item.price
        this.getItemDescription = this.getItemData.item.description
        this.getItemImagePath = this.getItemData.item.imagePath
      })
      this.updateItemForm.patchValue({
        'id': data.id,
      });
    })
  }
  onFileSelected(event:any){
    this.selectedFle = <File>event.target.files[0]
    this.formData.append('image', this.selectedFle, this.selectedFle.name);
  }
  updateItem(){
    this.itemservice.fileUpload(this.formData).subscribe((data) => {
      this.fileUploadRes = data
      if(this.fileUploadRes.message){
        this._snackBar.open(`${this.fileUploadRes.message}`)
      }else{
        this.updateItemForm.patchValue({
          'image': data,
        });
        this.itemservice.updateItem(this.updateItemForm.value).subscribe((data)=>{
          if(data){
            this._snackBar.open(`Item updated`)
            this._router.navigate(['items'])
          }else{
            this._snackBar.open(`Item did not update ${data}`)
          }
        })
      }
  })
}
}
