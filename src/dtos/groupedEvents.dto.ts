import { EventGroupDto } from "./eventGroup.dto";

type DateISO = string;

export interface GroupedEventsDto {
  __typename: "GroupedEvents";
  monthReference: DateISO;
  events: EventGroupDto[];
}
