import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LayoutService} from '../layout.service';
import {Router} from '@angular/router';

declare const navigator: any;

@Component({
  selector: 'app-notes-config',
  template: `
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="font-bold text-xl">Tap selected pad on midi controller</div>
        <div class="mt-10">
          <div *ngFor="let _ of getArray(vertical); let i = index"
               class="flex">
            <div *ngFor="let _ of getArray(horizontal); let j = index"
                 class="bg-gray-200 rounded m-1 flex items-center justify-center"
                 [class.bg-blue-500]="j === x && i === y"
                 style="height: 100px; width: 100px;">
              <span *ngIf="map[i][j]" class="font-bold text-gray-500">
                {{ map[i][j] }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <button class="py-2 px-5 rounded bg-green-500 text-white">Next: Midimap</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class NotesConfigComponent implements OnInit {

  horizontal = 4;
  vertical = 4;

  x = 0;
  y = 0;

  map: Array<Array<number>>;

  constructor(private readonly layoutService: LayoutService) { }

  ngOnInit(): void {
    this.horizontal = this.layoutService.getX();
    this.vertical = this.layoutService.getY();

    this.map = new Array(this.vertical);
    this.map.fill(new Array<number>(this.vertical));
    this.map.forEach(x => x.fill(0));

    if (navigator.requestMIDIAccess) {
      console.log('WebMIDI is supported in this browser.');
      navigator.requestMIDIAccess()
        .then(onMIDISuccess);

    } else {
      console.log('WebMIDI is not supported in this browser.');
    }

    function onMIDISuccess(midiAccess) {

      var inputs = midiAccess.inputs;
      var outputs = midiAccess.outputs;

      for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
      }
    }

    function getMIDIMessage(message) {
      var command = message.data[0];
      var note = message.data[1];
      var velocity = message.data[2];
      console.log('Command: ' + command + ' , Note: ' + note + ' , Velocity: ' + velocity);
    }


  }

  getArray(count: number): Array<number> {
    const array = new Array<number>(count);
    array.fill(0);
    return array;
  }

}
