import { Injectable } from '@angular/core';
import { xml2js } from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class FileXmlService {

  private xmlText: string;
  private json: any;

  constructor() { }

  setText(str: string): void {
    this.json = xml2js(str);
    this.xmlText = str;
  }

  getInstruments(): Array<string> {
    return this.json.elements
      .find(e => e.name === 'drumkit')
      .elements
      .find(e => e.name === 'instruments')
      .elements
      .map(e => e.attributes.name);
  }
}
