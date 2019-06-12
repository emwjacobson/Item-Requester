import { DocumentReference } from '@angular/fire/firestore';

export class Item {
    name: string;
    id?: DocumentReference;
}
