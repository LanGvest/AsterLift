import type {ImageMedia} from "@/types/media";
import {MediaType} from "@/enums/mediaType";
import type {ReactNode} from "react";

import img1 from "./images/1.webp";
import img2 from "./images/2.webp";
import img3 from "./images/3.webp";
import img4 from "./images/4.webp";
import img5 from "./images/5.webp";
import img6 from "./images/6.webp";
import img7 from "./images/7.webp";
import img8 from "./images/8.webp";
import img9 from "./images/9.webp";
import img10 from "./images/10.webp";
import NoWrap from "@/ui/noWrap";

export interface CertificateMedia extends ImageMedia {
	capture: ReactNode
}

export const CERTS_IMG_1: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img1,
	capture: <p>Свидетельство о государственной регистрации</p>
};

export const CERTS_IMG_2: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img2,
	capture: <p>Регистрация в БелГИСС</p>
};

export const CERTS_IMG_3: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img3,
	capture: <p>Сертификат безопасности <NoWrap>ТР-ТС 010</NoWrap></p>
};

export const CERTS_IMG_4: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img4,
	capture: <p>Декларация <NoWrap>ТР-ТС 004-2011</NoWrap>, <NoWrap>ТР-ТС 020-2011</NoWrap></p>
};

export const CERTS_IMG_5: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img5,
	capture: <p>Сертификат <NoWrap>ISO-9001</NoWrap>, <NoWrap>ISO-14001</NoWrap>, <NoWrap>OHSAS-180010</NoWrap>; <NoWrap>1 стр.</NoWrap></p>
};

export const CERTS_IMG_6: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img6,
	capture: <p>Сертификат <NoWrap>ISO-9001</NoWrap>, <NoWrap>ISO-14001</NoWrap>, <NoWrap>OHSAS-180010</NoWrap>; <NoWrap>2 стр.</NoWrap></p>
};

export const CERTS_IMG_7: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img7,
	capture: <p>Протокол испытаний <NoWrap>ТР-ТС 004</NoWrap> О безопасности низковольтного оборудования</p>
};

export const CERTS_IMG_8: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img8,
	capture: <p>Протокол испытаний <NoWrap>ТР-ТС 020</NoWrap> Электромагнитная совместимость технических средств</p>
};

export const CERTS_IMG_9: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img9,
	capture: <p>Сертификат продукции собственного произодства</p>
};

export const CERTS_IMG_10: CertificateMedia = {
	type: MediaType.IMAGE,
	image: img10,
	capture: <p>Сертификат соответствия <NoWrap>ISO-9001</NoWrap></p>
};