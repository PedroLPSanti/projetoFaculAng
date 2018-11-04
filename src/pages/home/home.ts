import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { UserPage } from '../user/user';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any[];
  page: number;
  total_page: any[];
  byPage: number;
  constructor(
    public navCtrl: NavController,
    public usersService: UsersServiceProvider
  ) {
    
  }

  ionViewWillEnter() {
    this.selectUsers(1,3);
  }

  selectPage(p){
    this.selectUsers(p, this.byPage);
  }

  selectQtd(p){
    this.selectUsers(this.page, p);
  }

  selectUsers(p, c) {
    this.byPage = c;
    this.usersService.getUsers(p, c).then(dados => {
      this.users = dados.users;
      this.page = dados.page;
      this.total_page = Array(dados.total_pages).fill([]).map((x,i)=>i+1);
    }); 
  }

  selectUser(c) {
    let cn = parseInt(c);
    this.navCtrl.push(UserPage, {codigo: cn, novo: false });
  } 

  newUser() {
    this.navCtrl.push(UserPage, {codigo: 0, novo: true });
  } 
}
