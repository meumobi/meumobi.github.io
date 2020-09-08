

fs-slide
  /slides
    index.ts
    /A-slide
    /B-slide

## Create generic component

Host factory resolver
$ ng g component shared/components/fs-slide --inlineTemplate=true --inlineStyle=true --module=shared

```ts
@Component({
  selector: 'app-fs-slide',
  template: `
    <ng-template #slide>{{ item.title }}</ng-template>
  `,
  styles: []
})
export class FsSlideComponent implements OnInit, OnDestroy {
  
  @Input() item: modelA | modelB;
  @ViewChild('slide', {static: true, read: ViewContainerRef}) slide: ViewContainerRef;

  componentRef: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
```

## Create hosted components
$ ng g component shared/components/A-slide --module=shared
$ ng g component shared/components/B-slide --module=shared

## Component Name

  getComponentName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1) + 'SlideComponent';
  }

## Import types


## EntryComponent
Angular9..??

## Load component

Add on ngOnInit

```ts
const className = this.getComponentName(this.comment.type); const componentFactory =
this.componentFactoryResolver.resolveComponentFactory(type[className]);
this.componentRef = this.headline.createComponent(componentFactory);
(this.componentRef.instance).comment = this.comment;
```

https://angular.io/guide/dynamic-component-loader