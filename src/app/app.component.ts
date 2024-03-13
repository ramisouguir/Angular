import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  template: `
    Username: {{ username }}
  `,
  standalone: true,
})
export class UserComponent {
  username = 'youngTech'
}

@Component({
  selector: 'app-os',
  template: `
  <ul>
    @for (os of operatingSystems; track os.id) {
      <li>
        {{ os.name }}
      </li>
    }
  </ul>
  `,
  standalone: true
})
export class OSComponent {
  operatingSystems = [{id: 'win', name: 'Windows'}, {id: 'osx', name: 'MacOS'}, 
    {id: 'linux', name: 'Linux'}];
}

@Component({
  selector: 'app-root',
  template: `
    <section>
        @if (isLoggedIn){
          <app-user/>
        }
      <br/>

      <p> {{ city }}</p> <br/>
      
      <p> 
        @if(isServerRunning){
          Server is Running 
        }
        @else{
          Server not running
        }
      </p> <br/>

      <app-os/>
    </section>
  `,
  imports: [UserComponent, OSComponent],
  styles: `
    :host {
      color: #a144eb;
    }
  `,
  standalone: true,
  // imports: [RouterOutlet],
  // templateUrl: './app.component.html',
  // styleUrl: './app.component.css'
})
export class AppComponent {
  city='San Fransisco';
  isLoggedIn = true;
  isServerRunning = false;
}
