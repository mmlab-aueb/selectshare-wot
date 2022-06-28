const Servient = require('@node-wot/core').Servient;
const HttpServer = require('@node-wot/binding-http').HttpServer;
const fetch = require('node-fetch');
//const fs = require('fs')

const servient = new Servient();
servient.addServer(new HttpServer());

servient.start().then((WoT) => {
    //Produce the TD
    WoT.produce({
        "@context": "https://www.w3.org/2022/wot/td/v1.1",
        title: "Plegma_Building01",
        description: "Plegma's building 01",
        properties: {
            device: {
                type: "object",
                readOnly: true,
                uriVariables: {
                    deviceID: {type: "integer"},
                    field: {type: "string"},
                    function: {type: "string"},
                    startTime: {type: "string"},
                    endTime: {type: "string"}
                },
                forms: [{
                    "href": "http://localhost:8080/plegma_building01/properties/device{?deviceID,field,function,startTime,endTime}",
                    "htv:methodName": 'GET'
                }]
            }
        }
    })
    .then( function (thing) {

        //console.log("Produced " + thing.getThingDescription().title);

        thing.setPropertyReadHandler("device", async (options) => {
            const uriVariables = options.uriVariables;
            const deviceID = uriVariables.deviceID;
            const field = uriVariables.field;
            const valueFunction = uriVariables.function;
            const startTime = uriVariables.startTime;
            const endTime = uriVariables.endTime;

            var options = {
                'method': 'GET',
                'url': 'http://localhost:9090/?deviceID='+deviceID+"&field="+field+"&function="+valueFunction+"&startTime="+startTime+"&endTime="+endTime
              };

            url = 'http://localhost:9090/?deviceID='+deviceID+"&field="+field+"&function="+valueFunction+"&startTime="+startTime+"&endTime="+endTime;

            return await send_req();
            
            async function send_req (){
                const response = await fetch(url,options);
                const data = await response.json();
                //console.log(data);
                return data;
            }
        })

        thing.expose().then(() => {
            console.info(thing.getThingDescription().title + " ready");
            
            //write the TD to a file
            //let data = JSON.stringify(thing.getThingDescription(), null, 2);
            //fs.writeFileSync('plegmaTD.json', data);
        });

        
    })

    WoT.produce({
        "@context": "https://www.w3.org/2022/wot/td/v1.1",
        title: "DomX",
        description: "DomX's IoT devices",
        properties: {
            device: {
                type: "object",
                readOnly: true,
                uriVariables: {
                    deviceID: {type: "string"},
                    metric: {type: "string"},
                    timeFrom: {type: "string"},
                    timeTo: {type: "string"}
                },
                forms: [{
                    "href": "http://localhost:8080/domx/properties/device{?deviceID,metric,timeFrom,timeTo}",
                    "htv:methodName": 'GET'
                }]
            }
        }
    })
    .then( function (thing) {

        thing.setPropertyReadHandler("device", async (options) => {
            const uriVariables = options.uriVariables;
            const deviceID = uriVariables.deviceID;
            //const metric = uriVariables.metric;
            const timeFrom = uriVariables.timeFrom;
            const timeTo = uriVariables.timeTo;

            var options = {
                'method': 'GET',
                'url': 'http://localhost:9099/?deviceID='+deviceID+"&timeFrom="+timeFrom+"&timeTo="+timeTo
              };

            url = 'http://localhost:9099/?deviceID='+deviceID+"&timeFrom="+timeFrom+"&timeTo="+timeTo;

            return await send_req();
            
            async function send_req (){
                const response = await fetch(url,options);
                const data = await response.json();
                //console.log(data);
                return data;
            }
        })


        thing.expose().then(() => {
            console.info(thing.getThingDescription().title + " ready");
        });

        
    })
    
});
