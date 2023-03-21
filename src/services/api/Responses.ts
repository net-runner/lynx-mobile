import {CompleteLinkgroup, Link, Review, TagWithCount} from '../../modules/lynx/store/types';
import {User} from '../../modules/user/store/types';

export type AuthMeResponse = User;

export type LinkGroupResponse = {currentPage: number; groups: CompleteLinkgroup[]};

export type TagGroupResponse = {tagLinkGroups: CompleteLinkgroup[]};

export type UserGroupResponse = {linkGroups: CompleteLinkgroup[]};

export type TagResponse = TagWithCount[];

export type ReviewResponse = Review;

export type CreateLinkResponse = Link;
