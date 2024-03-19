import { RouterOutlet, RouterLink } from '@angular/router';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CarService } from './car.service';

@Component({
  selector: `app-comments`,
  template: `
    <ul>
      @for (comment of comments; track comment.id) {
        <li>
          {{comment.content}}
        </li>
      }
    </ul>
  `,
  standalone: true,
})
export class CommentComponent {
  //this component will be run later once the browser is done loading everything else (defer)
  comments = [{id: '0', content: 'I like Angular but I think some features could be more intuitive'}, 
    {id: '1', content: 'I think Angular is better than React but has a steeper learning curve'}, 
    {id: '2', content: 'Fortnite'}];
}

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
  <div>
    Username: {{ username }}, Occupation: {{occupation}}
  </div>
  `,
  styles: `
    div {
      margin-bottom: 1em;
    }
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
  selector: 'app-main',
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
      </div> <hr/>

      <p>Car Listing: {{ display }}</p> <hr/>
      
      <!-- ngSrc will automatically optimize our images -->
      <div id="img_container">
        <img ngSrc="/assets/bella.jpg" alt="bella" width="256" height="256" priority/> <hr/>
      </div> <hr/>

      @defer (on viewport){
        <!-- content will begin loading once it is in view -->
        <app-comments/>
      } @placeholder {
        <p>Comments placeholder before loading begins</p>
      } @loading (minimum 2s) {
        <!-- loading will occur for at least 2 seconds to avoid flickering -->
        <p>Loading comments...</p>
      }
    </section>
  `,
  imports: [UserComponent, OSComponent, ChildComponent, CommentComponent, NgOptimizedImage, RouterOutlet],
  styles: `
    .poppins-regular {
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      font-style: normal;
    }
    :host {
      color: #29288a;
      font-family: "Poppins";
    }
    div {
      margin-right: 5px;
      display: flex;
      align-items: center;
    }
    #img_container {
      position: "flexed";
    }
  `,
  standalone: true,
})
export class MainComponent {
  carService = inject(CarService);
  display = this.carService.getCars().join(' ⭐️ ');
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

@Component({
  selector: 'app-root',
  template: `
      <nav>
      <a routerLink="/">Home</a>
      |
      <a routerLink="/about">About</a>
      </nav>
      <hr/>
      <router-outlet/> 
  `,
  imports: [RouterOutlet, RouterLink],
  styles: `
    .poppins-regular {
      /* this font is imported in the index.html file */
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      font-style: normal;
    }
    :host {
      font-family: "Poppins";
    }
    hr {
      margin-bottom: -.5em;
    }
  `,
  standalone: true,
})
export class AppComponent {
  
}

