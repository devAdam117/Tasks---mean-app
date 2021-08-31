import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http:HttpClient) { }
  getHeaders(){
    const headers=  new Headers();
    headers.append('Content-type', 'application/json');
    return headers;
  }
  get (url:string){
      return this.http.get(url,{
        responseType:"json"
      });
  }
  post(url:string,body:any){
    return this.http.post(url,body)
  }
}
