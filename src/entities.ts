import type { ModerationLogPayloads } from './consts.js';

export type ID = string;
export type DateString = string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODO = Record<string, any>;

// NOTE: 極力この型を使うのは避け、UserLite か UserDetailed か明示するように
export type User = UserLite | UserDetailed;

export type UserLite = {
	id: ID;
	name: string;
	username: string;
	host: string | null;
	avatarUrl: string;
	avatarBlurhash: string;
	avatarDecorations: {
		id: ID;
		url: string;
		angle?: number;
		flipH?: boolean;
		offsetX?: number;
		offsetY?: number;
	}[];
	isBot: boolean;
	isCat: boolean;
	instance?: {
		name: Instance['name'];
		softwareName: Instance['softwareName'];
		softwareVersion: Instance['softwareVersion'];
		iconUrl: Instance['iconUrl'];
		faviconUrl: Instance['faviconUrl'];
		themeColor: Instance['themeColor'];
	};
	emojis: {
		name: string;
		url: string;
	}[];
	onlineStatus: 'online' | 'active' | 'offline' | 'unknown';
	badgeRoles: {
		name: string,
		iconUrl: string,
	}[];
};

export type UserDetailed = UserLite & {
	url: string | null;
	uri: string | null;
	createdAt: DateString;
	updatedAt: DateString | null;
	lastFetchedAt?: DateString;
	bannerUrl: string | null;
	bannerBlurhash: string | null;
	isLocked: boolean;
	isSilenced: boolean;
	isSuspended: boolean;
	description: string | null;
	location: string | null;
	birthday: string | null;
	lang: string | null;
	fields: {name: string; value: string}[];
	followersCount: number;
	followingCount: number;
	notesCount: number;
	pinnedNoteIds: ID[];
	pinnedNotes: Note[];
	pinnedPageId: string | null;
	pinnedPage: Page | null;
	publicReactions: boolean;
	privateActivities: boolean;
	ffVisibility: 'public' | 'followers' | 'private';
	twoFactorEnabled: boolean;
	usePasswordLessLogin: boolean;
	securityKeys: boolean;
	roles: Role[];
	isFollowing: boolean;
	isFollowed: boolean;
	hasPendingFollowRequestFromYou: boolean;
	hasPendingFollowRequestToYou: boolean;
	isBlocking: boolean;
	isBlocked: boolean;
	isMuted: boolean;
	isRenoteMuted: boolean;
	isMediaMuted: boolean;
};

export type UserGroup = {
	id: ID,
	createdAt: DateString,
	name: string,
	ownerId: User['id'],
	userIds: User['id'][],
}

export type UserList = {
	id: ID;
	createdAt: DateString;
	name: string;
	userIds: User['id'][];
};

export type MeDetailed = UserDetailed & {
	avatarId: DriveFile['id'];
	bannerId: DriveFile['id'];
	autoAcceptFollowed: boolean;
	alwaysMarkNsfw: boolean;
	carefulBot: boolean;
	emailNotificationTypes: string[];
	hasPendingReceivedFollowRequest: boolean;
	hasUnreadAnnouncement: boolean;
	hasUnreadAntenna: boolean;
	hasUnreadMentions: boolean;
	hasUnreadMessagingMessage: boolean;
	hasUnreadNotification: boolean;
	hasUnreadSpecifiedNotes: boolean;
	hideOnlineStatus: boolean;
	injectFeaturedNote: boolean;
	integrations: TODO;
	isExplorable: boolean;
	mutedWords: string[][];
	mutingNotificationTypes: string[];
	noCrawle: boolean;
	receiveAnnouncementEmail: boolean;
	isAdmin: boolean;
	isModerator: boolean;
	isDeleted: boolean;
	deletedAt: DateString | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[other: string]: any;
};

export type DriveFile = {
	id: ID;
	folderId: ID;
	createdAt: DateString;
	isSensitive: boolean;
	name: string;
	thumbnailUrl: string;
	url: string;
	type: string;
	size: number;
	md5: string;
	blurhash: string;
	comment: string | null;
	properties: TODO;
};

export type DriveFolder = {
	id: ID;
	createdAt: DateString;
	name: string;
	parentId: ID | null;
	foldersCount?: number;
	filesCount?: number;
	parent?: DriveFolder | null;
}

