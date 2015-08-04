/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';
import Foo = require('dev/ts/Foo');

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1>Hello {{ name }}</h1>'
})

class MyAppComponent {
  name: string;
  idade: number;
  constructor() {

    var bb = new Foo.Bar();

    console.log( bb.age );

    this.name = 'Alice';
  }
  get userAge() : number{
	  return this.idade;
  }
}

bootstrap(MyAppComponent);