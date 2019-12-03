class Optimization {
	constructor(args={}) {
        Object.assign(this, {
            txnFee : 0.1
        }, args);
    }
    
    hello() {
        //console.log('hello')
    }

    calculate(args={}) {
        let atts = Object.assign({}, {
            method: 1,  // 1= Percentage , 2=Fixed
            sellingPrice: 0,
            totalDiscount: 0,
            totalCommission: 0,
            // txnFee : 0.1
        }, args);

        
        let totalDiscountAmt = atts.method==1 ? (atts.sellingPrice * atts.totalDiscount/100) : atts.totalDiscount
        let totalCommissionAmt = atts.method==1 ? (atts.sellingPrice * atts.totalCommission/100) : atts.totalCommission

        let grandTotal = atts.sellingPrice - totalDiscountAmt
        let txnFeeAmt = grandTotal * this.txnFee
        let sellerProfit = grandTotal - totalCommissionAmt - txnFeeAmt

        const result = {
            discount: atts.totalDiscount,
            totalCommission: atts.totalCommission,
            discountAmt: totalDiscountAmt,
            totalCommissionAmt: totalCommissionAmt,
            txnFee: this.txnFee,
            txnFeeAmt: txnFeeAmt,
            grandTotal: grandTotal,
            sellerProfit: sellerProfit,
        }
        return result
    }

    calculate1(args={}) {
        let atts = Object.assign({}, {
            method: 1,  // 1= Percentage , 2=Fixed
            sellingPrice: 0,
            allowableCost: 0,
            // txnFee : 0.1
        }, args);

        
        let sellerProfit = atts.method==1 ? atts.sellingPrice * atts.allowableCost/100 : atts.sellingPrice - atts.allowableCost

        let discount = atts.allowableCost/2
        let comm = atts.allowableCost/2

        let discountAmt = atts.method==1 ? atts.sellingPrice * discount/100 : discount
        let memberPrice = atts.sellingPrice - discountAmt
        let txnFeeAmt = memberPrice * this.txnFee

        let commAmt = atts.sellingPrice - sellerProfit - discountAmt - txnFeeAmt

        let actualDiscount =  atts.method==1 ?  (discountAmt*100) / atts.sellingPrice : discountAmt
        let actualComm =  atts.method==1 ? (commAmt*100) / atts.sellingPrice : commAmt
        
        const result = {
            discount: discount,
            comm: comm,
            discountAmt: discountAmt,
            commAmt: commAmt,
            txnFee: this.txnFee,
            txnFeeAmt: txnFeeAmt,
            memberPrice: memberPrice,
            sellerProfit: sellerProfit,
            actualComm: actualComm,
            actualDiscount: actualDiscount
        }

        //console.log(result)
        return result
    }

    calculate2(args={}) {
        let atts = Object.assign({}, {
            method: 1,  // 1= Percentage , 2=Fixed
            sellingPrice: 0,
            discount: 0,
            comm: 0,
        }, args);

        //console.log(atts)

        let allowableCost = atts.discount + atts.comm

        let sellerProfit = atts.method==1 ? atts.sellingPrice * allowableCost/100 : atts.sellingPrice - allowableCost

        let discount = atts.discount
        let comm = atts.comm

        let discountAmt = atts.method==1 ? atts.sellingPrice * discount/100 : discount
        let memberPrice = atts.sellingPrice - discountAmt
        let txnFeeAmt = memberPrice * this.txnFee

        let commAmt = atts.sellingPrice - sellerProfit - discountAmt - txnFeeAmt

        let actualDiscount =  atts.method==1 ?  (discountAmt*100) / atts.sellingPrice : discountAmt
        let actualComm =  atts.method==1 ? (commAmt*100) / atts.sellingPrice : commAmt
        
        const result = {
            discount: discount,
            comm: comm,
            discountAmt: discountAmt,
            commAmt: commAmt,
            txnFee: this.txnFee,
            txnFeeAmt: txnFeeAmt,
            memberPrice: memberPrice,
            sellerProfit: sellerProfit,
            actualComm: actualComm,
            actualDiscount: actualDiscount
        }

        //console.log(result)
        return result
    }
}


export default Optimization