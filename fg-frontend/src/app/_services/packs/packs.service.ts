import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePack } from '../../_models/packs/create-pack.model';
import { UpdatePack } from '../../_models/packs/update-pack.model';

@Injectable({ providedIn: 'root' })
export class PacksService {
    constructor(private http: HttpClient) {}

    findAll() {
        return this.http.get('http://localhost:3000/packs');
    }

    findOne(id: string) {
        return this.http.get(`http://localhost:3000/packs/${id}`);
    }

    create(createPackDto: CreatePack) {
        return this.http.post('http://localhost:3000/packs', createPackDto);
    }

    update(id: string, updatePackDto: UpdatePack) {
        return this.http
            .patch(`http://localhost:3000/packs/${id}`, updatePackDto)
            .subscribe((response: any) => {});
    }

    remove(id: string) {
        return this.http.delete(`http://localhost:3000/packs/${id}`);
    }
}
