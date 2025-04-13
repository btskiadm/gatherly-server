/**
* This code was generated automatically by `pnpm generate` command
* from GraphQL API schema (`./app/model/schema.graphql`).
*
* **DO NOT EDIT THIS FILE MANUALLY**
*/

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type AccountStatus =
  | 'ACTIVE'
  | 'BANNED'
  | 'INACTIVE'
  | 'PENDING_VERIFICATION'
  | 'SUSPENDED';

export type AddGroupCommentInput = {
  content: Scalars['String']['input'];
  rate: Scalars['Int']['input'];
};

export type AddGroupCommentResponse = {
  __typename?: 'AddGroupCommentResponse';
  comment?: Maybe<Comment>;
  success: Scalars['Boolean']['output'];
};

export type AppRole =
  | 'ADMIN'
  | 'MODERATOR'
  | 'USER';

export type Category = {
  __typename?: 'Category';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type CategoryUserProfile = {
  __typename?: 'CategoryUserProfile';
  category: Category;
};

export type CheckUserGroupPermission = {
  __typename?: 'CheckUserGroupPermission';
  role?: Maybe<Role>;
};

export type City = {
  __typename?: 'City';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type CityUserProfile = {
  __typename?: 'CityUserProfile';
  city: City;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  rate: Scalars['Float']['output'];
  user: User;
};

export type CommentsData = {
  __typename?: 'CommentsData';
  rate: Scalars['Float']['output'];
};

export type Config = {
  __typename?: 'Config';
  photoBucketUrl: Scalars['String']['output'];
};

export type CreateEventInput = {
  categories: Array<Scalars['String']['input']>;
  cities: Array<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  endAt: Scalars['Date']['input'];
  startAt: Scalars['Date']['input'];
  title: Scalars['String']['input'];
};

export type CreateEventReponse = {
  __typename?: 'CreateEventReponse';
  eventId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateGroupInput = {
  categories: Array<Scalars['String']['input']>;
  cities: Array<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateGroupReponse = {
  __typename?: 'CreateGroupReponse';
  groupId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteGroupResponse = {
  __typename?: 'DeleteGroupResponse';
  success: Scalars['Boolean']['output'];
};

export type Event = {
  __typename?: 'Event';
  canceled: Scalars['Boolean']['output'];
  categories: Array<Category>;
  cities: Array<City>;
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  endAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  startAt: Scalars['Date']['output'];
  title: Scalars['String']['output'];
  users: Array<EventUser>;
};

export type EventBase = {
  canceled: Scalars['Boolean']['output'];
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  endAt: Scalars['Date']['output'];
  eventType: EventType;
  id: Scalars['String']['output'];
  largePhoto: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  smallPhoto: Scalars['String']['output'];
  startAt: Scalars['Date']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type EventTile = EventBase & {
  __typename?: 'EventTile';
  canceled: Scalars['Boolean']['output'];
  categories: Array<Category>;
  cities: Array<City>;
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  endAt: Scalars['Date']['output'];
  eventType: EventType;
  id: Scalars['String']['output'];
  largePhoto: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  smallPhoto: Scalars['String']['output'];
  startAt: Scalars['Date']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  usersCount: Scalars['Int']['output'];
};

export type EventType =
  | 'GROUP'
  | 'STANDALONE';

export type EventUser = {
  __typename?: 'EventUser';
  id: Scalars['String']['output'];
  role: Role;
  user: User;
};

export type Friend = {
  __typename?: 'Friend';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  receiver: User;
  sender: User;
  status: FriendRequestStatus;
  updatedAt: Scalars['Date']['output'];
};

export type FriendRequestStatus =
  | 'ACCEPTED'
  | 'DECLINED'
  | 'PENDING';

export type Friendship = {
  __typename?: 'Friendship';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  user1: User;
  user2: User;
};

export type GetEventTilesByUserIdReponse = {
  __typename?: 'GetEventTilesByUserIdReponse';
  count: Scalars['Int']['output'];
  events: Array<EventTile>;
};

export type GetFriendsListResponse = {
  __typename?: 'GetFriendsListResponse';
  count: Scalars['Int']['output'];
  friends: Array<Friend>;
};

export type GetGroupCommentsResponse = {
  __typename?: 'GetGroupCommentsResponse';
  comments: Array<Comment>;
  count: Scalars['Int']['output'];
};

export type GetGroupsByUserIdReponse = {
  __typename?: 'GetGroupsByUserIdReponse';
  count: Scalars['Int']['output'];
  groups: Array<GroupTile>;
};

export type GetReceivedFriendRequestsResponse = {
  __typename?: 'GetReceivedFriendRequestsResponse';
  count: Scalars['Int']['output'];
  friendRequests: Array<FriendRequest>;
};

export type GetSentFriendRequestsReponse = {
  __typename?: 'GetSentFriendRequestsReponse';
  count: Scalars['Int']['output'];
  friendRequests: Array<FriendRequest>;
};

export type GetUserGroupTilesReponse = {
  __typename?: 'GetUserGroupTilesReponse';
  count: Scalars['Int']['output'];
  userGroupTiles: Array<UserGroupTile>;
};

export type GroupBase = {
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  largePhoto: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  smallPhoto: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type GroupDetails = GroupBase & {
  __typename?: 'GroupDetails';
  canceled: Array<GroupedEvents>;
  canceledLength: Scalars['Int']['output'];
  categories: Array<Category>;
  cities: Array<City>;
  commentsData: CommentsData;
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  events: Array<EventTile>;
  eventsLength: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  largePhoto: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  past: Array<GroupedEvents>;
  pastLength: Scalars['Int']['output'];
  pending: Array<GroupedEvents>;
  pendingLength?: Maybe<Scalars['Int']['output']>;
  smallPhoto: Scalars['String']['output'];
  title: Scalars['String']['output'];
  upcoming: Array<GroupedEvents>;
  upcomingLength: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  usersData: UsersData;
};

export type GroupStatus =
  | 'ACTIVE'
  | 'BANNED'
  | 'INACTIVE'
  | 'PENDING_VERIFICATION'
  | 'SUSPENDED';

export type GroupTile = GroupBase & {
  __typename?: 'GroupTile';
  categories: Array<Category>;
  cities: Array<City>;
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  eventsCount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  largePhoto: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  smallPhoto: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  usersCount: Scalars['Int']['output'];
};

export type GroupUser = {
  __typename?: 'GroupUser';
  id: Scalars['String']['output'];
  role: Role;
  user: User;
};

export type GroupWithStatus = GroupBase & {
  __typename?: 'GroupWithStatus';
  categories: Array<Category>;
  cities: Array<City>;
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  eventsCount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  largePhoto: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  smallPhoto: Scalars['String']['output'];
  status: GroupStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  usersCount: Scalars['Int']['output'];
};

export type GroupedEvents = {
  __typename?: 'GroupedEvents';
  events: Array<EventTile>;
  monthReference: Scalars['String']['output'];
};

export type JoinGroupReponse = {
  __typename?: 'JoinGroupReponse';
  success: Scalars['Boolean']['output'];
};

export type LeaveGroupReponse = {
  __typename?: 'LeaveGroupReponse';
  success: Scalars['Boolean']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  status: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: Friendship;
  addGroupComment: AddGroupCommentResponse;
  cancelFriendRequest: FriendRequest;
  cancelFriendship: Friendship;
  createEvent: CreateEventReponse;
  createGroup: CreateGroupReponse;
  declineFriendRequest: FriendRequest;
  joinGroup: JoinGroupReponse;
  leaveGroup: LeaveGroupReponse;
  login?: Maybe<LoginResponse>;
  logout?: Maybe<LogoutResponse>;
  markAsRead: Notification;
  refreshToken?: Maybe<RefreshTokenResponse>;
  sendFriendRequest: FriendRequest;
};


export type MutationAcceptFriendRequestArgs = {
  requestId: Scalars['String']['input'];
};


export type MutationAddGroupCommentArgs = {
  addGroupCommentInput: AddGroupCommentInput;
  groupId: Scalars['String']['input'];
};


export type MutationCancelFriendRequestArgs = {
  requestId: Scalars['String']['input'];
};


export type MutationCancelFriendshipArgs = {
  friendshipId: Scalars['String']['input'];
};


export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
  groupId: Scalars['String']['input'];
};


export type MutationCreateGroupArgs = {
  createGroupInput: CreateGroupInput;
};


export type MutationDeclineFriendRequestArgs = {
  requestId: Scalars['String']['input'];
};


export type MutationJoinGroupArgs = {
  groupId: Scalars['String']['input'];
};


export type MutationLeaveGroupArgs = {
  groupId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationMarkAsReadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendFriendRequestArgs = {
  receiverId: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['Date']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  type: NotificationType;
};

export type NotificationType =
  | 'EVENT_INVITE'
  | 'FRIEND_ACCEPTED'
  | 'FRIEND_REQUEST'
  | 'GROUP_INVITE';

export type NotificationsResponse = {
  __typename?: 'NotificationsResponse';
  count: Scalars['Int']['output'];
  notifications: Array<Notification>;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']['output']>;
  categories: Array<CategoryUserProfile>;
  cities: Array<CityUserProfile>;
  facebook?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  tiktok?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  checkUserGroupPermissions: CheckUserGroupPermission;
  config: Config;
  getCategories: Array<Category>;
  getCities: Array<City>;
  getEventTilesByUserId: GetEventTilesByUserIdReponse;
  getFriendsList: GetFriendsListResponse;
  getGroupComments: GetGroupCommentsResponse;
  getGroupDetails?: Maybe<GroupDetails>;
  getGroupTiles: Array<GroupTile>;
  getGroupTilesByUserId: GetGroupsByUserIdReponse;
  getGroupTitles: Array<Title>;
  getReceivedFriendRequests: GetReceivedFriendRequestsResponse;
  getSentFriendRequests: GetSentFriendRequestsReponse;
  getUsedCategories: Array<Category>;
  getUsedCities: Array<City>;
  getUserGroupTiles: GetUserGroupTilesReponse;
  getUserWithProfile?: Maybe<UserWithProfile>;
  getUsers: Array<User>;
  getUsersByUsername: Array<User>;
  groups: Array<GroupWithStatus>;
  me?: Maybe<User>;
  notifications: NotificationsResponse;
  users: Array<User>;
};


export type QueryCheckUserGroupPermissionsArgs = {
  groupId: Scalars['String']['input'];
};


export type QueryGetEventTilesByUserIdArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryGetFriendsListArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetGroupCommentsArgs = {
  groupId: Scalars['String']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetGroupDetailsArgs = {
  groupId: Scalars['String']['input'];
};


export type QueryGetGroupTilesArgs = {
  categories: Array<Scalars['String']['input']>;
  cities: Array<Scalars['String']['input']>;
  dateOfAdding: Scalars['String']['input'];
  maxMembers: Scalars['Int']['input'];
  minMembers: Scalars['Int']['input'];
  numberOfMembers: Scalars['String']['input'];
  titles: Array<Scalars['String']['input']>;
};


export type QueryGetGroupTilesByUserIdArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryGetGroupTitlesArgs = {
  title: Scalars['String']['input'];
};


export type QueryGetReceivedFriendRequestsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryGetSentFriendRequestsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryGetUserGroupTilesArgs = {
  groupId: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryGetUserWithProfileArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUsersByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryNotificationsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type Role =
  | 'HOST'
  | 'MEMBER'
  | 'MODERATOR';

export type Subscription = {
  __typename?: 'Subscription';
  notificationAdded: Notification;
};


export type SubscriptionNotificationAddedArgs = {
  recipientId: Scalars['String']['input'];
};

export type Title = {
  __typename?: 'Title';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type User = UserBase & {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  largePhoto: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  role: AppRole;
  smallPhoto: Scalars['String']['output'];
  status: AccountStatus;
  username: Scalars['String']['output'];
};

export type UserBase = {
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  role: AppRole;
  smallPhoto: Scalars['String']['output'];
  status: AccountStatus;
  username: Scalars['String']['output'];
};

export type UserGroupTile = {
  __typename?: 'UserGroupTile';
  role: Role;
  userTile: UserTile;
};

export type UserTile = UserBase & {
  __typename?: 'UserTile';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  eventsCount: Scalars['Int']['output'];
  friendsCount: Scalars['Int']['output'];
  groupsCount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  largePhoto: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  role: AppRole;
  smallPhoto: Scalars['String']['output'];
  status: AccountStatus;
  username: Scalars['String']['output'];
};

export type UserWithProfile = UserBase & {
  __typename?: 'UserWithProfile';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  largePhoto: Scalars['String']['output'];
  mediumPhoto: Scalars['String']['output'];
  profile: Profile;
  role: AppRole;
  smallPhoto: Scalars['String']['output'];
  status: AccountStatus;
  username: Scalars['String']['output'];
};

export type UsersData = {
  __typename?: 'UsersData';
  count: Scalars['Int']['output'];
};
