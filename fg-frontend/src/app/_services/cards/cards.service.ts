import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCard } from '../../_models/cards/create-card.model';
import { UpdateCard } from '../../_models/cards/update-card.model';

@Injectable({ providedIn: 'root' })
export class CardsService {
    constructor(private http: HttpClient) {}

    findAll() {
        return this.http.get('http://localhost:3000/cards');
    }

    findOne(id: string) {
        return this.http.get(`http://localhost:3000/cards/${id}`);
    }

    create(createCardDto: CreateCard) {
        return this.http.post('http://localhost:3000/cards', createCardDto);
    }

    update(id: string, updateCardDto: UpdateCard) {
        return this.http
            .patch(`http://localhost:3000/cards/${id}`, updateCardDto)
            .subscribe((response: any) => {});
    }

    remove(id: string) {
        return this.http.delete(`http://localhost:3000/cards/${id}`);
    }
}
