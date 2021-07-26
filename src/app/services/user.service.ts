import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/users`);
    }

    signUp(user: any) {
        return this.http.post(`${environment.apiUrl}/users/signUp`, user);
    }

    delete(id: any) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }

    update(user: any) {
        return this.http.post(`${environment.apiUrl}/users/`, user);
    }
}