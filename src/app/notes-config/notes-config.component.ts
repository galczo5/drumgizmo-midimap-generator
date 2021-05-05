/* tslint:disable:no-var-keyword */
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LayoutService} from '../layout.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NotesService} from '../notes.service';

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
                 [class.bg-blue-200]="j === x && i === y"
                 style="height: 100px; width: 100px;">
              <span *ngIf="map[i][j]" class="font-bold text-gray-500">
                {{ map[i][j] }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <button (click)="next()" class="py-2 px-5 rounded bg-green-500 text-white">Next: Midimap</button>
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

  private notes$: Subject<number> = new Subject<number>();

  constructor(private readonly layoutService: LayoutService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly router: Router,
              private readonly notesService: NotesService) { }

  ngOnInit(): void {
    this.horizontal = this.layoutService.getX();
    this.vertical = this.layoutService.getY();

    this.map = new Array(this.vertical);
    this.map.fill(null);

    this.map = this.map.map(() => new Array<number>(this.vertical));
    this.map.forEach(x => x.fill(0));

    const onMIDISuccess = (midiAccess) => {

      const inputs = midiAccess.inputs;
      const outputs = midiAccess.outputs;

      for (const input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
      }
    };

    const getMIDIMessage = (message) => {
      const note = message.data[1];
      this.notes$.next(note);
    };

    this.notes$
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(note => {
        this.map[this.y][this.x] = note;
        this.x = (this.x + 1) % this.horizontal;

        if (this.x === 0) {
          this.y = (this.y + 1) % this.vertical;
        }

        this.changeDetectorRef.detectChanges();
      });

    if (navigator.requestMIDIAccess) {
      console.log('WebMIDI is supported in this browser.');
      navigator.requestMIDIAccess()
        .then(onMIDISuccess);

    } else {
      console.log('WebMIDI is not supported in this browser.');
    }
  }

  getArray(count: number): Array<number> {
    const array = new Array<number>(count);
    array.fill(0);
    return array;
  }

  next(): void {
    this.notesService.setNotes(this.map);
    this.router.navigateByUrl('/file');
  }

}
