// user-cards.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCards } from '../../_models/usercard/user-cards.model';

@Injectable({
  providedIn: 'root'
})
export class UserCardsService {
  private apiUrl = 'http://localhost:3000/user-cards';

  constructor(private http: HttpClient) { }

  addCard(userId: string, cardId: string) {
    const url = `${this.apiUrl}/${userId}/${cardId}`;
    return this.http.post<UserCards>(url, {});
  }

  getUserCards(userId: string): Observable<UserCards[]> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<UserCards[]>(url);
  }
}
