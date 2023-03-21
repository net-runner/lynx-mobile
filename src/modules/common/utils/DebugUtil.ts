import {enableLogging} from 'mobx-logger';

export class DebugUtil {
	static enableMobxLogs() {
		enableLogging({
			predicate: () => __DEV__,
			action: true,
			reaction: true,
			transaction: true,
			compute: true,
		});
	}
}
