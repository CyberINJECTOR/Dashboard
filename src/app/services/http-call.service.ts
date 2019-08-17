import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../page-components/evento/event';
import { EventColums } from '../models/event-colums';
import { EntityBaseRequest } from '../page-components/home/Entities/EntityBaseRequest';

@Injectable()
export class HttpCallService {

  constUrl = 'http://127.0.0.1:8000/api/';
  eventsArrayList: Observable<Event[]>;
  eventColumns: Observable<EventColums[]>;
  constructor(private http: HttpClient) {

  }


  public getAllEvents(method: string): Observable<any[]> {
    return this.http.get<Event[]>(this.constUrl + method)
      .pipe(
        map((response: any) => {
          JSON.stringify(response);
          return this.eventsArrayList = response;
        }
        ));
  }

  public getAllColums(method: string): Observable<EventColums> {
    return this.http.get<EventColums[]>(this.constUrl + method)
      .pipe(
        map((response: any) => {
          JSON.stringify(response);
          return this.eventColumns = response;

        }
        ));

  }

  public insert(method: string, request: EntityBaseRequest): boolean {
    this.http.post(this.constUrl + method, request).subscribe(  data => console.log(data));
    return true;
  }

  public update(method: string, request: EntityBaseRequest): boolean {
    this.http.post(this.constUrl + method, request).subscribe(  data => console.log(data));
    return true;
  }

  public delete(method: string, request: EntityBaseRequest): boolean {
    this.http.post(this.constUrl + method, request).subscribe(  data => console.log(data));
    return true;
  }



}
