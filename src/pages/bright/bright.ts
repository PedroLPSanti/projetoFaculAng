import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Brightness } from '@ionic-native/brightness';

/**
 * Generated class for the BrightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bright',
  templateUrl: 'bright.html',
})
export class BrightPage {

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private brightness: Brightness
  	) {
  }

  ionViewDidLoad() {
  	const c = {realIndex: 0};
	this.changeBrightness(c);
  }

  changeBrightness(c){
  	this.brightness.setBrightness(c*0.5);
  }

}
