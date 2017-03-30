import {web} from '../WebApi'
import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';
import {VisitorUpdated,VisitorDeleted} from '../message';
import {Ivisitor} from '../interface'
import {ValidationRules,ValidationController,validateTrigger} from 'aurelia-validation'



@inject(web,EventAggregator,ValidationController)

export class list
{
private visitor:Ivisitor
private isedit:boolean=false
private iscreate:boolean=false
private FormEnabled:boolean
private visitorlist:Ivisitor[]
	
	constructor(private web:web, public ea,public controller)
	
	{

//Listening for UpdatedVisitor Details
ea.subscribe(VisitorUpdated, msg => {

      let id = msg.visitor.id;
      let found = this.visitorlist.find(x => x.id == id); 
      if(found)
      {

       Object.assign(found, msg.visitor);
     }
     else
     {
     	  this.visitorlist.push(msg.visitor)
     }
    });

}

//Gets the list of all visitors
	private created():void
	{

this.web.getvisitor().then(data=> this.visitorlist=JSON.parse(JSON.stringify(data)))

}

//Deletes the selected visitor
	private delete(param:number):void
	{
		
	this.web.deletebyid(param).then(data=> {this.visitorlist=JSON.parse(JSON.stringify(data))
	this.ea.publish(new VisitorDeleted(this.visitorlist))
	})

}

//getting visitor details using 'visitorid' for passing it to child view-model
edit(visitorid)
{

	this.isedit=true;
	this.FormEnabled=true
	
this.controller.reset();

	this.web.getvisitorbyid(visitorid).then(data=>{
	this.visitor=JSON.parse(JSON.stringify(data))


	


	ValidationRules
	.ensure('firstname').required()
	 .ensure('lastname').required()
	.ensure('date').required()
	
	.on(this.visitor)
	
 })

}

//Initializing Visitor details to 'null' and passing it to child view-model
create()
{
	this.FormEnabled=true;
	this.iscreate=true;
	this.visitor=null

}




}