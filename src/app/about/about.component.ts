import { Component, Injectable } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: `app-about`,
    template: `
    <section>
        <label for="framework">
            Favorite Framework:
            <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
        </label> <br/>
        <button (click)="showFramework()">Show Framework</button>

        <div>
            <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
                <label>
                    Name
                    <input type="text" formControlName="name"/>
                </label>
                <label>
                    Email
                    <input type="email" formControlName="email"/>
                </label>
                <button type="submit" [disabled]="!profileForm.valid">Submit</button>
            </form>
        </div> <hr/>

        <div>
            <h2>Profile Form</h2>
            <p><u>Name:</u> {{ user_name }}</p>
            <p><u>Email:</u> {{ user_email }}</p>
        </div>
    </section>
    `,
    styles: `
        div {
            margin-top: 8px;
        }
        button {
            margin-left: 8px;
        }
        p {
            margin-left: 8px;
        }
    `,
    imports: [FormsModule, ReactiveFormsModule],
    standalone: true,
  })
  export class AboutComponent {
    favoriteFramework = '';
    showFramework () { alert(this.favoriteFramework) }
    user_name = '';
    user_email = '';

    profileForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required)
    });
    
    handleSubmit () {
        alert("Sucessfully Submitted Form");
        this.user_name = <string>this.profileForm.value.name;
        this.user_email = <string>this.profileForm.value.email;    
    }
  }