import {web} from "../WebApi"
import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';
import {VisitorUpdated,VisitorDeleted} from '../message';
import {ValidationRules,ValidationController,validateTrigger} from 'aurelia-validation'
import {areEqual} from './utility';

function getid(obj,a) {
  
  var flag=0;
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop))
     {
    // or Object.prototype.hasOwnProperty.call(obj, prop)
    if(a!=obj[prop].id)
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

@inject(web,EventAggregator,ValidationController)

export class detail
{
	count=0;
	web
	msg
	vlist
	originallist
	a:boolean=true
dfd=1;
	constructor(web, public ea,private controller)
	{
		this.web=web;
		 controller.validateTrigger = validateTrigger.change;
		ea.subscribe(VisitorDeleted,msg=> {
// this.vlist.id=null;
// this.vlist.firstname=null;
// this.vlist.lastname=null;
// this.vlist.date=null;
// this.vlist.time=null;
// this.count=msg.visitor.id;

this.dfd=getid(msg.visitor,this.vlist.id)
if(this.dfd>=0)
{
this.a=false
 } 
})
this.ea.subscribe(VisitorUpdated,msg=> {
		Object.assign(this.originallist,msg.visitor)

	})

   	}	activate(param)
	{
		this.controller.reset();
		this.a=true
	this.web.getvisitorbyid(param.id).then(data=>{
	this.vlist=JSON.parse(JSON.stringify(data))
	this.originallist = JSON.parse(JSON.stringify(this.vlist))
	ValidationRules
	.ensure('firstname').required()
	 .ensure('lastname').required()
	.ensure('date').required()
	
	.on(this.vlist)
	
 })
 

	}

canDeactivate() {
	
	
if(this.dfd>0)
{
    if (!areEqual(this.originallist,this.vlist)) {
      return confirm('You have unsaved changes. Are you sure you wish to leave?');
 }   }

    return true;
  }

validateMe()
{

	this.controller.validate().then(result=>{if(result.valid)
      	{
      		this.save()
      	}
      	else
      	{
      		this.msg="u have errors";
      	}
      })
}
	

// get canSave() 
// {
	
//     return this.vlist.firstname && this.vlist.lastname && this.vlist.date && this.vlist.time && !this.web.isRequesting;
// }

	 
	save()
	{
		
		 this.web.savedetail(this.vlist).then(data=>{ this.vlist=JSON.parse(JSON.stringify(data))
		this.ea.publish(new VisitorUpdated(this.vlist));

// this.a=JSON.parse(JSON.stringify(this.vlist));

// 		this.vlist.id=null;
// this.vlist.firstname=null;
// this.vlist.lastname=null;
// this.vlist.date=null;
// this.vlist.time=null;
ValidationRules
	.ensure('firstname').required()
	 .ensure('lastname').required()
	.ensure('date').required()
	
	.on(this.vlist)

	})
	}


}

