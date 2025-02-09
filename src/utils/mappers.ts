// DTO Imports
import {
  CategoryDto,
  CityDto,
  CommentDto,
  EventGroupDto,
  EventUserDto,
  FromToDateDto,
  GroupedEventsDto,
  GroupTileDto,
  GroupUserDto,
  RemoteAttributeDto,
  SponsoredAttributeDto,
  ThumbnailDto,
  TitleDto,
  UserDto,
  UserDetailsDto,
  UserWithDetailsDto,
  VerifiedAttributeDto,
  GroupDetailsDto,
  GroupDto,
  EventDto,
} from "../dtos";

// Model Imports
import {
  Category,
  City,
  Comment,
  Event,
  EventUser,
  FromToDate,
  Group,
  GroupUser,
  RemoteAttribute,
  SponsoredAttribute,
  Thumbnail,
  User,
  UserDetails,
  VerifiedAttribute,
} from "../models";

// Utility Functions for DTO Conversion

// Thumbnail
export const toThumbnailDto = ({ id, thumb }: Thumbnail): ThumbnailDto => ({
  __typename: "Thumbnail",
  id,
  thumb,
});

// Category
export const toCategoryDto = ({ label, value }: Category): CategoryDto => ({
  __typename: "Category",
  label,
  value,
});

// City
export const toCityDto = ({ label, value }: City): CityDto => ({
  __typename: "City",
  label,
  value,
});

// Title
export const toTitleDto = <T extends { title: string }>({ title }: T): TitleDto => ({
  __typename: "Title",
  label: title,
  value: title,
});

// Attributes
export const toVerifiedAttributeDto = ({ id, value }: VerifiedAttribute): VerifiedAttributeDto => ({
  __typename: "VerifiedAttribute",
  id,
  value,
});

export const toSponsoredAttributeDto = ({ id, value }: SponsoredAttribute): SponsoredAttributeDto => ({
  __typename: "SponsoredAttribute",
  id,
  value,
});

export const toRemoteAttributeDto = ({ id, value }: RemoteAttribute): RemoteAttributeDto => ({
  __typename: "RemoteAttribute",
  id,
  value,
});

// User
export const toUserDto = ({ id, thumbnail, username }: User): UserDto => ({
  __typename: "User",
  id,
  username,
  thumbnail: toThumbnailDto(thumbnail),
});

export const toUserDetailsDto = ({ city, description, id }: UserDetails): UserDetailsDto => ({
  __typename: "UserDetails",
  id,
  description,
  city: toCityDto(city),
});

export const toUserWithDetailsDto = ({
  id,
  thumbnail,
  username,
  userDetails,
  verifiedAt,
}: User): UserWithDetailsDto => ({
  __typename: "UserWithDetails",
  id,
  username,
  verifiedAt,
  thumbnail: toThumbnailDto(thumbnail),
  userDetails: toUserDetailsDto(userDetails),
});

// Group
export const toGroupTileDto = (group: Group): GroupTileDto => ({
  __typename: "GroupTile",
  id: group.id,
  title: group.title,
  createdAt: group.createdAt,
  description: group.description,
  eventsLength: group.events.length,
  usersLength: group.users.length,
  remote: group.remote.value,
  sponsored: group.sponsored.value,
  verified: group.verified.value,
  thumbnail: toThumbnailDto(group.thumbnail),
  categories: group.categories.map(toCategoryDto),
  cities: group.cities.map(toCityDto),
});

// Date Range
export const toDateRangeDto = ({ id, endAt, startAt }: FromToDate): FromToDateDto => ({
  __typename: "FromToDate",
  id,
  endAt,
  startAt,
});

// Event Users
export const toEventUserDto = ({ id, isHost, isModerator, user }: EventUser): EventUserDto => ({
  __typename: "EventUser",
  id,
  isHost,
  isModerator,
  user: toUserDto(user),
});

export const toGroupUserDto = ({ id, isHost, isModerator, user }: GroupUser): GroupUserDto => ({
  __typename: "GroupUser",
  id,
  isHost,
  isModerator,
  user: toUserDto(user),
});

// Comment
export const toCommentDto = ({ content, createdAt, id, rate, user }: Comment): CommentDto => ({
  __typename: "Comment",
  id,
  content,
  createdAt,
  rate,
  user: toUserDto(user),
});

// Event Group
export const toEventGroupDto = ({
  id,
  title,
  description,
  canceled,
  cities,
  createdAt,
  date,
  users,
  categories,
  remote,
  sponsored,
  verified,
}: Event): EventGroupDto => ({
  __typename: "EventGroup",
  id,
  title,
  description,
  canceled,
  cities: cities.map(toCityDto),
  createdAt,
  date: toDateRangeDto(date),
  categories: categories.map(toCategoryDto),
  remote: remote.value,
  sponsored: sponsored.value,
  verified: verified.value,
  users: users.map(toEventUserDto),
});

