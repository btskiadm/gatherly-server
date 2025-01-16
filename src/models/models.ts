export type DateISO = string;

export interface SponsoredAttribute {
  id: string;
  value: boolean;
}

export interface VerifiedAttribute {
  id: string;
  value: boolean;
}

export interface RemoteAttribute {
  id: string;
  value: boolean;
}

export interface Thumbnails {
  id: string;
  thumb: string;
}

export interface Group {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  sponsored: SponsoredAttribute;
  verified: VerifiedAttribute;
  remote: RemoteAttribute;
  cities: City[];
  categories: Category[];
  events: Event[];
  users: GroupUser[];
  comments: Comment[];
  thumbnails: Thumbnails;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: DateISO;
  rate: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  canceled: boolean;
  sponsored: SponsoredAttribute;
  verified: VerifiedAttribute;
  remote: RemoteAttribute;
  users: EventUser[];
  date: EventDate;
  cities: City[];
  categories: Category[];
}

export interface EventDate {
  id: string;
  startAt: DateISO;
  endAt: DateISO;
}

export interface GroupUser {
  isHost: boolean;
  isModerator: boolean;
  user: User;
}

export interface EventUser {
  isHost: boolean;
  isModerator: boolean;
  user: User;
}

export interface UserDetails {
  description: string;
  city: City;
}

export interface User {
  id: string;
  username: string;
  thumbnails: Thumbnails;
  verifiedAt?: DateISO;
  userDetails: UserDetails;
}

export interface Category {
  value: string;
  label: string;
}

export interface City {
  value: string;
  label: string;
}
