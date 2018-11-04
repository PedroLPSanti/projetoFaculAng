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
import { NavController, NavParams } from 'ionic-angular';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserPage = /** @class */ (function () {
    function UserPage(navCtrl, navParams, userService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.nomeUser = "";
        this.codigoUser = navParams.get('codigo');
        this.novo = navParams.get('novo');
        if (!this.novo) {
            userService.getUser(this.codigoUser)
                .then(function (dados) {
                _this.nomeUser = dados.nome;
            });
        }
    }
    UserPage.prototype.update = function () {
        this.userService.editUser(this.codigoUser, this.nomeUser);
        this.navCtrl.pop();
    };
    UserPage.prototype.delete = function () {
        this.userService.deleteUser(this.codigoUser);
        this.navCtrl.pop();
    };
    UserPage.prototype.create = function () {
        this.userService.addUser(this.nomeUser);
        this.navCtrl.pop();
    };
    UserPage = __decorate([
        Component({
            selector: 'page-user',
            templateUrl: 'user.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            UsersServiceProvider])
    ], UserPage);
    return UserPage;
}());
export { UserPage };
//# sourceMappingURL=user.js.map