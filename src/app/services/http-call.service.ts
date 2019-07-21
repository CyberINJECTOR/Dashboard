import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../page-components/evento/event';
import { EventColums } from '../models/event-colums';

@Injectable()
export class HttpCallService {

  const = 'http://127.0.0.1:8000/api/';
  eventsArrayList: Observable<Event[]>;
  eventColumns: Observable<EventColums[]>;
  constructor(private http: HttpClient) {

  }


  public getAllEvents(method: string): Observable<Event[]> {
    return this.http.get<Event[]>(this.const + method)
      .pipe(
        map((response: any) => {
          JSON.stringify(response);
          return this.eventsArrayList = response;
        }
        ));
  }

  public getAllColums(method: string): Observable<EventColums> {
    return this.http.get<EventColums[]>(this.const + method)
      .pipe(
        map((response: any) => {
          JSON.stringify(response);
          return this.eventColumns = response;

        }
        ));

  }



}
