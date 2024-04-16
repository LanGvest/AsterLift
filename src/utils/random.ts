export default class Random {
	private readonly m: number;
	private readonly a: number;
	private readonly c: number;
	private state: number;

	constructor(seed?: number) {
		this.m = 0x80000000; // 2**31;
		this.a = 1103515245;
		this.c = 12345;

		this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
	}

	nextInt() {
		this.state = (this.a * this.state + this.c) % this.m;
		return this.state;
	}

	nextFloat() {
		return this.nextInt() / (this.m - 1);
	}

	nextRange(from: number, to: number) {
		// returns in range [start, end): including start, excluding end
		// can't modulu nextInt because of weak randomness in lower bits
		to++;
		const rangeSize = to - from;
		const randomUnder1 = this.nextInt() / this.m;
		return from + Math.floor(randomUnder1 * rangeSize);
	}
}