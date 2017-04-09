'use strict';

class CouponValidator{
	constructor(request){
		console.log("entering constructor");
		this.req = request;
	}
	
	validateCoupon(done){ 
		console.log("entering validateCoupon");
	}
}

module.exports = CouponValidator;