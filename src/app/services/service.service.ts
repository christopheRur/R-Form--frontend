import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sender } from '../sender';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiServeUrl = environment.apiBaseUrl;

  senderData = 'ewr';

  constructor(private http: HttpClient) {}

  public getMessage(): Observable<Sender[]> {
    return this.http.get<Sender[]>(`${this.apiServeUrl}/req/senders`);
  }

  public sendMessage(msg: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the desired media type here
    });

    return this.http.post<Sender>(`${this.apiServeUrl}/req/sendMsg`, msg, {
      headers,
    });
  }

  public removeSender(id:Number): Observable<any> {

    console.log("id ===>"+id);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'id': id.toString(),

    });

    return this.http.delete<any>(`${this.apiServeUrl}/req/delSender`,{headers});
  }
}
