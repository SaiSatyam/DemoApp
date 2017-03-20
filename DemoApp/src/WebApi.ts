import {HttpClient} from 'aurelia-http-client'
import {inject} from 'aurelia-framework'

let latency=200;
function getid(obj) {
  
var a=0;  
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
    // or Object.prototype.hasOwnProperty.call(obj, prop)
      a=obj[prop].id
    }
   
  }
  return a+1;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


let baseurl="http://10.16.26.59:106/api/values"
@inject(HttpClient)

export class web
{
	http:HttpClient
	visitorlist
	deletedlist
vlist
	isRequesting:boolean=false
	constructor(http:HttpClient)
	{
		this.http=http;
	this.fetchVisitorsDetails()
	}

	fetchVisitorsDetails()
	{
		 this.http.get(baseurl).then(data=> this.visitorlist=JSON.parse(data.response))
	}

	getvisitor()
	{
		this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = this.visitorlist.map(x =>{ return {
          id:x.id,
          firstname:x.firstname,
          lastname:x.lastname,
          date:formatDate(x.date),
          time:x.time
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });

	}

	getvisitorbyid(id)
	{
		this.isRequesting = true;
		return new Promise(resolve=> {
			let res=this.visitorlist.filter(x=> id==x.id)[0]
			resolve(res)
			this.isRequesting = false;
		} )
	}

	savedetail(visitor)
	{
		this.isRequesting = true;
		return new Promise(resolve=>{
			let instance=JSON.parse(JSON.stringify(visitor));
			 let found = this.visitorlist.filter(x => x.id == visitor.id)[0];

        if(found){
          let index = this.visitorlist.indexOf(found);
          this.visitorlist[index] = instance;
          
        }else{
          instance.id = getid(this.visitorlist);
          this.visitorlist.push(instance);
         
        }
 resolve(instance)
 this.isRequesting = false;
		})
	}

	deletebyid(id)
	{
		this.isRequesting = true;
		return new Promise(resolve=> {
			
			let found=this.visitorlist.filter(x=> id==x.id)[0]
		
			
				let index=this.visitorlist.indexOf(found);
				this.visitorlist.splice(index,1);
			
			
	resolve(this.visitorlist)
	this.isRequesting = false;
})
	}
}