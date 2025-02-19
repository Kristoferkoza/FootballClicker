import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMicropayment } from '../../_models/micropayments/create-micropayment.model';
import { UpdateMicropayment } from '../../_models/micropayments/update-micropayment.model';

@Injectable({ providedIn: 'root' })
export class MicroPaymentsService {
    private apiUrl = 'http://localhost:3000/micropayments';

    constructor(private http: HttpClient) {}

    findAll() {
        return this.http.get(`${this.apiUrl}`);
    }

    findOne(id: string) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    create(createMicropaymentDto: CreateMicropayment) {
        return this.http.post(`${this.apiUrl}`, createMicropaymentDto);
    }

    update(id: string, updateMicropaymentDto: UpdateMicropayment) {
        return this.http
            .patch(`${this.apiUrl}/${id}`, updateMicropaymentDto)
            .subscribe((response: any) => {});
    }

    remove(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
