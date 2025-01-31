import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from '../../_models/users/create-user.model';
import { UpdateUser } from '../../_models/users/update-user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private http: HttpClient) {}

    findAll() {
        return this.http.get('http://localhost:3000/users');
    }

    findOne(id: string) {
        return this.http.get(`http://localhost:3000/users/${id}`);
    }

    create(createUserDto: CreateUser) {
        return this.http.post('http://localhost:3000/users', createUserDto);
    }

    update(id: string, updateUserDto: UpdateUser) {
        return this.http
            .patch(`http://localhost:3000/users/${id}`, updateUserDto)
            .subscribe((response: any) => {});
    }

    remove(id: string) {
        return this.http.delete(`http://localhost:3000/users/${id}`);
    }

    setSelectedAccountId(accountId: string) {
        localStorage.setItem('selectedAccountId', accountId);
    }
}
