    
import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from'aurelia-framework'

@inject(Router,RouterConfiguration)
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    // config.map([
    //   { route: ['','List'],  moduleId: 'VisitorList/list',   title: 'List',nav:true},
    //  {route:'detail/:id',moduleId:'VisitorDetails/Editdetail',name:'edit'},
    //  {route:'delete/:id',moduleId:'VisitorDetails/Deletedetail',name:'delete'},
    //  {route:'detail',moduleId:'VisitorDetails/Editdetail',name:'edit'}
    // ]);

 config.map([{ route: ['','ns'],  moduleId: 'ns',   title: 'Select',nav:true},
     {route:'detail/:id',moduleId:'VisitorDetails/Editdetail',name:'edit'},
     {route:'delete/:id',moduleId:'VisitorDetails/Deletedetail',name:'delete'},
     {route:'create',moduleId:'VisitorDetails/Createdetail',name:'create'},
     

     
    ]);


    this.router = router;
  }
}

