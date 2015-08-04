export class Bar{
	private _age : number;

	constructor(){
		this._age = Math.random();		
	}

	get age(){
		return this._age;
	}
}