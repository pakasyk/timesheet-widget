import { Component, OnInit } from "@angular/core";
import { CalendarService } from "./calendar.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  dayEvents: any;
  groupedEvents: any;

  constructor(public service: CalendarService) {}

  ngOnInit() {
    this.service.selectedDay$.subscribe(day => {
      this.dayEvents = [];
      if (this.service.week[day].events?.length) {
        this.dayEvents = [...this.service.week[day].events];
        this.groupEvents(this.dayEvents);
      }else {
        this.groupedEvents = {};
      }
    });
  }

  groupEvents = dayEvents => {
    return dayEvents.reduce((result, currentValue) => {
      (result[currentValue["eventType"]] =
        result[currentValue["eventType"]] || []).push(currentValue);
      return this.groupedEvents = result;
    }, {});
  };
}
