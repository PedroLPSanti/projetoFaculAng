import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
	UsersServiceProvider
} from '../../providers/users-service/users-service';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  users: any[];
	codigoUser: number;
  nomeUser: string = "";
  novo: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UsersServiceProvider
  ) {
    this.codigoUser = navParams.get('codigo');
    this.novo = navParams.get('novo');
    if(!this.novo) {
      userService.getUser(this.codigoUser)
      .then(dados=>{
          this.nomeUser = dados.nome;
      });
    }
  }

  update() {
    this.userService.editUser(this.codigoUser, this.nomeUser);
    this.navCtrl.pop();    
  }

  delete() {
    this.userService.deleteUser(this.codigoUser);
    this.navCtrl.pop();
  }

  create() {
    this.userService.addUser(this.nomeUser);
    this.navCtrl.pop();
  }

}