export type GalleryPost = {
	id: ID;
	createdAt: DateString;
	updatedAt: DateString;
	userId: User['id'];
	user: User;
	title: string;
	description: string | null;
	fileIds: DriveFile['id'][];
	files: DriveFile[];
	isSensitive: boolean;
	likedCount: number;
	isLiked?: boolean;
};

export type Note = {
	id: ID;
	createdAt: DateString;
	text: string | null;
	cw: string | null;
	user: User;
	userId: User['id'];
	reply?: Note;
	replyId: Note['id'];
	renote?: Note;
	renoteId: Note['id'];
	files: DriveFile[];
	fileIds: DriveFile['id'][];
	visibility: 'public' | 'home' | 'followers' | 'specified';
	visibleUserIds?: User['id'][];
	localOnly?: boolean;
	myReaction?: string | null;
	reactions: Record<string, number>;
	reactionEmojis: Record<string, string>;
	renoteCount: number;
	repliesCount: number;
	poll?: {
		expiresAt: DateString | null;
		expiredAfter: string | null;
		multiple: boolean;
		choices: {
			isVoted: boolean;
			text: string;
			votes: number;
		}[];
	};
	emojis: {
		name: string;
		url: string;
	}[];
	uri?: string;
	url?: string;
	isHidden?: boolean;
	via?: string | null;
	isDeleted: boolean;
	deletedAt?: string;
};

export type NoteReaction = {
	id: ID;
	createdAt: DateString;
	user: UserLite;
	type: string;
};

export type Notification = {
	id: ID;
	createdAt: DateString;
	isRead: boolean;
	user: User;
} & ({
	type: 'reaction';
	reaction: string;
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'reply';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'renote';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'quote';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'mention';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'pollVote';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'pollEnded';
	user: User;
	userId: User['id'];
	note: Note;
} | {
	type: 'follow';
	user: User;
	userId: User['id'];
} | {
	type: 'followRequestAccepted';
	user: User;
	userId: User['id'];
} | {
	type: 'receiveFollowRequest';
	user: User;
	userId: User['id'];
} | {
	type: 'achievementEarned';
	user: User;
	userId: User['id'];
} | {
	type: 'groupInvited';
	invitation: UserGroup;
	user: User;
	userId: User['id'];
} | {
	type: 'app';
	header?: string | null;
	body: string;
	icon?: string | null;
} | {
	type: 'chatMessageReceived';
	message: MessagingMessage;
	user: User;
	userId: User['id'];
});

export type MessagingMessage = {
	id: ID;
	createdAt: DateString;
	file: DriveFile | null;
	fileId: DriveFile['id'] | null;
	isRead: boolean;
	reads: User['id'][];
	text: string | null;
	user: User;
	userId: User['id'];
	recipient?: User | null;
	recipientId: User['id'] | null;
	group?: UserGroup | null;
	groupId: UserGroup['id'] | null;
};

export type CustomEmoji = {
	id: string;
	name: string;
	url: string;
	category: string;
	aliases: string[];
};

export type LiteInstanceMetadata = {
	maintainerName: string | null;
	maintainerEmail: string | null;
	version: string;
	name: string | null;
	uri: string;
	description: string | null;
	langs: string[];
	tosUrl: string | null;
	repositoryUrl: string;
	feedbackUrl: string;
	disableRegistration: boolean;
	disableLocalTimeline: boolean;
	disableGlobalTimeline: boolean;
	driveCapacityPerLocalUserMb: number;
	driveCapacityPerRemoteUserMb: number;
	emailRequiredForSignup: boolean;
	enableHcaptcha: boolean;
	hcaptchaSiteKey: string | null;
	enableRecaptcha: boolean;
	recaptchaSiteKey: string | null;
	enableTurnstile: boolean;
	turnstileSiteKey: string | null;
	swPublickey: string | null;
	themeColor: string | null;
	mascotImageUrl: string | null;
	bannerUrl: string | null;
	serverErrorImageUrl: string | null;
	infoImageUrl: string | null;
	notFoundImageUrl: string | null;
	emojiErrorImageUrl: string | null;
	iconUrl: string | null;
	backgroundImageUrl: string | null;
	logoImageUrl: string | null;
	maxNoteTextLength: number;
	enableEmail: boolean;
	enableTwitterIntegration: boolean;
	enableGithubIntegration: boolean;
	enableDiscordIntegration: boolean;
	enableServiceWorker: boolean;
	emojis: CustomEmoji[];
	defaultDarkTheme: string | null;
	defaultLightTheme: string | null;
	ads: {
		id: ID;
		ratio: number;
		place: string;
		url: string;
		imageUrl: string;
	}[];
	translatorAvailable: boolean;
};

