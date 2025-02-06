import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateKitElement } from '../../_models/kitelements/create-kit-element.model';
import { UpdateKitElement } from '../../_models/kitelements/update-kit-element.model';

@Injectable({ providedIn: 'root' })
export class KitElementsService {
    private apiUrl = 'http://localhost:3000/kit-elements';

    constructor(private http: HttpClient) {}

    findAll() {
        return this.http.get(`${this.apiUrl}`);
    }

    findOne(id: string) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    create(createKitElementDto: CreateKitElement) {
        return this.http.post(`${this.apiUrl}`, createKitElementDto);
    }

    update(id: string, updateKitElementDto: UpdateKitElement) {
        return this.http
            .patch(`${this.apiUrl}/${id}`, updateKitElementDto)
            .subscribe((response: any) => {});
    }

    remove(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
