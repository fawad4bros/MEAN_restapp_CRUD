import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseURL: string = 'http://localhost:3000/api/items/';
  constructor(private http: HttpClient) { }
  getItems(){
    return this.http.get(this.baseURL + 'items');
  }
  getItem(id:string){
    return this.http.get(this.baseURL + 'item/' + id);
  }
  deleteItem(id:string){
    return this.http.delete(this.baseURL + 'delete/' + id)
  }
  updateItem(data:any){
    return this.http.put(this.baseURL + 'update/' + data.id, data)
  }
  uploadItem(data:any){
    return this.http.post(this.baseURL + 'upload', data)
  }
  fileUpload(data:any){
    return this.http.post(this.baseURL + 'fileUpload', data)
  }
}
