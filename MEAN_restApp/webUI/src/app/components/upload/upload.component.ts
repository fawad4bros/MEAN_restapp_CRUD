import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/app/shared/services/ItemsServices/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadItemForm: FormGroup = new FormGroup({});
  featured?: boolean = true;
  itemDetail: any;

  selectedFle?: File;
  formData: FormData = new FormData();
  constructor(private formBuilder: FormBuilder, private itemservice: ItemService, private _snackBar: MatSnackBar,private _router: Router) {
    this.uploadItemForm = this.formBuilder.group({
      'id': new FormControl(''),
      'title': new FormControl(''), //,[Validators.required]
      'name': new FormControl(''),
      'price': new FormControl(''),
      'description': new FormControl(''),
      'featured': new FormControl(this.featured),
      'image': new FormControl({}),
    })
  }
  ngOnInit(): void {
  }
  onFileSelected(event:any){
    this.selectedFle = <File>event.target.files[0]
    this.formData.append('image', this.selectedFle, this.selectedFle.name);
  }
  uploadItem(){
  this.itemservice.fileUpload(this.formData).subscribe((data) => {
      if(data){
        this.uploadItemForm.patchValue({
          'image': data,
        });
        this.itemservice.uploadItem(this.uploadItemForm.value).subscribe((data)=>{

          if(data){
            this._snackBar.open('Item Added')
            this._router.navigate(['items'])
          }else{
            this._snackBar.open('No Data')
          }
        })
        this._snackBar.open('Image Added')
      }else{
        this._snackBar.open('Image not Added')
      }
    })
  }
}
