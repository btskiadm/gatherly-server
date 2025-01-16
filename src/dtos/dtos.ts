export type DateISO = string;

export interface CategoryDto {
  label: string;
  value: string;
}

export interface CityDto {
  label: string;
  value: string;
}

export interface TitleDto {
  type: "title";
  label: string;
  value: string;
}

export interface SearchCategoryDto extends CategoryDto {
  type: "category";
}

export interface SearchCityDto extends CityDto {
  type: "city";
}

export interface SearchTitleDto extends TitleDto {
  type: "title";
}

export interface SearchUserDto {
  type: "username";
  id: string;
  username: string;
  thumbnails: {
    thumb: string;
  };
}

export interface AttributesDto {
  sponsored: boolean;
  verified: boolean;
  remote: boolean;
}

export interface ThumbnailsDto {
  thumb: string;
}

export type GroupTileDto = {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  cities: CityDto[];
  categories: CategoryDto[];
  thumbnails: ThumbnailsDto;
  eventsLength: number;
  userLength: number;
} & AttributesDto;

export type EventGroupMetaDto = {
  id: string;
  thumbnail: ThumbnailsDto;
  title: string;
} & AttributesDto;

export type EventTileDto = {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  categories: CategoryDto[];
  userLength: number;
  date: EventDateDto;
  cities: CityDto[];
  groupMeta: EventGroupMetaDto;
};

export interface SponsoredAttributeDto {
  id: string;
  value: boolean;
}

export interface VerifiedAttributeDto {
  id: string;
  value: boolean;
}

export interface RemoteAttributeDto {
  id: string;
  value: boolean;
}

export interface UserDetailsDto {
  description: string;
  city: CityDto;
}

export interface UserDto {
  id: string;
  username: string;
  thumbnails: ThumbnailsDto;
  //   staticImageData: StaticImageData;
  verifiedAt?: DateISO;
  userDetails: UserDetailsDto;
}

export interface GroupUserDto {
  isHost: boolean;
  isModerator: boolean;
  user: UserDto;
}

export interface EventUserDto {
  isHost: boolean;
  isModerator: boolean;
  user: UserDto;
}

export interface CommentDto {
  id: string;
  user: UserDto;
  content: string;
  createdAt: DateISO;
  rate: number;
}

export interface GroupDto {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  sponsored: SponsoredAttributeDto;
  verified: VerifiedAttributeDto;
  remote: RemoteAttributeDto;
  cities: CityDto[];
  categories: CategoryDto[];
  events: EventDto[];
  users: GroupUserDto[];
  comments: CommentDto[];
  thumbnails: ThumbnailsDto;
}

export interface EventDateDto {
  id: string;
  startAt: DateISO;
  endAt: DateISO;
}

export interface EventDto {
  id: string;
  title: string;
  description: string;
  createdAt: DateISO;
  canceled: boolean;
  sponsored: SponsoredAttributeDto;
  verified: VerifiedAttributeDto;
  remote: RemoteAttributeDto;
  users: EventUserDto[];
  date: EventDateDto;
  cities: CityDto[];
  categories: CategoryDto[];
}

export interface EventStackDto {
  monthReference: DateISO;
  events: EventDto[];
}

export type GroupDetailsDto = GroupDto & {
  upcoming: EventStackDto[];
  pending: EventStackDto[];
  past: EventStackDto[];
  cancelled: EventStackDto[];
  upcomingLength: number;
  pendingLength: number;
  pastLength: number;
  cancelledLength: number;
  eventsLength: number;
  rate: number;
};

export interface ShortGroupDto {
  id: string;
  title: string;
  users: number;
  verified: boolean;
  sponsored: boolean;
  thumbnails: ThumbnailsDto;
}

export interface ShortEventDto {
  id: string;
  title: string;
  users: number;
  verified: boolean;
  sponsored: boolean;
}
