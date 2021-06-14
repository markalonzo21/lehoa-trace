import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VaccineService } from "../core/vaccine.service";
import { STEPS } from "../models/vaccine-forms";
import Swal from "sweetalert2";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-vaccine-registration",
  templateUrl: "./vaccine-registration.page.html",
  styleUrls: ["./vaccine-registration.page.scss"],
})
export class VaccineRegistrationPage implements OnInit {
  steps: Array<any>;
  activeStepIndex: number;
  formData: any;
  masterFormFields: Array<string>;
  masterForm: Array<FormGroup> = [];
  currentFormContent: Array<any> = [];
  formFields: Array<Array<string>> = [];

  constructor(
    private fb: FormBuilder,
    private vaccineSrvc: VaccineService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.steps = STEPS;
    this.activeStepIndex = 0;

    this.steps.forEach((data, i) => {
      // hold name, validators, placeholders of all steps
      this.currentFormContent.push(this.steps[i]["data"]);
      // holds string values for each field of all steps
      this.formFields.push(Object.keys(this.currentFormContent[i]));
      // holds all form group
      this.masterForm.push(this.buildForm(this.currentFormContent[i]));
    });
  }

  // build seperate formgroups for each form
  buildForm(currentFormContent: any) {
    const formDetails = Object.keys(currentFormContent).reduce((obj, key) => {
      obj[key] = [
        currentFormContent[key].default,
        this.getValidators(currentFormContent[key]),
      ];
      return obj;
    }, {});

    return this.fb.group(formDetails);
  }

  // get validators of each fields
  getValidators(formField: any): Validators {
    const formValidators = Object.keys(formField.validations).map(
      (validator) => {
        if (validator === "required") {
          return Validators[validator];
        } else {
          return Validators[validator](formField.validations[validator]);
        }
      }
    );

    return formValidators;
  }

  // get validation error messages per error, per field
  getValidationMessage(formIndex: number, formFieldName: string): string {
    const formErrors = this.masterForm[formIndex].get(formFieldName).errors;
    const errorMessages =
      this.currentFormContent[formIndex][formFieldName].errors;
    const validationError = errorMessages[Object.keys(formErrors)[0]];

    return validationError;
  }

  // consolidate form data
  setFormPreview(): void {
    this.formData = this.masterForm.reduce(
      (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
      {}
    );

    console.log(this.masterForm);

    this.masterFormFields = Object.keys(this.formData);
  }

  onValueChange(event: any, form: FormGroup, field: string) {
    form.controls[field].setValue(event === true ? "yes" : "no");
  }

  onFormSubmit() {
    const [person_info, medical_info, privacy_info] = this.masterForm;
    console.log({
      person_info: person_info.value,
      medical_info: medical_info.value,
      privacy_info: privacy_info,
    });
    this.vaccineSrvc
      .register({
        person_info: person_info.value,
        medical_info: medical_info.value,
        privacy_info: privacy_info.value,
      })
      .subscribe(
        (res) => {
          console.log(res);
          Swal.fire({
            title: "Vaccine Pre-registration",
            text: "Please wait for the confirmation of your scheduled vaccination via text or email.",
            icon: "success",
            confirmButtonText: "Okay",
            confirmButtonColor: "#3c6cb9",
          }).then((res) => {
            this.masterForm = [];
            this.router.navigate(["/"], { replaceUrl: true });
          });
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: "Vaccine Pre-registration Failed",
            text: "Opps Something went wrong, Please check your details if all are valid and correct.",
            icon: "error",
            confirmButtonText: "Okay",
            confirmButtonColor: "#3c6cb9",
          });
        }
      );
  }

  trackByFn(index: number): number {
    return index;
  }

  goToStep(step: string) {
    this.activeStepIndex =
      step === "prev" ? this.activeStepIndex - 1 : this.activeStepIndex + 1;

    this.setFormPreview();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Sending..",
      spinner: "bubbles",
    });
    await loading.present();
  }
}
