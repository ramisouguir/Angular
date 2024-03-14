import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="onClick()">Increment</button>
  `,
  standalone: true,
  styles: `
    button{
      margin-right: 10px;
    }
      `,
})
export class ChildComponent {
  count = 0
  @Output() incrementCountEvent = new EventEmitter<number>();
  onClick() {
    this.count++;
    this.incrementCountEvent.emit(this.count);
    console.log(this.count)
  }
}

@Component({
  selector: 'app-user',
  template: `
    Username: {{ username }}, Occupation: {{occupation}}
  `,
  standalone: true,
})
export class UserComponent {
  @Input() occupation = '';
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
          <app-user occupation="Angular Dev"/>
        }
      <hr/>

      <p> {{ city }}</p> <hr/>
      
      <p> 
        @if(isServerRunning){
          Server is Running 
        }
        @else{
          Server not Running
        } 
      </p> <hr/>

      <app-os/> <hr/>

      <div [contentEditable] = "isEditable">Type Here</div> <hr/>
      
      <button (click)="greet()">{{but_text}}</button> <hr/>
      
      <p (mouseover)="onMouseOver()">HOVER OVER ME {{ message }}</p> <hr/>
      
      <div>
        <app-child (incrementCountEvent)="setCount($event)"/>
        <p>{{ app_count }}</p>
      </div>
    </section>
  `,
  imports: [UserComponent, OSComponent, ChildComponent],
  styles: `
    :host {
      color: #a144eb;
    }
    div {
      margin-right: 5px;
      display: flex;
      align-items: center;
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
  isEditable = true;
  but_text = "CLICK ME";
  message = "";
  greet() {
    console.log('Ello Govna');
    if(this.but_text.length>1) {
      this.but_text = this.but_text.substring(0, this.but_text.length-1);
    }
    console.log(this.but_text);
  }
  onMouseOver() {
    this.message = "to see this secret message";
  }
  app_count = 0;
  setCount(item: number) {
    this.app_count = item;
  }
}
