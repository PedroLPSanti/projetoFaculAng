var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/topromise';
/*
  Generated class for the UsersServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UsersServiceProvider = /** @class */ (function () {
    function UsersServiceProvider(http) {
        this.http = http;
        this.url = 'https://reqres.in/api/';
        this.created = [];
        this.updated = [];
    }
    UsersServiceProvider.prototype.getUsers = function (p, c) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + "users?per_page=" + c + "&page=" + p)
                .toPromise()
                .then(function (res) {
                console.log(res);
                var dados = res['data'];
                var page = res['page'];
                var total_pages = res['total_pages'];
                var total = res['total'];
                var users = [];
                var updated = false;
                for (var i = 0; i < dados.length; i++) {
                    for (var j = 0; j < _this.updated.length; j++) {
                        if (_this.updated[j].codigo == parseInt(dados[i].id)) {
                            users.push({
                                codigo: _this.updated[j].codigo,
                                nome: _this.updated[j].nome
                            });
                            updated = true;
                        }
                    }
                    if (!updated) {
                        users.push({
                            codigo: parseInt(dados[i].id),
                            nome: dados[i].first_name
                        });
                        updated = false;
                    }
                }
                resolve({ users: users, page: page, total_pages: total_pages });
            });
        });
    };
    UsersServiceProvider.prototype.getUser = function (p) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + "users/" + p)
                .toPromise()
                .then(function (res) {
                var dados = res['data'];
                var user = {
                    codigo: parseInt(dados.id),
                    nome: dados.first_name
                };
                resolve(user);
            });
        });
    };
    UsersServiceProvider.prototype.editUser = function (c, n) {
        var _this = this;
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var user = {
            first_name: n
        };
        var body = JSON.stringify(user);
        this.deleteUser(c);
        users.push({
            codigo: parseInt(dados[i].id),
            nome: dados[i].first_name
        });
        return new Promise(function (resolve) {
            _this.http.put(_this.url + "users/" + c, body, { headers: headers })
                .toPromise()
                .then(function (res) { return (resolve(res['data'])); });
        });
    };
    UsersServiceProvider.prototype.deleteUser = function (c) {
        // for(let i=0; i<this.users.length; i++) {
        //   if(this.users[i].codigo == c) {
        //     this.users.splice(i,1);
        //     break;
        //   }
        // }
    };
    UsersServiceProvider.prototype.addUser = function (n) {
        var _this = this;
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var user = {
            first_name: n
        };
        var body = JSON.stringify(user);
        return new Promise(function (resolve) {
            _this.http.post(_this.url + "users", body, { headers: headers })
                .toPromise()
                .then(function (res) {
                resolve(res['data']);
            });
        });
    };
    UsersServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], UsersServiceProvider);
    return UsersServiceProvider;
}());
export { UsersServiceProvider };
//# sourceMappingURL=users-service.js.map