import { Component, OnInit, Input } from "@angular/core";
import { CalendarService } from "../calendar.service";

@Component({
  selector: "app-events-view",
  templateUrl: "./events-view.component.html",
  styleUrls: ["./events-view.component.scss"]
})
export class EventsViewComponent implements OnInit {
  @Input() groupedEvents;
  
  constructor(public service: CalendarService) {}

  ngOnInit(): void {
    
  }

  hoursWorked(firstTaskStart: Date, lastTaskEnd: Date): string {
    let timeWorked = 0;
    const tmpFirst = new Date(firstTaskStart).getTime();
    const tmpLast = new Date(lastTaskEnd).getTime();
    timeWorked += tmpLast - tmpFirst;

    return timeWorked ? this.service.getHoursMinutes(timeWorked) : "-";
  }

  getTaskStart(events) {    
    const tasksStart = events.map(event => new Date(event.firstTaskStart));
    return Math.min(...tasksStart);    
  }

  getTaskEnd(events){
    const tasksEnd = events.map(event => new Date(event.lastTaskEnd));
    return Math.max(...tasksEnd);
  }
}
