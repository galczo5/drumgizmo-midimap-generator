import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileXmlService {

  private xmlText: string;

  constructor() { }

  setText(str: string): void {
    this.xmlText = str;
  }
}
