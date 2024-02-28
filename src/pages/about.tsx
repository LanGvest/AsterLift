import PageLayout from "@/layouts/page";
import GradientBackground from "@/components/gradientBackground";
import s from "@/styles/about.module.scss";
import BelarusIcon from "@/assets/icons/belarus.icon";
import LogoIcon from "@/assets/icons/logo.icon";
import {getCompanyAge, getCorrectWord} from "@/utils/helpers";
import Config from "@config";
import ContentBlock from "@/ui/contentBlock";
import Image from "next/image";
import Slider from "@/ui/slider";
import CERTS from "@/assets/data/certs";

const COMPANY_AGE: number = getCompanyAge();

export default function AboutPage() {
	return (
		<PageLayout title="О предприятии">
			<GradientBackground/>
			<ContentBlock className={s.description}>
				<div className={s.illustration}>
					<BelarusIcon className={s.belarus}/>
					<BelarusIcon className={s.belarus}/>
					<div className={s.logo}>
						<LogoIcon/>
						<p>{Config.PROJECT_NAME}</p>
					</div>
				</div>
				<div className={s.text}>
					{/*<h1>{Config.PROJECT_NAME}</h1>*/}
					<p><span>«{Config.PROJECT_NAME}»</span> – гомельское частное производственное унитарное предприятие по
						изготовлению и вводу
						в эксплуатацию сертифицированного подъёмного оборудования в Беларуси.</p>
					<p>Более {COMPANY_AGE} {getCorrectWord("лет", "года", "лет", COMPANY_AGE)},
						начиная с 2014 года, «{Config.PROJECT_NAME}» успешно занимается проектированием, производством и
						монтажом подъёмников для маломобильных групп населения.</p>
					<p>Благодаря налаженному процессу собственного производства предприятие обеспечивает индивидуальный
						подход к каждому заказчику,
						учитывая его пожелания при проектировании и изготовлении подъёмного оборудования.</p>
				</div>
			</ContentBlock>
			<ContentBlock id="certs" className={s.carousel}>
				<h2>Сертификаты и свидетельства</h2>
				<Slider
					gap={20}
					slidesPerView={5}
					items={CERTS}
					// freeModeModule={FreeMode}
					// onClickSlide={(swiper, _item, index) => {
					// 	openFullscreenProductExamples({
					// 		product,
					// 		controller: {
					// 			swiper,
					// 			loop: false
					// 		},
					// 		initialSlide: index
					// 	});
					// }}
					getSlideMeta={item => ({
						description: item.name
					})}
					getSlideKey={cert => cert.image.src}
					renderSlide={cert => (
						<Image
							src={cert.image}
							// width={IMAGE_SIZE}
							// height={IMAGE_SIZE * (12 / 10)}
							placeholder="blur"
							alt={cert.description!}
							title={cert.description!}
						/>
					)}
				/>
			</ContentBlock>
			{/*<ContentBlock id="reviews" className={s.carousel}>*/}
			{/*	<h2>Отзывы</h2>*/}
			{/*	<Slider*/}
			{/*		gap={20}*/}
			{/*		slidesPerView={4}*/}
			{/*		items={CERTS}*/}
			{/*		getSlideMeta={item => ({*/}
			{/*			description: item.name*/}
			{/*		})}*/}
			{/*		getSlideKey={cert => cert.image.src}*/}
			{/*		renderSlide={cert => (*/}
			{/*			<Image*/}
			{/*				src={cert.image}*/}
			{/*				// width={IMAGE_SIZE}*/}
			{/*				// height={IMAGE_SIZE * (12 / 10)}*/}
			{/*				placeholder="blur"*/}
			{/*				alt={cert.description!}*/}
			{/*				title={cert.description!}*/}
			{/*			/>*/}
			{/*		)}*/}
			{/*	/>*/}
			{/*</ContentBlock>*/}
		</PageLayout>
	);
}