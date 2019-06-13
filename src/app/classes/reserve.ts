import { DocumentReference } from '@angular/fire/firestore';

export class Reserve {
    item: DocumentReference;
    person: string;
    date: Date;
    time_start: number;
    time_end: number;
}
