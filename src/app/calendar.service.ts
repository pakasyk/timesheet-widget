import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap, merge, mergeMap, finalize } from "rxjs/operators";
import { ResponseData } from "./api";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CalendarService {
  week: any;

  private currentDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(
    new Date()
  );
  currentDate$: Observable<Date> = this.currentDate.asObservable();

  private selectedDay: BehaviorSubject<any> = new BehaviorSubject<any>({});
  selectedDay$: Observable<any> = this.selectedDay.asObservable();

  serverData$ = this.httpClient.get<ResponseData[]>(
    "http://localhost:3000/events"
  );

  constructor(private httpClient: HttpClient) {
    this.currentDate$.subscribe(current => {
      this.week = [];
      for (let i = 6; i >= 0; i--) {
        const newDate = new Date(new Date().setDate(current.getDate() - i));
        this.week.push({ date: newDate });
      }
      this.selectDay(6);

      this.serverData$
        .pipe(finalize(() => this.selectDay(6)))
        .subscribe(data => {
            this.week.map(date => {
            const dateString = date.date.toISOString().substr(0, 10);
            const dataFound = data.find(
              key => Object.keys(key)[0] === dateString
            );
            if (dataFound) {
              date.events = [];
              dataFound[dateString].forEach(event => {
                date.events.push(event);
              });
            }
            return date;
          });
        });
    });
  }

  getCurrentDate() {
    this.currentDate.next(new Date());
  }

  selectDay(day: any): void {
    this.selectedDay.next(day);
  }

  getHoursMinutes(milliseconds: number): string {
    const hours = milliseconds / (1000 * 60 * 60);
    const absoluteHours = Math.floor(hours);
    const h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

    return `${h}:${m}`;
  }
}
