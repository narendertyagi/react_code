import axios from 'axios';
import User from './User'
import ItemCategory from './ItemCategory'
import EmailTemplate from './EmailTemplate'
import Language from './Language'
import Translation from './Translation'
import Currency from './Currency'
import WithdrawalRequest from './WithdrawalRequest'
import Ledger from './Ledger'
import PaymentMethod from './PaymentMethod'
import Order from './Order'
import Attachment from './Attachment'
import ShippingMethod from './ShippingMethod'
import Item from './Item'
import Keyword from './Keyword'
import KeywordGroup from './KeywordGroup'
import Inventory from './Inventory'
import Asin from './Asin'
import SalesAccount from './SalesAccount'
class Api {
	constructor(args = {}) {
		Object.assign(this, {
            apiHost: null
		}, args);
		
    
        this.User = new User({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin'
        })

        this.ItemCategory = new ItemCategory({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin'
        })

        this.EmailTemplate = new EmailTemplate({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin'
        })

        this.Language = new Language({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin'
        })

        this.Translation = new Translation({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin'
        })

        this.Currency = new Currency({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin'
        })

        this.WithdrawalRequest = new WithdrawalRequest({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin.wallet'
        })

        this.Ledger = new Ledger({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin.wallet'
        })

        this.PaymentMethod = new PaymentMethod({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin.payment'
        })

        this.Order = new Order({
            api_host : this.apiHost,
            api_endpoint: '/sc'
        })

        this.Attachment = new Attachment({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin.attachment'
        })

        this.ShippingMethod = new ShippingMethod({
            api_host : this.apiHost,
            api_endpoint: '/uxm.admin.shippingmethod'
        })

        this.Item = new Item({
            api_host : this.apiHost,
            api_endpoint: '/aws'
        })
        
        this.Keyword = new Keyword({
            api_host : this.apiHost,
            api_endpoint: '/aws'
        })
        this.KeywordGroup = new KeywordGroup({
            api_host : this.apiHost,
            api_endpoint: '/aws'
        })
        this.Inventory = new Inventory({
            api_host : this.apiHost,
            api_endpoint: '/aws'
        })
        this.Asin = new Asin({
            api_host : this.apiHost,
            api_endpoint: '/aws'
        })
        this.SalesAccount = new SalesAccount({
            api_host : this.apiHost,
            api_endpoint: '/aws'
        })
	}
}

export default Api