export type LinkGroup = {
	id: string;
	owner: string;
	name: string;
	groupname: string;
	description: string;
	picture: string;
	stars: number;
	watcherCount: number;
	linkedCount: number;
	linksCount: number;
	privacyLevel: number;
};
export type Link = {
	id: string;
	link: string;
	privacyLevel: number;
	owner: string | null;
	stars: number;
	description: string | null;
	groupId: string | null;
};
export type Review = {
	id: string;
	score: number;
	description: string;
	creatorName: string;
	groupId: string | null;
};
export type Tag = {
	id: string;
	name: string;
};
export type GroupTag = {
	id: string;
	groupId: string;
	tagId: string;
};
export type CompleteLinkgroup = LinkGroup & {
	tags: GroupTag[];
	links: Link[];
	reviews: Review[];
};
export type TagWithCount = Tag & {_count: {Groups: number}};
