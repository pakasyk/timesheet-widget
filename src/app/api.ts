export interface ResponseData {
  date: Date;
  quantity: number;
  price: number;
  eventType: eventType;
  isExpenseType: boolean;
  isHoursEventType: boolean;
  isAdditionalHoursEventType: boolean;
  isWorkHour: boolean;
  isApproved: boolean;
  isRejected: boolean;
  tasksCount: number;
  firstTaskStart: Date;
  lastTaskEnd: Date;
}

export enum eventType {
  EXPENSES = "Expenses",
  HOURS = "Hours",
  ADDITIONAL_HOURS = "Additional hours"
}
