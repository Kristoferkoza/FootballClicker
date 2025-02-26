import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserKitElementConfig } from '../../_models/userkitelementconfig/user-kitelementconfig.model';

@Injectable({
  providedIn: 'root',
})
export class UserKitElementConfigService {
  private apiUrl = 'http://localhost:3000/user-kitelementconfig';

  constructor(private http: HttpClient) {}

  getUserKitConfig(userId: string): Observable<UserKitElementConfig> {
    return this.http.get<UserKitElementConfig>(`${this.apiUrl}/${userId}`);
  }

  getUserBonus(userId: string): Observable<number> {
    return this.getUserKitConfig(userId).pipe(
      map(config => config.bonus)
    );
  }

  updateUserKitConfig(userId: string, config: Partial<UserKitElementConfig>): Observable<UserKitElementConfig> {
    return this.http.patch<UserKitElementConfig>(`${this.apiUrl}/${userId}`, config);
  }
}
