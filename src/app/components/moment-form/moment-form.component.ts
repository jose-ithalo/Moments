import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Moment from 'src/app/interfaces/Moments';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @Input() btnText!: string
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),

      title: new FormControl(this.momentData ? this.momentData.title : '',
        [Validators.required, Validators.minLength(3)]),

      description: new FormControl(this.momentData ? this.momentData.description : '',
        [Validators.required, Validators.minLength(5)]),

      image: new FormControl('')
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get desc() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const inputFile: File = event.target.files[0];

    this.momentForm.patchValue({ image: inputFile })
  }

  submit() {

    if (this.momentForm.invalid) {
      return
    }

    this.onSubmit.emit(this.momentForm.value);

  }
}
