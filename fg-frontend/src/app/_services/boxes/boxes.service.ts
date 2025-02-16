import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePack } from '../../_models/packs/create-pack.model';
import { UpdatePack } from '../../_models/packs/update-pack.model';
import { CreateBox } from '../../_models/boxes/create-box.model';
import { UpdateBox } from '../../_models/boxes/update-box.model';

@Injectable({ providedIn: 'root' })
export class BoxesService {
    constructor(private http: HttpClient) {}

    findAll() {
        return this.http.get('http://localhost:3000/boxes');
    }

    findOne(id: string) {
        return this.http.get(`http://localhost:3000/boxes/${id}`);
    }

    create(createBoxDto: CreateBox) {
        return this.http.post('http://localhost:3000/boxes', createBoxDto);
    }

    update(id: string, updateBoxDto: UpdateBox) {
        return this.http
            .patch(`http://localhost:3000/boxes/${id}`, updateBoxDto)
            .subscribe((response: any) => {});
    }

    remove(id: string) {
        return this.http.delete(`http://localhost:3000/boxes/${id}`);
    }
}
