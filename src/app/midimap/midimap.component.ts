import {Component, OnInit} from '@angular/core';
import {NotesService} from '../notes.service';
import {FileXmlService} from '../file-xml.service';
import {js2xml} from 'xml-js';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-midimap',
  template: `
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="container flex w-screen flex-wrap">
          <div *ngFor="let instrument of instruments"
               (click)="selectInstrument(instrument)"
               [class.bg-blue-200]="instrument === selectedInstrument"
               [class.border-blue-200]="instrument === selectedInstrument"
               class="border rounded px-5 px-2 m-1">
            {{ instrument }}
          </div>
        </div>
        <div class="mt-10 flex flex-col items-center justify-center">
          <div *ngFor="let row of map; let i = index"
               class="flex">
            <div *ngFor="let column of row; let j = index"
                 (click)="assignInstrument(map[i][j])"
                 class="bg-gray-200 rounded m-1 flex flex-col items-center justify-center"
                 [class.bg-blue-200]="j === x && i === y"
                 style="height: 150px; width: 150px;">
              <span *ngIf="map[i][j]" class="font-bold text-gray-500">
                {{ map[i][j] }}
              </span>
              <span class="text-gray-500">
                {{ assignedInstruments.get(map[i][j]) }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <button (click)="download()" class="py-2 px-5 rounded bg-green-500 text-white">Download midimap</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MidimapComponent implements OnInit {

  map: Array<Array<number>>;

  assignedInstruments = new Map<number, string>();

  instruments: Array<string> = [];
  selectedInstrument: string;

  constructor(private readonly notesService: NotesService,
              private readonly fileXmlService: FileXmlService) {
  }

  ngOnInit(): void {
    this.map = this.notesService.getNotes();
    this.instruments = this.fileXmlService.getInstruments();
    this.selectedInstrument = this.instruments[0];
  }

  assignInstrument(note: number): void {
    this.assignedInstruments.set(note, this.selectedInstrument);
  }

  selectInstrument(instrument: string): void {
    this.selectedInstrument = instrument;
  }

  getArray(count: number): Array<number> {
    const array = new Array<number>(count);
    array.fill(0);
    return array;
  }

  download(): void {

    const result = {
      midimap: {
        map: Array.from(this.assignedInstruments.entries())
          .map(e => ({
            _attributes: {
              note: e[0],
              instr: e[1]
            }
          }))
      }
    };

    const xml = js2xml(result, {compact: true, spaces: 4});
    const blob = new Blob([xml], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'midimap.xml');
  }

}
