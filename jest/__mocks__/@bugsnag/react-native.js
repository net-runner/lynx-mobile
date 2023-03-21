export class Client {
	notify = jest.fn();
	getPlugin = () => ({
		createNavigationContainer: arg => arg,
	});
}

const Bugsnag = {
	start: () => new Client(),
};
export default Bugsnag;