export type DetailedInstanceMetadata = LiteInstanceMetadata & {
	pinnedPages: string[];
	pinnedClipId: string | null;
	cacheRemoteFiles: boolean;
	requireSetup: boolean;
	proxyAccountName: string | null;
	features: TODO;
};

export type InstanceMetadata = LiteInstanceMetadata | DetailedInstanceMetadata;

export type ServerInfo = {
	machine: string;
	cpu: {
		model: string;
		cores: number;
	};
	mem: {
		total: number;
	};
	fs: {
		total: number;
		used: number;
	};
};

export type Stats = {
	notesCount: number;
	originalNotesCount: number;
	usersCount: number;
	originalUsersCount: number;
	instances: number;
	driveUsageLocal: number;
	driveUsageRemote: number;
};

export type Page = {
	id: ID;
	createdAt: DateString;
	updatedAt: DateString;
	userId: User['id'];
	user: User;
	content: TODO[];
	variables: TODO[];
	title: string;
	name: string;
	summary: string | null;
	hideTitleWhenPinned: boolean;
	alignCenter: boolean;
	font: string;
	script: string;
	eyeCatchingImageId: DriveFile['id'] | null;
	eyeCatchingImage: DriveFile | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	attachedFiles: any;
	likedCount: number;
	isLiked?: boolean;
};

export type PageEvent = {
	pageId: Page['id'];
	event: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	var: any;
	userId: User['id'];
	user: User;
};

export type Announcement = {
	id: ID;
	createdAt: DateString;
	updatedAt: DateString | null;
	text: string;
	title: string;
	imageUrl: string | null;
	isRead?: boolean;
};

export type Antenna = {
	id: ID;
	createdAt: DateString;
	name: string;
	keywords: string[][]; // TODO
	excludeKeywords: string[][]; // TODO
	src: 'home' | 'all' | 'users' | 'list' | 'group';
	userListId: ID | null; // TODO
	userGroupId: ID | null; // TODO
	users: string[]; // TODO
	caseSensitive: boolean;
	notify: boolean;
	withReplies: boolean;
	withFile: boolean;
	hasUnreadNote: boolean;
};

export type App = TODO;

export type AuthSession = {
	id: ID;
	app: App;
	token: string;
};

export type Ad = TODO;

export type Clip = TODO;

export type NoteFavorite = {
	id: ID;
	createdAt: DateString;
	noteId: Note['id'];
	note: Note;
};

export type FollowRequest = {
	id: ID;
	follower: User;
	followee: User;
};

export type Following = {
	id: ID;
	createdAt: DateString;
	followerId: User['id'];
	followeeId: User['id'];
};

export type FollowingFolloweePopulated = Following & {
	followee: UserDetailed;
};

export type FollowingFollowerPopulated = Following & {
	follower: UserDetailed;
};

export type Blocking = {
	id: ID;
	createdAt: DateString;
	blockeeId: User['id'];
	blockee: UserDetailed;
};

export type Instance = {
	id: ID;
	caughtAt: DateString;
	host: string;
	usersCount: number;
	notesCount: number;
	followingCount: number;
	followersCount: number;
	driveUsage: number;
	driveFiles: number;
	latestRequestSentAt: DateString | null;
	latestStatus: number | null;
	latestRequestReceivedAt: DateString | null;
	lastCommunicatedAt: DateString;
	isBlocked: boolean;
	isNotResponding: boolean;
	isSuspended: boolean;
	softwareName: string | null;
	softwareVersion: string | null;
	openRegistrations: boolean | null;
	name: string | null;
	description: string | null;
	maintainerName: string | null;
	maintainerEmail: string | null;
	iconUrl: string | null;
	faviconUrl: string | null;
	themeColor: string | null;
	infoUpdatedAt: DateString | null;
};

export type Signin = {
	id: ID;
	createdAt: DateString;
	ip: string;
	headers: TODO;
	success: boolean;
};

export type AvatarDecoration = {
	id: ID;
	updatedAt: DateString | null;
	url: string;
	name: string;
	description: string;
	roleIdsThatCanBeUsedThisDecoration: string[];
	remoteId: string;
	host: string | null;
};

export type GetAvatarDecorationsResponse = {
  id: ID; // format: id
  name: string;
  description: string;
  url: string;
  roleIdsThatCanBeUsedThisDecoration: string[]; // id[]
}[];

