type DateISO = string;

export interface FromToDateDto {
  __typename: "FromToDate";
  id: string;
  startAt: DateISO;
  endAt: DateISO;
}
