import {HttpClient} from 'aurelia-http-client'
import {inject} from 'aurelia-framework'
import {Ivisitor} from './Interface'
import {DateFormatValueConverter } from './resources/value-converters/converter'

let latency=200;

let baseurl="http://10.16.26.59:106/api/values"

@inject(HttpClient,DateFormatValueConverter)



export class web
{
	private http:HttpClient
	private visitorlist:Ivisitor[]
	
	

	constructor(http:HttpClient,public d)
	{

		this.http=http;

	this.fetchVisitorsDetails()

	}


//Fetches visitor details from web server and storing it in variable 'visitorlist'
	private fetchVisitorsDetails():void
	{
		 this.http.get(baseurl).then(data=> this.visitorlist=JSON.parse(data.response))
		
	}

//Gettind ID for newly created Visitor
  private getid(obj)

  {
  
var a=0;  
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
   
      a=obj[prop].id
    }
   
  }
  return a+1;
}

//fetching visitor details from 'visitorlist' and returning it as a PROMISE 
	public getvisitor():Promise<{}>
	{
		
    return new Promise(resolve => {
      setTimeout(() => {
      	//creates new array with results of called function 
        let results = this.visitorlist.map(x =>{
         return {
          id:x.id,
          firstname:x.firstname,
          lastname:x.lastname,
          date:this.d.toView(x.date),
          time:x.time
        }});

        resolve(results);
//copying records in 'results' to 'visitorlists'
        Object.assign(this.visitorlist,results)

        
      }, latency);
    });

	}


//fetching visitor details from 'visitorlist' by comparing ID and returning it
	public  getvisitorbyid(id:number):Promise<{}>
	{

		return new Promise(resolve=> {
			//creates new array with results of called function that satisfies some condition 
			let res=this.visitorlist.filter(x=> id==x.id)[0]
			resolve(res)
		
		} )

	}


//Saving newly created or updated VISITOR DETAILS in  variable 'visitorlist' and returning it
	public savedetail(visitor):Promise<{}>
	{
		

		return new Promise(resolve=>{
			let instance=JSON.parse(JSON.stringify(visitor));
			 let found = this.visitorlist.filter(x => x.id == visitor.id)[0];

        if(found){
          let index = this.visitorlist.indexOf(found);
          this.visitorlist[index] = instance;
          
        }
        else
        {
          instance.id = this.getid(this.visitorlist);
          this.visitorlist.push(instance);
         
        }

 resolve(instance)

 
		})

	}


// Deleting records from variable 'visitorlist' by comparing ID and returning updated visitor records
public 	deletebyid(id:number):Promise<{}>
	{
	

		return new Promise(resolve=> {
			
			let found=this.visitorlist.filter(x=> id==x.id)[0]
		
			
				let index=this.visitorlist.indexOf(found);

				this.visitorlist.splice(index,1);
			
			
	resolve(this.visitorlist)

	

})

	}





}