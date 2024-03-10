import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import type {ReactNode} from "react";

interface Props {
	children: ReactNode
}

export function ReCaptchaProvider({children}: Props) {
	return (
		<GoogleReCaptchaProvider
			language="ru"
			scriptProps={{
				async: true,
				defer: true
			}}
			useEnterprise={true}
			reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
		>
			{children}
		</GoogleReCaptchaProvider>
	);
}