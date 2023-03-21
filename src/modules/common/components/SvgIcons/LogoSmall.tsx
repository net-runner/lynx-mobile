import * as React from 'react';
import Svg, {SvgProps, Path, Circle} from 'react-native-svg';

export const LogoSmall = (props: SvgProps) => (
	<Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
		<Circle cx={15} cy={15} r={15} fill="#00B9AE" />
		<Path
			d="M21.7417 12.9853L23.2617 14.277L22.941 20.0072L20.3394 23.4383L19.7692 18.6985L16.2766 23.12H13.5681L10.1825 18.6985L9.8974 23.4383L7.29581 20.0072L6.79688 14.277L8.28708 12.9853C6.82593 10.4739 8.05756 5.37737 9.34053 5.29248C9.89887 5.29248 10.7171 7.55638 12.1426 9.64331H17.8091C19.2346 7.55638 20.2577 5.29248 20.816 5.29248C22.099 5.37737 23.2029 10.4739 21.7417 12.9853Z"
			fill="white"
		/>
		<Path
			d="M23.2617 14.277L17.8091 9.64331M23.2617 14.277L22.941 20.0072L20.3394 23.4383L19.7692 18.6985M23.2617 14.277L19.7692 18.6985M17.8091 9.64331H12.1426M17.8091 9.64331C19.2346 7.55638 20.2577 5.29248 20.816 5.29248C22.099 5.37737 23.2029 10.4739 21.7417 12.9853M12.1426 9.64331L6.79688 14.277M12.1426 9.64331C10.7171 7.55638 9.89887 5.29248 9.34053 5.29248C8.05756 5.37737 6.82593 10.4739 8.28708 12.9853M6.79688 14.277L10.1825 18.6985M6.79688 14.277L7.29581 20.0072L9.8974 23.4383L10.1825 18.6985M19.7692 18.6985L16.2766 23.12H13.5681L10.1825 18.6985"
			stroke="#00B9AE"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
