import { Routes } from '@angular/router';
import { MainComponent} from './app.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        title: 'App Home Page',
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About Page',
    },
];
