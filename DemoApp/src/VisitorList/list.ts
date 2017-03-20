import {web} from '../WebApi'
import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator';
import {VisitorUpdated,VisitorCreated,VisitorDeleted} from '../message';
//  function size(obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
// };

@inject(web,EventAggregator)
export class list
{
visitorlist
vis
v:boolean
	constructor(private web:web, public ea)
	{

// ea.subscribe(VisitorViewed, msg => this.select(msg.contact));
    ea.subscribe(VisitorUpdated, msg => {

      let id = msg.visitor.id;
      let found = this.visitorlist.find(x => x.id == id); 

       Object.assign(found, msg.visitor);
     
    });

    ea.subscribe(VisitorCreated,msg=> {
    	// let a=size(this.visitorlist)
      let sai=JSON.parse(JSON.stringify(msg))
    		this.visitorlist.push(sai.visitor)
    	 })
	}

	created()
	{
this.web.getvisitor().then(data=> this.visitorlist=JSON.parse(JSON.stringify(data)))}

	delete(param)
	{
		
	this.web.deletebyid(param).then(data=> {this.visitorlist=JSON.parse(JSON.stringify(data))
	this.ea.publish(new VisitorDeleted(this.visitorlist))
	})
}
}