// Group Details
export const toGroupDetailsDto = (group: Group): GroupDetailsDto => {
  const getGroupedEvents = (events: Event[]) => {
    const now = new Date();

    const cancelled: Event[] = [];
    const past: Event[] = [];
    const pending: Event[] = [];
    const upcoming: Event[] = [];

    events.forEach((event) => {
      if (event.canceled) {
        cancelled.push(event);
        return;
      }

      const startAt = new Date(event.date.startAt);
      const endAt = new Date(event.date.endAt);

      if (now < startAt) {
        upcoming.push(event);
      } else if (startAt <= now && now <= endAt) {
        pending.push(event);
      } else if (now >= endAt) {
        past.push(event);
      }
    });

    return { cancelled, past, pending, upcoming };
  };

  const stackEventsDto = (events: Event[]): GroupedEventsDto[] => {
    const sortedEvents = events.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    const eventMap = new Map<string, Event[]>();
    sortedEvents.forEach((event) => {
      const monthYearKey = `${new Date(event.createdAt).getFullYear()}-${new Date(event.createdAt).getMonth()}`;
      if (!eventMap.has(monthYearKey)) {
        eventMap.set(monthYearKey, []);
      }
      eventMap.get(monthYearKey)?.push(event);
    });

    return Array.from(eventMap.entries()).map(([key, events]) => ({
      __typename: "GroupedEvents",
      monthReference: new Date(parseInt(key.split("-")[0]), parseInt(key.split("-")[1]), 1).toISOString(),
      events: events.map(toEventGroupDto),
    }));
  };

  const { upcoming: _upcoming, cancelled: _cancelled, past: _past, pending: _pending } = getGroupedEvents(group.events);

  const upcoming = stackEventsDto(_upcoming);
  const pending = stackEventsDto(_pending);
  const past = stackEventsDto(_past);
  const cancelled = stackEventsDto(_cancelled);

  const numOfEvents = (dtos: GroupedEventsDto[]) => dtos.reduce((prev, current) => prev + current.events.length, 0);

  const roundToQuarter = (value: number): number => Math.round(value * 4) / 4;

  const cancelledLength = numOfEvents(cancelled);
  const pastLength = numOfEvents(past);
  const upcomingLength = numOfEvents(upcoming);
  const pendingLength = numOfEvents(pending);
  const eventsLength = cancelledLength + pastLength + upcomingLength + pendingLength;
  const rate = roundToQuarter(
    group.comments.reduce((prev, current) => prev + current.rate, 0) / (group.comments.length || 1)
  );

  return {
    __typename: "GroupDetails",
    cancelledLength,
    pastLength,
    pendingLength,
    upcomingLength,
    id: group.id,
    title: group.title,
    createdAt: group.createdAt,
    description: group.description,
    eventsLength,
    remote: group.remote.value,
    sponsored: group.sponsored.value,
    verified: group.verified.value,
    thumbnail: toThumbnailDto(group.thumbnail),
    categories: group.categories.map(toCategoryDto),
    cities: group.cities.map(toCityDto),
    cancelled: stackEventsDto(_cancelled),
    past: stackEventsDto(_past),
    pending: stackEventsDto(_pending),
    upcoming: stackEventsDto(_upcoming),
    events: group.events.map(toEventGroupDto),
    users: group.users.map(toGroupUserDto),
    comments: group.comments.map(toCommentDto),
    rate,
  };
};

export const toEventDto = ({
  id,
  title,
  description,
  canceled,
  createdAt,
  sponsored,
  verified,
  remote,
  users,
  date,
  cities,
  categories,
}: Event): EventDto => ({
  __typename: "Event",
  id,
  title,
  description,
  canceled,
  createdAt,
  sponsored: sponsored.value,
  verified: verified.value,
  remote: remote.value,
  users: users.map(toEventUserDto),
  date: toDateRangeDto(date),
  cities: cities.map(toCityDto),
  categories: categories.map(toCategoryDto),
});

export const toGroupDto = ({
  id,
  title,
  description,
  createdAt,
  sponsored,
  verified,
  remote,
  cities,
  categories,
  events,
  users,
  comments,
  thumbnail,
}: Group): GroupDto => {
  return {
    __typename: "Group",
    id,
    title,
    description,
    createdAt,
    sponsored: sponsored.value,
    verified: verified.value,
    remote: remote.value,
    cities: cities.map(toCityDto),
    categories: categories.map(toCategoryDto),
    events: events.map(toEventDto),
    users: users.map(toGroupUserDto),
    comments: comments.map(toCommentDto),
    thumbnail: toThumbnailDto(thumbnail),
  };
};
