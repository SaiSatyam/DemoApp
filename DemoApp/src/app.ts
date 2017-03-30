    
import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from'aurelia-framework'



@inject(Router,RouterConfiguration)
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Visitors';
    
 config.map(
 	[{ route: ['','list'], moduleId: 'VisitorList/list',nav:true,title:'VISITORLIST'},
    {route:'Other',moduleId:'Others/other',nav:true,title:'Other'}
     ]);

  this.router = router;

  }


}

