import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Array<Array<number>>;

  constructor() { }

  setNotes(notes: Array<Array<number>>): void {
    this.notes = notes;
  }

  getNotes(): Array<Array<number>> {
    return this.notes;
  }
}
