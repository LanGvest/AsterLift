import PageLayout from "@/layouts/page";
import GradientBackground from "@/components/gradientBackground";
import s from "@/styles/about.module.scss";
import BelarusIcon from "@/assets/icons/belarus.icon";
import LogoIcon from "@/assets/icons/logo.icon";
import {getCompanyAge, getCorrectWord} from "@/utils/helpers";
import Config from "@config";

const COMPANY_AGE: number = getCompanyAge();

export default function AboutPage() {
	return (
		<PageLayout title="О предприятии">
			<GradientBackground/>
			<div className={s.description}>
				<div className={s.illustrationWrapper}>
					<div className={s.illustration}>
						<BelarusIcon className={s.belarus}/>
						<div className={s.logo}>
							<LogoIcon/>
							<p>{Config.PROJECT_NAME}</p>
						</div>
					</div>
				</div>
				<div className={s.text}>
					<p>«Астер-Лифт» – гомельское частное производственное унитарное предприятие по изготовлению и вводу
						в эксплуатацию сертифицированного подъёмного оборудования в Беларуси. Более {COMPANY_AGE} {getCorrectWord("лет", "года", "лет", COMPANY_AGE)},
						начиная с 2014 года, «Астер-Лифт» успешно занимается проектированием, производством и монтажом подъёмников для маломобильных групп населения.
						Благодаря налаженному процессу собственного производства предприятие обеспечивает индивидуальный подход к каждому заказчику,
						учитывая его пожелания при проектировании и изготовлении подъёмного оборудования.</p>
				</div>
			</div>

			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
			<h1>About Page!</h1>
		</PageLayout>
	);
}