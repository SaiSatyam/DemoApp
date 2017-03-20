import {web} from "../WebApi"
import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';
import {VisitorCreated,VisitorDeleted} from '../message';
import {ValidationRules,ValidationController,validateTrigger} from 'aurelia-validation'
@inject(web,EventAggregator,ValidationController)

export class createdetail
{
	web
	msg
	vlist
	a:boolean=true;
	constructor(web,public ea,private controller)
	{
		this.web=web;
		// this.vlist=[{id:'',firstname:'',lastname:'',date:'',time:''}]

ea.subscribe(VisitorDeleted,msg=> {

this.a=false
   })


// 	ea.subscribe(VisitorDeleted,msg=> {
// this.vlist.id=null;
// this.vlist.firstname=null;
// this.vlist.lastname=null;
// this.vlist.date=null;
// this.vlist.time=null;
//    })
this.a=true;
		
	}
	// created()
	// {

	// }

validateMe()
{
	this.controller.validate().then(result=>{if(result.valid)
      	{
      		  this.web.savedetail(this.vlist).then(data=>{ 
		  	this.vlist=JSON.parse(JSON.stringify(data))
		this.ea.publish(new VisitorCreated(this.vlist));
	
	this.a=false;
// this.vlist.id=null;
// this.vlist.firstname=null;
// this.vlist.lastname=null;
// this.vlist.date=null;
// this.vlist.time=null;

})

      	}
      	else
      	{
      		this.msg="u have errors";
      	}
      })
}
	

	save()
	{
			ValidationRules
	.ensure('firstname').required()
	.ensure('lastname').maxLength(6).required()
	.ensure('date').required()
	.ensure('time').required()
	.on(this.vlist)

	this.validateMe();

// 		  this.web.savedetail(this.vlist).then(data=>{ 
// 		  	this.vlist=JSON.parse(JSON.stringify(data))
// 		this.ea.publish(new VisitorCreated(this.vlist));
	
	
// this.vlist.id=null;
// this.vlist.firstname=null;
// this.vlist.lastname=null;
// this.vlist.date=null;
// this.vlist.time=null;

//})

}
}
