/* eslint-disable @next/next/no-img-element */

const COUNTER_ID: number = 96598013;

const COUNTER_PROPS = {
	clickmap: true,
	trackLinks: true,
	accurateTrackBounce: true,
	webvisor: true
};

export function getYandexMetrikaScriptCode(): string {
	return `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${COUNTER_ID},"init",${JSON.stringify(COUNTER_PROPS)});`;
}

export function YandexMetrikaNoScript() {
	return (
		<noscript>
			<img src={`https://mc.yandex.ru/watch/${COUNTER_ID}`} style={{
				position: "absolute",
				left: -9999
			}} alt=""/>
		</noscript>
	);
}