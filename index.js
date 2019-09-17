var S3 = require('aws-sdk/clients/s3');

const S3_BUCKET = process.env.S3_BUCKET;

const awsS3Config = 
{
	region :process.env.S3_REGION
};

exports.handler = (event, context, callback) => {
	console.log("Invoked Lambda function to deletePhoto");			
	var fileName = event.pathParameters.fileName;
	console.log("Received file name :"+fileName);
	const s3 = new S3(awsS3Config);	
  	var urlParams = {Bucket: S3_BUCKET, Key: fileName};
    s3.deleteObject(urlParams, function(err, data){
    	if(err){
			console.log(err);
		    callback(null, JSON.parse(JSON.stringify(err,null,2)));
		}
		else{					
	        const returnData = {			        	
      			fileName: fileName,
      			status: "Picture Deleted Successfully"
			};
			
			var response = {
				"statusCode": 200,
				"headers": {
					"Content-Type": "application/json"
				},
				"body": JSON.stringify(returnData),
				"isBase64Encoded": false
			}

	    	console.log(response);
	    	callback(null, response);
		}
    //console.log('the url of the image is', url);		        
    });  
};