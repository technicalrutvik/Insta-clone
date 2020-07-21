const nodemailer=require('nodemailer')

let transport=nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:'rutvikghori25@gmail.com',
		pass:''
	}
})

let mailOptions={
	from:'rutvikghori25@gmail.com',
	to:'rutvikghori512@gmail.com',
	subject:'Testing',
	text:'It Works'
}

transport.sendMail(mailOptions,function(err,dara){
	if(err){
		console.log('Error Occurs',err);
	}else{
		console.log(dara)
	}
});