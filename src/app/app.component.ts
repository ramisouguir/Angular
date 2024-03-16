import { RouterOutlet } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

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
  comments = [{id: '0', content: 'I like angular but I think some parts could be more intuitive like in React'}, 
    {id: '1', content: 'I think Angular is better than React but has a harder learning curve'}, 
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
      
      <!-- ngSrc will automatically optimize our images -->
      <div id="img_container">
        <img ngSrc="/assets/bella.jpg" alt="bella" width="256" height="256" priority/> <hr/>
      </div>

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
    :host {
      color: #29288a;
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
      <a href="/">Home</a>
      |
      <a href="/about">About</a>
      </nav>
      <router-outlet/> <hr/>
  `,
  imports: [RouterOutlet],
  styles: `

  `,
  standalone: true,
})
export class AppComponent {
  
}