export type Role = {
	id: ID,
	name: string,
	color: string,
	iconUrl: string,
	description: string,
	isModerator: boolean,
	isAdministrator: boolean,
};

export type UserSorting =
	| '+follower'
	| '-follower'
	| '+createdAt'
	| '-createdAt'
	| '+updatedAt'
	| '-updatedAt';
export type OriginType = 'combined' | 'local' | 'remote';

export type ModerationLog = {
	id: ID;
	createdAt: DateString;
	userId: User['id'];
	user: UserDetailed | null;
} & ({
	type: 'updateServerSettings';
	info: ModerationLogPayloads['updateServerSettings'];
} | {
	type: 'suspend';
	info: ModerationLogPayloads['suspend'];
} | {
	type: 'unsuspend';
	info: ModerationLogPayloads['unsuspend'];
} | {
	type: 'updateUserNote';
	info: ModerationLogPayloads['updateUserNote'];
} | {
	type: 'addCustomEmoji';
	info: ModerationLogPayloads['addCustomEmoji'];
} | {
	type: 'updateCustomEmoji';
	info: ModerationLogPayloads['updateCustomEmoji'];
} | {
	type: 'deleteCustomEmoji';
	info: ModerationLogPayloads['deleteCustomEmoji'];
} | {
	type: 'assignRole';
	info: ModerationLogPayloads['assignRole'];
} | {
	type: 'unassignRole';
	info: ModerationLogPayloads['unassignRole'];
} | {
	type: 'createRole';
	info: ModerationLogPayloads['createRole'];
} | {
	type: 'updateRole';
	info: ModerationLogPayloads['updateRole'];
} | {
	type: 'deleteRole';
	info: ModerationLogPayloads['deleteRole'];
} | {
	type: 'clearQueue';
	info: ModerationLogPayloads['clearQueue'];
} | {
	type: 'promoteQueue';
	info: ModerationLogPayloads['promoteQueue'];
} | {
	type: 'deleteDriveFile';
	info: ModerationLogPayloads['deleteDriveFile'];
} | {
	type: 'deleteNote';
	info: ModerationLogPayloads['deleteNote'];
} | {
	type: 'createGlobalAnnouncement';
	info: ModerationLogPayloads['createGlobalAnnouncement'];
} | {
	type: 'createUserAnnouncement';
	info: ModerationLogPayloads['createUserAnnouncement'];
} | {
	type: 'updateGlobalAnnouncement';
	info: ModerationLogPayloads['updateGlobalAnnouncement'];
} | {
	type: 'updateUserAnnouncement';
	info: ModerationLogPayloads['updateUserAnnouncement'];
} | {
	type: 'deleteGlobalAnnouncement';
	info: ModerationLogPayloads['deleteGlobalAnnouncement'];
} | {
	type: 'deleteUserAnnouncement';
	info: ModerationLogPayloads['deleteUserAnnouncement'];
} | {
	type: 'resetPassword';
	info: ModerationLogPayloads['resetPassword'];
} | {
	type: 'suspendRemoteInstance';
	info: ModerationLogPayloads['suspendRemoteInstance'];
} | {
	type: 'unsuspendRemoteInstance';
	info: ModerationLogPayloads['unsuspendRemoteInstance'];
} | {
	type: 'markSensitiveDriveFile';
	info: ModerationLogPayloads['markSensitiveDriveFile'];
} | {
	type: 'unmarkSensitiveDriveFile';
	info: ModerationLogPayloads['unmarkSensitiveDriveFile'];
} | {
	type: 'createInvitation';
	info: ModerationLogPayloads['createInvitation'];
} | {
	type: 'createAd';
	info: ModerationLogPayloads['createAd'];
} | {
	type: 'updateAd';
	info: ModerationLogPayloads['updateAd'];
} | {
	type: 'deleteAd';
	info: ModerationLogPayloads['deleteAd'];
} | {
	type: 'createAvatarDecoration';
	info: ModerationLogPayloads['createAvatarDecoration'];
} | {
	type: 'updateAvatarDecoration';
	info: ModerationLogPayloads['updateAvatarDecoration'];
} | {
	type: 'deleteAvatarDecoration';
	info: ModerationLogPayloads['deleteAvatarDecoration'];
} | {
	type: 'resolveAbuseReport';
	info: ModerationLogPayloads['resolveAbuseReport'];
});
