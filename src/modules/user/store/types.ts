export type User = {
	id: string;
	name: string;
	username: string;
	email: string;
	createdAt: Date;
	lasLogin: Date;
	authProvider: number;
};
