import {web} from "../WebApi"
import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';
import {VisitorUpdated,VisitorDeleted} from '../message';
import {ValidationRules,ValidationController,validateTrigger} from 'aurelia-validation'
import {Ivisitor} from '../interface'
import {bindable, bindingMode} from 'aurelia-framework';

@inject(web,EventAggregator,ValidationController)

export class detail
{
     @bindable({ defaultBindingMode: bindingMode.twoWay }) vlist;
      @bindable({ defaultBindingMode: bindingMode.twoWay }) formenabled;

	
	
private countofID:number=0//if ID in present in visitor return 0 else return >0
 private routeConfig

	constructor(public web:web, public ea:EventAggregator,private controller:ValidationController)
	{
	
		 controller.validateTrigger = validateTrigger.change;

//Listening for updated visitors 
		ea.subscribe(VisitorDeleted,msg=> {


this.countofID=this.getid(msg.visitor,this.vlist.id)
if(this.countofID>=0)
{

this.formenabled=false
 } 
 
})
   	}

//To compare if given VisitorID is present or deleted
private getid(visitorobj,visitorid):number
 {
  var flag=0;
  for(var prop in visitorobj)
   {
    if (visitorobj.hasOwnProperty(prop))
     {
   
    if(visitorid!=visitorobj[prop].id)
    {
      flag++
    }
    else
    {
    	flag=-1
    break;
	}
     }
   
  }
  return flag;
}





private validateMe():void
{

ValidationRules
	.ensure('firstname').required()
	 .ensure('lastname').required()
	.ensure('date').required()
	.ensure('time').required()
	.on(this.vlist)

	this.controller.validate().then(result=>{if(result.valid)
      	{
      		this.save()
      	}
      	
      })
}
	
	 

private save():void
	{
		

	 this.web.savedetail(this.vlist).then(data=>{ this.vlist=JSON.parse(JSON.stringify(data))
	
	this.ea.publish(new VisitorUpdated(this.vlist));
// Object.assign(this.originallist,this.vlist)
this.formenabled=false;
ValidationRules
	.ensure('firstname').required()
	 .ensure('lastname').required()
	.ensure('date').required()
	
	.on(this.vlist)

	})
	}
}

