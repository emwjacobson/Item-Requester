import { DocumentReference } from '@angular/fire/firestore';

export class Reserve {
    item: DocumentReference;
    date: Date;
    time_start: number;
    time_end: number;
}
