import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/topromise';

/*
  Generated class for the UsersServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersServiceProvider {

  url: string = 'https://reqres.in/api/';
  created: any[] = [];
  updated: any[] = [];
  deleted: any[] = [];

  constructor(public http: HttpClient) { }

  testaUpdade(users, id){
    for(let j=0; j<this.updated.length; j++){
        if(this.updated[j].codigo == parseInt(id)){
          users.push( {
            codigo: this.updated[j].codigo,
            nome: this.updated[j].nome
          });
          return true;
        }
    }
  }

  testaDelete(users, id){
    for(let j=0; j<this.deleted.length; j++){
        if(this.deleted[j].codigo == parseInt(id)){
          return true;
        }
    }
  }

  testaCreate(users){
    for(let j=0; j<this.created.length; j++){
      users.push( {
        codigo: this.created[j].codigo,
        nome: this.created[j].nome
      });
    }
  }


  getUsers(p:number, c: number): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${this.url}users?per_page=${c}&page=${p}`)
      .toPromise()
      .then( res => {
        const dados = res['data'];
        const page = res['page'];
        const total_pages = res['total_pages'];
        const total = res['total'];
        let users = [];
        let updated = false;
        for(let i=0; i<dados.length; i++){
          updated = this.testaUpdade(users, dados[i].id);
          updated = this.testaDelete(users, dados[i].id);
          if(!updated){
            users.push( {
              codigo: parseInt(dados[i].id),
              nome: dados[i].first_name
            });
          }
          updated = false;
        }
        if(total_pages <= page && c < (this.created.length + users.length)){
          this.testaCreate(users);
        }
        resolve({users, page, total_pages});
      });
    });
  }


  getUser(p:number): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${this.url}users/${p}`)
      .toPromise()
      .then(res => {       
        let dados = res['data'];
        let user = {
          codigo: parseInt(dados.id),
          nome: dados.first_name
        };
        resolve(user);
      });
    });
  }


  editUser(c:number, n:string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let user = {
      first_name: n
    };
    let body = JSON.stringify(user);

    this.deleteUpdate(c);    

    this.updated.push( {
      codigo: c,
      nome: n
    });

    return new Promise(resolve => {
      this.http.put(`${this.url}users/${c}`, body, { headers })
      .toPromise()
      .then(res=> (resolve(res['data'])));
    });
  }

  deleteUpdate(c:number) {
    for(let i=0; i<this.updated.length; i++) {
      if(this.updated[i].codigo == c) {
        this.updated.splice(i,1);
        break;
      }
    }
  }

  deleteCreated(c:number) {
    for(let i=0; i<this.created.length; i++) {
      if(this.created[i].codigo == c) {
        this.created.splice(i,1);
        break;
      }
    }
  }

  deleteDeleted(c:number) {
    for(let i=0; i<this.deleted.length; i++) {
      if(this.deleted[i].codigo == c) {
        this.deleted.splice(i,1);
        break;
      }
    }
  }

  deleteUser(c:number) {
    this.deleteCreated(c);
    this.deleteUpdate(c);
    this.deleteDeleted(c);

    this.deleted.push({
      codigo: c,
    });
  }

  addUser(n:string): Promise<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let user = {
      first_name: n
    };
    let body = JSON.stringify(user);
    return new Promise(resolve => {
      this.http.post(`${this.url}users`, body, {headers: headers})
      .toPromise()
      .then(res=>{
        this.created.push({
          codigo: parseInt(res['id']),
          nome: res['first_name']
        })

        resolve(res);
      });
    });
  }
}
