import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LayoutService} from '../layout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout-config',
  template: `
    <div class="w-screen h-screen flex items-center justify-center">
        <div class="text-center">
          <div class="font-bold text-xl">Layout</div>
          <div class="mt-5 flex items-center justify-center">
            <input #horizontalInput
                   (keyup)="setHorizontal(horizontalInput.value)"
                   [value]="horizontal"
                   type="text"
                   class="w-10 border rounded text-center p-1">

            <i class="fas fa-times mx-2"></i>
            <input #verticalInput
                   (keyup)="setVertical(verticalInput.value)"
                   [value]="vertical"
                   type="text"
                   class="w-10 border rounded text-center p-1">
          </div>

          <div class="mt-10">
            <div *ngFor="let i of getArray(vertical)"
                 class="flex">
                <div *ngFor="let j of getArray(horizontal)"
                     class="bg-gray-200 rounded m-1"
                     style="height: 100px; width: 100px;"></div>
            </div>
          </div>

          <div class="mt-10">
            <button (click)="next()" class="py-2 px-5 rounded bg-green-500 text-white">Next: MIDI binding</button>
          </div>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class LayoutConfigComponent implements OnInit {

  horizontal = 4;
  vertical = 4;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly layoutService: LayoutService,
              private readonly router: Router) { }

  ngOnInit(): void {
  }

  getArray(count: number): Array<number> {
    const array = new Array<number>(count);
    array.fill(0);
    return array;
  }

  setHorizontal(value: string): void {
    if (!value) {
      return;
    }

    this.horizontal = Number(value);
    this.changeDetectorRef.detectChanges();
  }

  setVertical(value: string): void {
    if (!value) {
      return;
    }

    this.vertical = Number(value);
    this.changeDetectorRef.detectChanges();
  }

  next(): void {
    this.layoutService.setX(this.horizontal);
    this.layoutService.setY(this.vertical);
    this.router.navigateByUrl('/notes');
  }
}
