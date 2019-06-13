import { DocumentReference } from '@angular/fire/firestore';

export class Reserve {
    item: DocumentReference;
    person: string;
    date: Date;
    time_start: string;
    time_end: string;
    id?: DocumentReference;
}
