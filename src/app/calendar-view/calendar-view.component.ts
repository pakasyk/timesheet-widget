import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CalendarService } from "../calendar.service";

@Component({
  selector: "app-calendar-view",
  templateUrl: "./calendar-view.component.html",
  styleUrls: ["./calendar-view.component.scss"]
})
export class CalendarViewComponent implements OnInit {
  @Input() days: [];
  @Output() selected = new EventEmitter();

  constructor(public service: CalendarService) {}

  ngOnInit(): void {}

  approvalState(day: any): string {
    let color = "";
    day.events.map(event => {
      if (event.isRejected && color !== "red") {
        color = "red";
      } else if (event.isApproved && color !== "grey") {
        color = "green";
      } else {
        color = "grey";
      }
    });

    return color;
  }

  hoursWorked(day: any) {
    let timeWorked = 0;
   
    day.events?.map(event => {
      let tmpFirst = new Date(event.firstTaskStart).getTime();
      let tmpLast = new Date(event.lastTaskEnd).getTime();
      timeWorked += (tmpLast - tmpFirst);
    });

    return timeWorked ? this.service.getHoursMinutes(timeWorked) : '-';
  }


   
}
