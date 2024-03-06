import PageLayout from "@/layouts/page";
import GradientBackground from "@/components/gradientBackground";
import s from "@/styles/about.module.scss";
import BelarusIcon from "@/assets/icons/belarus.icon";
import LogoIcon from "@/assets/icons/logo.icon";
import {combineClasses, getCompanyAge, getCorrectWord} from "@/utils/helpers";
import Config from "@config";
import ContentBlock from "@/ui/contentBlock";
import CERTS from "@/assets/data/certs";
import BreadcrumbsMeta from "@/meta/breadcrumbs.meta";
import React from "react";
import Link from "next/link";
import TelegramLogoIcon from "@/assets/icons/telegramLogo.icon";
import ViberLogoIcon from "@/assets/icons/viberLogo.icon";
import WhatsappLogoIcon from "@/assets/icons/whatsappLogo.icon";
import SmoothImage from "@/ui/smoothImage";

const COMPANY_AGE: number = getCompanyAge();
const IMAGE_SIZE: number = 320;

export default function AboutPage() {
	return (
		<PageLayout title="О предприятии">
			<GradientBackground/>
			<BreadcrumbsMeta currentName="О предприятии"/>
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
			<ContentBlock id="certs" className={s.certificates}>
				<h2>Сертификаты и свидетельства</h2>
				<div className={s.certs}>
					{CERTS.map(cert => (
						<div key={cert.image.src} className={s.cert}>
							<SmoothImage
								src={cert.image}
								width={IMAGE_SIZE}
								height={IMAGE_SIZE * (12 / 10)}
								placeholder="blur"
								alt=""
							/>
							{cert.capture}
						</div>
					))}
				</div>
			</ContentBlock>
			<ContentBlock id="contacts" className={s.contacts}>
				<h2>Контактная информация</h2>
				<div className={s.contactsWrapper}>
					<div className={s.contact}>
						<p className={s.name}>{`Телефон (${Config.CONTACTS.PHONE_OPERATOR})`}</p>
						<a href={`tel:${Config.CONTACTS.PHONE_NUMBER.replace(/[^\d+]/g, "")}`}>{Config.CONTACTS.PHONE_NUMBER}</a>
					</div>
					<div className={s.contact}>
						<p className={s.name}>Email</p>
						<a href={`mailto:${Config.CONTACTS.EMAIL}`}>{Config.CONTACTS.EMAIL}</a>
					</div>
					<div className={s.contact}>
						<p className={s.name}>Почтовый адрес</p>
						<a href={Config.ADDRESS.POSTAL_ADDRESS_LINK}>{`${Config.ADDRESS.POSTAL_CODE}, г. ${Config.ADDRESS.CITY}, ${Config.ADDRESS.POSTAL_STREET}`}</a>
					</div>
					<div className={s.social}>
						<Link
							href={"https://t.me/asterlift"}
							className={combineClasses(s.socialLink, s.telegram)}
							title={"Telegram"}
						>
							<TelegramLogoIcon/>
							<p>Telegram</p>
						</Link>
						<Link
							href={"https://viber.click/375291377466"}
							className={combineClasses(s.socialLink, s.viber)}
							title={"Viber"}
						>
							<ViberLogoIcon/>
							<p>Viber</p>
						</Link>
						<Link
							href={"https://wa.me/375291377466"}
							className={combineClasses(s.socialLink, s.whatsapp)}
							title={"WhatsApp"}
						>
							<WhatsappLogoIcon/>
							<p>WhatsApp</p>
						</Link>
					</div>
					<div className={s.legalInfo}>
						<p>
							{Config.ORGANIZATION.LEGAL_NAME};
							УНП: {Config.ORGANIZATION.UNP};
							Юр. адрес: {Config.ADDRESS.POSTAL_CODE}, {Config.ADDRESS.REGION},
							г. {Config.ADDRESS.CITY}, {Config.ADDRESS.LEGAL_STREET};
							Регистрация в торговом реестре: №1111111 от 13.02.2019;
							Государственная регистрация: от 11.12.2014, Гомельский городской исполнительный комитет;
							Банк: ОАО «Белинвестбанк», г. Минск, пр-т Машерова, д. 29;
							Код банка (BIC): BLBBBY2X;
							Номер счёта (IBAN): BY17BLBB30120491316077001007.
						</p>
					</div>
				</div>
			</ContentBlock>
		</PageLayout>
	);
}