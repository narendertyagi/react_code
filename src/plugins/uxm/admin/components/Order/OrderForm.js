import React from 'react'
import {Form,Divider,Col,Row} from 'antd';
const FormItem = Form.Item;

class FormC extends React.Component {
	componentDidMount() {
	
	}
	static defaultProps = {

    }
     DescriptionItem( title, content ) {
         return(
        <div
            style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
            }}
            >
            <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
            >
            {title}:
            </p>
            {content}
         </div>
         )
        
     }
      pStyle = {
        fontSize: 16,
        color: 'rgb(245, 34, 45)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: 16,
      };
	render() {		
                const { item  } = this.props;
                const { getFieldDecorator } = this.props.form;
                const scdetails  = Sapp.Util.objValue(item,['data'],[])
                const shippingaddress  = Sapp.Util.objValue(item,['data','ShippingAddress'],[])
                const paymentMethodDetails  = Sapp.Util.objValue(item,['data','PaymentMethodDetails'],[])
                const OrderTotal  = Sapp.Util.objValue(item,['data','OrderTotal'],[])
                const items = Sapp.Util.objValue(item,['items'],[])
                // console.log(OrderTotal.Amount);

                console.log(items);

		return (
            <div>
            <Row>
                <Col span={24}>
                {this.DescriptionItem("Id" ,item._id) }
                </Col>
            </Row>
             <Divider />
          <p style={this.pStyle}> General Details</p>
            <Row>
                <Col span={12}>
                {this.DescriptionItem("AmazonOrderId" ,scdetails.AmazonOrderId) }
                </Col>
                <Col span={12}>
                {this.DescriptionItem("BuyerName" ,scdetails.BuyerName) }
                </Col>
             </Row>
            <Row>
                    <Col span={12}>
                        {this.DescriptionItem("FulfillmentChannel" ,scdetails.FulfillmentChannel) }
                        </Col>
                        <Col span={12}>
                        {this.DescriptionItem("EarliestDeliveryDate" ,scdetails.EarliestDeliveryDate) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("EarliestShipDate" ,scdetails.EarliestShipDate) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("EasyShipShipmentStatus" ,scdetails.EasyShipShipmentStatus) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("IsBusinessOrder" ,scdetails.IsBusinessOrder) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("IsPremiumOrder" ,scdetails.IsPremiumOrder) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("IsPrime" ,scdetails.IsPrime) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("IsReplacementOrder" ,scdetails.IsReplacementOrder) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("LastUpdateDate" ,scdetails.LastUpdateDate) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("LatestDeliveryDate" ,scdetails.LatestDeliveryDate) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("LatestShipDate" ,scdetails.LatestShipDate) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("MarketplaceId" ,scdetails.MarketplaceId) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("NumberOfItemsShipped" ,scdetails.NumberOfItemsShipped) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("NumberOfItemsUnshipped" ,scdetails.NumberOfItemsUnshipped) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("OrderStatus" ,scdetails.OrderStatus) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("OrderType" ,scdetails.OrderType) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("PaymentMethod" ,scdetails.PaymentMethod) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("PurchaseDate" ,scdetails.PurchaseDate) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("SalesChannel" ,scdetails.SalesChannel) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("ShipServiceLevel" ,scdetails.ShipServiceLevel) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("ShipmentServiceLevelCategory" ,scdetails.ShipmentServiceLevelCategory) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("ShippedByAmazonTFM" ,scdetails.ShippedByAmazonTFM) }
                    </Col>
            </Row>
            <Row>
                    <Col span={24}>
                    {this.DescriptionItem("BuyerEmail" ,scdetails.BuyerEmail) }
                    </Col>
            </Row>
                 <Divider />
            <p style={this.pStyle}>Payment Method Details</p>
                <Row>
                        <Col span={24}>
                        {this.DescriptionItem("paymentMethodDetail" ,paymentMethodDetails.PaymentMethodDetail) }
                        </Col>
                </Row>
                <Divider />
                <p style={this.pStyle}>Order Total</p>
                <Row>
                        <Col span={12}>
                        {this.DescriptionItem("Amount" ,OrderTotal.Amount) }
                        </Col>
                        <Col span={12}>
                        {this.DescriptionItem("CurrencyCode" ,OrderTotal.CurrencyCode) }
                        </Col>
                </Row>
                <Divider />
                <p style={this.pStyle}>Shipping Address</p>
                <Row>
                        <Col span={12}>
                        {this.DescriptionItem("Name" ,shippingaddress.Name) }
                        </Col>
                        <Col span={12}>
                        {this.DescriptionItem("Phone" ,shippingaddress.Phone) }
                        </Col>
                </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("AddressLine1" ,shippingaddress.AddressLine1) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("AddressLine2" ,shippingaddress.AddressLine2) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("AddressType" ,shippingaddress.AddressType) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("City" ,shippingaddress.City) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("CountryCode" ,shippingaddress.CountryCode) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("PostalCode" ,shippingaddress.PostalCode) }
                    </Col>
            </Row>
            <Row>
                    <Col span={12}>
                    {this.DescriptionItem("StateOrRegion" ,shippingaddress.StateOrRegion) }
                    </Col>
                    <Col span={12}>
                    {this.DescriptionItem("isAddressSharingConfidential" ,shippingaddress.isAddressSharingConfidential) }
                    </Col>
            </Row>
            {items.length > 0 ?
                <span>
                        <Divider />
                        <p style={this.pStyle}>Item Details</p>
                        {items.map(item=>{
                                return(
                                        <Row key={item.Title} style={{border: '1px solid lightgrey', marginBottom: '2px', padding: '5px'}}>
                                                <Col>
                                                        {this.DescriptionItem("Title" ,item.Title) }
                                                </Col>
                                                <Col span={7}>
                                                        {this.DescriptionItem("Asin" ,item.ASIN) }
                                                </Col>
                                                <Col span={10}>
                                                        {this.DescriptionItem("Seller SKU" ,item.SellerSKU) }
                                                </Col>
                                                <Col span={7}>
                                                        {this.DescriptionItem("Quantity Ordered" ,item.QuantityOrdered) }
                                                </Col>
                                        </Row>

                                )
                        })}
                </span>
            :
            null
            }
                
         </div>
				

			

		);
	}
}

const FormDefault = Form.create()(FormC);

export default FormDefault;
