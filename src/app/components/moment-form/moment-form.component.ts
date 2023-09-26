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

  momentForm!: FormGroup;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      titleForm: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descForm: new FormControl('', [Validators.required, Validators.minLength(5)]),
      image: new FormControl('')
    });
  }

  get title() {
    return this.momentForm.get('titleForm')!;
  }

  get desc() {
    return this.momentForm.get('descForm')!;
  }

  onFileSelected(event: any) {
    const inputFile: File = event.target.files[0];

    this.momentForm.patchValue({ image: inputFile })
  }

  submit() {

    if (this.momentForm.invalid) {
      return
    }

    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);

  }
}
