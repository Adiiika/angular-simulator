import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

export class FormComponent {
  tourForm = new FormGroup({
    humanName: new FormControl('', Validators.required),
    placeName: new FormControl('', Validators.required)
  })
}