# What you’ll build
## PWA
PWA to Save, organize, (un)like and share [curated](https://www.merriam-webster.com/dictionary/curated) notes from online posts.
List notes by tags, users or organization (group of users).

Home -> notes/list sorted by date + infinite scroll
note/detail/:id
note/edit/:id

## Firebase Cloud function to send by email weekly best links

# What you’ll need
Ionic4/Angular
Firebase hosting
Firebase db - firestore

```
$ npm install ionic typescript -g
...

$ npm ls -g ionic npm typescript --depth 0
├── ionic@5.2.1 
├── npm@5.5.1 
└── typescript@3.5.2 
```
# Create your project
```
$ ionic start mmb-side-project.curated-notes --type=angular
```

# Run the application
```
$ cd mmb-side-project.curated-notes
$ ionic serve
```

ng run app:serve --host=localhost --port=8100

$ ionic build --prod
> ng run app:build:production

# Feature module: notes
## Module

```
$ ng generate module notes --routing
CREATE src/app/notes/notes-routing.module.ts (248 bytes)
CREATE src/app/notes/notes.module.ts (275 bytes)
```
## Pages
```
$ ng g page notes/pages/notes-list --module notes
CREATE src/app/notes/pages/notes-list/notes-list.module.ts (559 bytes)
CREATE src/app/notes/pages/notes-list/notes-list.page.scss (0 bytes)
CREATE src/app/notes/pages/notes-list/notes-list.page.html (129 bytes)
CREATE src/app/notes/pages/notes-list/notes-list.page.spec.ts (713 bytes)
CREATE src/app/notes/pages/notes-list/notes-list.page.ts (271 bytes)
UPDATE src/app/notes/notes.module.ts (275 bytes)
$ ng g page notes/pages/note-detail --module notes
CREATE src/app/notes/pages/note-detail/note-detail.module.ts (564 bytes)
CREATE src/app/notes/pages/note-detail/note-detail.page.scss (0 bytes)
CREATE src/app/notes/pages/note-detail/note-detail.page.html (130 bytes)
CREATE src/app/notes/pages/note-detail/note-detail.page.spec.ts (720 bytes)
CREATE src/app/notes/pages/note-detail/note-detail.page.ts (275 bytes)
UPDATE src/app/notes/notes.module.ts (275 bytes)
$ ng g page notes/pages/note-edit --module notes
CREATE src/app/notes/pages/note-edit/note-edit.module.ts (554 bytes)
CREATE src/app/notes/pages/note-edit/note-edit.page.scss (0 bytes)
CREATE src/app/notes/pages/note-edit/note-edit.page.html (128 bytes)
CREATE src/app/notes/pages/note-edit/note-edit.page.spec.ts (706 bytes)
CREATE src/app/notes/pages/note-edit/note-edit.page.ts (267 bytes)
UPDATE src/app/notes/notes.module.ts (275 bytes)
```
## Routing
Next, open and edit src/app/notes/notes-routing.module.ts to add new routes. No need to import components we’ll prefer lazy-loading.

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/notes-list/notes-list.module#NotesListPageModule'},
  { path: 'detail/:id', loadChildren: './pages/note-detail/note-detail.module#NoteDetailPageModule'},
  { path: 'edit/:id', loadChildren: './pages/note-edit/note-edit.module#NoteEditPageModule'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
```

And now add notes route on `AppRoutingModule`

```
...
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'notes', loadChildren: './notes/notes.module#NotesModule' },
];
...
```

At this stage you can add links on pages to test navigation or access directly to lazy-loaded pages running `ionic serve` and typing url on address bar of your browser.

’/’ for home
‘/notes’ for notes-list
‘/notes/detail/123’ for note-detail
‘/notes/edit/123’ for note-edit

## Data modeling
### Model

```
$ ng generate class notes/note --type model --skipTests
CREATE src/app/notes/note.model.ts (22 bytes)
```

```
export class Note {
  id: string;
  highlight: string;
  createdAt: string; // 2018-10-09T16:18:45Z
  modifiedAt: string; // 2018-10-09T16:18:45Z
  link: string;
  userId: string;
}
```

### Mock

```
$ ng generate class notes/notes-mock --skipTests
CREATE src/app/notes/notes-mock.ts (26 bytes)
```

```
const notes = [
  {
    id: '1234',
    highlight: 'On Tuesday, Justice Brett M. Kavanaugh heard his first Supreme Court arguments, all concerning enhanced sentences for gun crimes.',
    createdAt: '2018-10-09T16:18:45Z',
    modifiedAt: '2018-10-09T16:18:45Z',
    link: 'https://www.nytimes.com/2018/10/09/us/politics/',
    userId: 'abcd'
  }, {
    id: '1235',
    highlight: 'BBC Russian finds villagers who remember a GRU agent accused over the Salisbury attack.',
    createdAt: '2018-10-09T16:18:45Z',
    modifiedAt: '2018-10-09T16:18:45Z',
    link: 'https://www.bbc.com/news/world-europe-45799037',
    userId: 'abcd'
  }
];

export default notes;
```

## Observable data service
### Mock

```
$ ng g service notes/notes-mock --skipTests
CREATE src/app/notes/notes-mock.service.ts (138 bytes)
```

```js
import { Note } from './note.model';
import { Injectable } from '@angular/core';
import notes from './notes-mock.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private items$: Observable<Note[]> = of(notes).pipe(
    delay(2000)
  );
  private currentNote: Note;

  latest(): Promise<Note[]> {

    return this.items$.toPromise();
  }

  setCurrentNote(item: Note): Promise<Note> {
    this.currentNote = item;

    return Promise.resolve(this.currentNote);
  }

  getCurrentNote(): Promise<Note> {

    return Promise.resolve(this.currentNote);
  }
}
```
### Service
#### Install dependencies
#### Setup environment config
#### Service
## Components
### item-headline

      - sort by date
- Feature: add tags on notes
  - ionic chip, search on typing
  - check filter by tags on https://twitter.com/seanfperkins/status/1136502546577723397
- Feature: filter by tags
  - combine tags (reduce list on select)
- Feature: add authentication to create notes
  - Firebase auth w/ Facebook, Google
- Feature: filter by user
- Feature: slack integration by user config

Third party services
  - Facebook
  - Google Plus
  - Google Analytics
  - Slack

- PWA
Angular 6+ in-built PWA
According to Google, there are [three characteristics that define every PWA](https://developers.google.com/web/progressive-web-apps/):
+ Reliable - Load instantly and never show the downasaur, even in uncertain network conditions.
+ Fast - Respond quickly to user interactions with silky smooth animations and no janky scrolling.
+ Engaging - Feel like a natural app on the device, with an immersive user experience.
- Performance
Optimizing front end performance with:
Clean coding practices
Caching
Minification
Image optimization

Testing with Lighthouse and [Test my site](https://www.thinkwithgoogle.com/feature/testmysite) (for layman’s terms)
- Repository
- Conclusion
How to use this starter ?
ionic start "crud-ionic-firestore-app" https://github.com/meumobi/....
