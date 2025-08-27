// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModerationLogObject = any;

export const notificationTypes = ['follow', 'mention', 'reply', 'renote', 'quote', 'reaction', 'pollVote', 'pollEnded', 'receiveFollowRequest', 'followRequestAccepted', 'groupInvited', 'app', 'chatMessageReceived'] as const;

export const noteVisibilities = ['public', 'home', 'followers', 'specified'] as const;

export const mutedNoteReasons = ['word', 'manual', 'spam', 'other'] as const;

export const ffVisibility = ['public', 'followers', 'private'] as const;

export const permissions = [
	'read:account',
	'write:account',
	'read:blocks',
	'write:blocks',
	'read:drive',
	'write:drive',
	'read:favorites',
	'write:favorites',
	'read:following',
	'write:following',
	'read:messaging',
	'write:messaging',
	'read:mutes',
	'write:mutes',
	'write:notes',
	'read:notifications',
	'write:notifications',
	'read:reactions',
	'write:reactions',
	'write:votes',
	'read:pages',
	'write:pages',
	'write:page-likes',
	'read:page-likes',
	'read:user-groups',
	'write:user-groups',
	'read:gallery',
	'write:gallery',
	'read:gallery-likes',
	'write:gallery-likes',
];

export const moderationLogTypes = [
	'updateServerSettings',
	'suspend',
	'unsuspend',
	'updateUserNote',
	'addCustomEmoji',
	'updateCustomEmoji',
	'deleteCustomEmoji',
	'assignRole',
	'unassignRole',
	'createRole',
	'updateRole',
	'deleteRole',
	'clearQueue',
	'promoteQueue',
	'deleteDriveFile',
	'deleteNote',
	'createGlobalAnnouncement',
	'createUserAnnouncement',
	'updateGlobalAnnouncement',
	'updateUserAnnouncement',
	'deleteGlobalAnnouncement',
	'deleteUserAnnouncement',
	'resetPassword',
	'suspendRemoteInstance',
	'unsuspendRemoteInstance',
	'markSensitiveDriveFile',
	'unmarkSensitiveDriveFile',
	'resolveAbuseReport',
	'createInvitation',
	'createAd',
	'updateAd',
	'deleteAd',
	'createAvatarDecoration',
	'updateAvatarDecoration',
	'deleteAvatarDecoration',
] as const;

export type ModerationLogPayloads = {
	updateServerSettings: {
		before: ModerationLogObject | null;
		after: ModerationLogObject | null;
	};
	suspend: {
		userId: string;
		userUsername: string;
		userHost: string | null;
	};
	unsuspend: {
		userId: string;
		userUsername: string;
		userHost: string | null;
	};
	updateUserNote: {
		userId: string;
		userUsername: string;
		userHost: string | null;
		before: string | null;
		after: string | null;
	};
	addCustomEmoji: {
		emojiId: string;
		emoji: ModerationLogObject;
	};
	updateCustomEmoji: {
		emojiId: string;
		before: ModerationLogObject;
		after: ModerationLogObject;
	};
	deleteCustomEmoji: {
		emojiId: string;
		emoji: ModerationLogObject;
	};
	assignRole: {
		userId: string;
		userUsername: string;
		userHost: string | null;
		roleId: string;
		roleName: string;
		expiresAt: string | null;
	};
	unassignRole: {
		userId: string;
		userUsername: string;
		userHost: string | null;
		roleId: string;
		roleName: string;
	};
	createRole: {
		roleId: string;
		role: ModerationLogObject;
	};
	updateRole: {
		roleId: string;
		before: ModerationLogObject;
		after: ModerationLogObject;
	};
	deleteRole: {
		roleId: string;
		role: ModerationLogObject;
	};
	clearQueue: Record<string, never>;
	promoteQueue: Record<string, never>;
	deleteDriveFile: {
		fileId: string;
		fileUserId: string | null;
		fileUserUsername: string | null;
		fileUserHost: string | null;
	};
	deleteNote: {
		noteId: string;
		noteUserId: string;
		noteUserUsername: string;
		noteUserHost: string | null;
		note: ModerationLogObject;
	};
	createGlobalAnnouncement: {
		announcementId: string;
		announcement: ModerationLogObject;
	};
	createUserAnnouncement: {
		announcementId: string;
		announcement: ModerationLogObject;
		userId: string;
		userUsername: string;
		userHost: string | null;
	};
	updateGlobalAnnouncement: {
		announcementId: string;
		before: ModerationLogObject;
		after: ModerationLogObject;
	};
	updateUserAnnouncement: {
		announcementId: string;
		before: ModerationLogObject;
		after: ModerationLogObject;
		userId: string;
		userUsername: string;
		userHost: string | null;
	};
	deleteGlobalAnnouncement: {
		announcementId: string;
		announcement: ModerationLogObject;
	};
	deleteUserAnnouncement: {
		announcementId: string;
		announcement: ModerationLogObject;
		userId: string;
		userUsername: string;
		userHost: string | null;
	};
	resetPassword: {
		userId: string;
		userUsername: string;
		userHost: string | null;
	};
	suspendRemoteInstance: {
		id: string;
		host: string;
	};
	unsuspendRemoteInstance: {
		id: string;
		host: string;
	};
	markSensitiveDriveFile: {
		fileId: string;
		fileUserId: string | null;
		fileUserUsername: string | null;
		fileUserHost: string | null;
	};
	unmarkSensitiveDriveFile: {
		fileId: string;
		fileUserId: string | null;
		fileUserUsername: string | null;
		fileUserHost: string | null;
	};
	resolveAbuseReport: {
		reportId: string;
		report: ModerationLogObject;
		forwarded: boolean;
	};
	createInvitation: {
		invitations: ModerationLogObject[];
	};
	createAd: {
		adId: string;
		ad: ModerationLogObject;
	};
	updateAd: {
		adId: string;
		before: ModerationLogObject;
		after: ModerationLogObject;
	};
	deleteAd: {
		adId: string;
		ad: ModerationLogObject;
	};
	createAvatarDecoration: {
		avatarDecorationId: string;
		avatarDecoration: ModerationLogObject;
	};
	updateAvatarDecoration: {
		avatarDecorationId: string;
		before: ModerationLogObject;
		after: ModerationLogObject;
	};
	deleteAvatarDecoration: {
		avatarDecorationId: string;
		avatarDecoration: ModerationLogObject;
	};
};
