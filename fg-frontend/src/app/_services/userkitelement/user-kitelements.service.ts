import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserKitElements } from "../../_models/userkitelement/user-kitelement.model";

@Injectable({
  providedIn: 'root'
})
export class UserKitElementsService {
    private apiUrl = 'http://localhost:3000/user-kitelements';

    constructor(private http: HttpClient) {}

    addKitElement(userId: string, kitElementId: string) {
        const url = `${this.apiUrl}/${userId}/${kitElementId}`;
        return this.http.post<UserKitElements>(url, {});
      }
    
    getUserKitElements(userId: string): Observable<UserKitElements[]> {
        const url = `${this.apiUrl}/${userId}`;
        return this.http.get<UserKitElements[]>(url);
      }
}