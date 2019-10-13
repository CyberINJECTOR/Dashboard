import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { Event } from '../page-components/evento/event';
import { EventColums } from '../models/event-colums';
import { EntityBaseRequest } from '../page-components/home/Entities/EntityBaseRequest';
import { EntityBaseInterface } from '../page-components/home/Entities/Entity-base';
import { User, IUser } from '../page-components/profile/UserEntity/user-model';
import { Image } from '../page-components/imagen/image-model';
import { Options } from 'selenium-webdriver/chrome';

@Injectable()
export class HttpCallService {
  private sendtAlert: Subject<EntityBaseInterface> = new BehaviorSubject<EntityBaseInterface>(null);

  constUrl = 'http://127.0.0.1:8000/api/';
  eventsArrayList: Observable<Event[]>;
  imgArrayList: Observable<Image[]>;
  user: User;
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

  public getUserProfile(method: string): Observable<User> {
    return this.http.get<Observable<User>>(this.constUrl + method)
      .pipe(
        map((response: any) => {
          JSON.stringify(response);
          return this.user = response;
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

  public getAllImageByEventId(method: string, id: number): Observable<Image[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'params': `/${id}`,
      })
    };
    return this.http.get<Image[]>(this.constUrl + method + '/id=' + `${id}`)
      .pipe(
        map((response: any) => {
          JSON.stringify(response);
          return this.eventsArrayList = response;
        }
        ));
  }

  public insert(method: string, request: EntityBaseRequest): boolean {
    this.http.post(this.constUrl + method, request).subscribe(data => console.log(data));
    this.sendtAlert.next(request);
    return true;
  }

  public update(method: string, request: any): boolean {
    this.http.post(this.constUrl + method, request).subscribe(data => console.log(data));
    this.sendtAlert.next(request);
    return true;
  }

  public delete(method: string, request: EntityBaseRequest): boolean {
    this.http.post(this.constUrl + method, request).subscribe(data => console.log(data));
    this.sendtAlert.next(request);
    return true;
  }

  public getObservableValue(): Observable<EntityBaseInterface> {
    return this.sendtAlert.asObservable().pipe(
      switchMap((task: EntityBaseInterface) => this.getObs(task))
    );
  }

  private getObs(key: any): Observable<EntityBaseInterface> {
    return (key) ? of(key) : of();
  }

}
