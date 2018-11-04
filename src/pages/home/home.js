var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { UserPage } from '../user/user';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, usersService) {
        this.navCtrl = navCtrl;
        this.usersService = usersService;
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.selectUsers(1, 3);
    };
    HomePage.prototype.selectPage = function (p) {
        this.selectUsers(p, this.byPage);
    };
    HomePage.prototype.selectQtd = function (p) {
        this.selectUsers(this.page, p);
    };
    HomePage.prototype.selectUsers = function (p, c) {
        var _this = this;
        this.byPage = c;
        this.usersService.getUsers(p, c).then(function (dados) {
            _this.users = dados.users;
            _this.page = dados.page;
            _this.total_page = Array(dados.total_pages).fill([]).map(function (x, i) { return i + 1; });
        });
    };
    HomePage.prototype.selectUser = function (c) {
        var cn = parseInt(c);
        this.navCtrl.push(UserPage, { codigo: cn, novo: false });
    };
    HomePage.prototype.newUser = function () {
        this.navCtrl.push(UserPage, { codigo: 0, novo: true });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            UsersServiceProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map