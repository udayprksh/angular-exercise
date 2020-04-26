import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { seatAvailablityValidator } from 'src/app/common/customvalidator.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  form: FormGroup;
  contactForm: FormGroup;
  seatList = [];
  submitted = false;
  attendeeArray: FormArray;
  noOfBookedSeat: number = 1;
  displayNoOfSeat: number = 6;

  private sub: Subscription;
  protected eventDetails: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {

    this.contactForm = fb.group({
      firstName: '',
      lastName: '',
      email: ''
    });
    this.sub = this.route.paramMap.subscribe(params => {
      this.eventDetails = params.get("totalSeat");
    });
  }

  ngOnInit() {
    this.getListOfSeat(this.displayNoOfSeat);
    this.createForm();
  }

  getListOfSeat(num: number) {
    for (let i = 1; i <= num; i++) {
      this.seatList.push(i);
    }
  }

  createForm() {
    this.form = this.fb.group({
      username: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.pattern('[0-9]{10}')],
      noofseat: ["", [Validators.required, seatAvailablityValidator(this.eventDetails)]],
      attendeeArray: this.fb.array([this.createOtherAttendeeForm()])
    });
  }

  createOtherAttendeeForm() {
    return this.fb.group({
      otherattendee: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    });
  }

  createAttendee(event: any, noOfSeat: number) {
    this.attendeeArray = this.form.get('attendeeArray') as FormArray;
    if (event.source.selected) {
      this.noOfBookedSeat = 1
      if (noOfSeat > 1 && this.eventDetails >= noOfSeat) {
        this.noOfBookedSeat = noOfSeat;
        this.attendeeArray.clear();
        for (let i = 0; i < noOfSeat - 1; i++) {
          this.attendeeArray.push(this.createOtherAttendeeForm());
        }
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
