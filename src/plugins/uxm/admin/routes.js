// import 'babel-polyfill';
import {
  Dashboard,
  Items,
  Item,
  Keywords,
  KeywordsGroup,
  Keyword,
  KeywordGroup,
  Inventories,
  Asins,
  Asin,
  SalesAccount,
  AsinImport,
  Orders
} from "./components";
import { flow } from 'mobx';

import Analyse from './components/AsinSearchRank/Analyse'

const routes = [
       

        {
            path: '/',
            exact: true,
            component: Dashboard,
            layout: 'dash',
            showInMenu: false,
            title: 'Dashboard',
            roles: ['sa'],
            priority: 0
        },

        {
            path: '/items',
            exact: true,
            component: Items,
            layout: 'dash',
            showInMenu: true,
            title: 'Master',
            roles: ['sa'],
            priority: 0,
            name: 'master'
        },

        {
            path: '/items',
            exact: true,
            component: Items,
            layout: 'dash',
            showInMenu: true,
            title: 'Items',
            roles: ['sa'],
            priority: 0,
            parent: 'master'
        },
       
        {
            path: '/item/add',
            exact: true,
            component: Item,
            layout: 'dash',
            showInMenu: false,
            title: 'items',
            roles: ['sa'],
            priority: 0
        },
        {
            path: '/item/:id',
            exact: true,
            component: Item,
            layout: 'dash',
            showInMenu: false,
            title: 'items',
        },
        {
            path: '/salesaccount',
            exact: true,
            component: SalesAccount,
            layout: 'dash',
            showInMenu: true,
            title: 'SalesAccount',
            roles: ['sa'],
            priority: 0,
            parent: 'master'
        },
        {
            path: '/Inventories',
            exact: true,
            component: Inventories,
            layout: 'dash',
            showInMenu: true,
            title: 'Inventories',
            roles: ['sa'],
            priority: 0
        },

        {
            path: '/Orders',
            exact: true,
            component: Orders,
            layout: 'dash',
            showInMenu: true,
            title: 'Orders',
            roles: ['sa'],
            priority: 0
        },

        {
            path: '/asins',
            exact: true,
            component: Asins,
            layout: 'dash',
            showInMenu: true,
            title: 'Amazon',
            roles: ['sa'],
            priority: 0,
            name: 'amazon'
        },

        {
            path: '/asins',
            exact: true,
            component: Asins,
            layout: 'dash',
            showInMenu: true,
            title: 'Asins',
            roles: ['sa'],
            priority: 0,
            parent: 'amazon'
        },
        {
            path: '/asin/import',
            exact: true,
            component: AsinImport,
            layout: 'dash',
            showInMenu: false,
            title: 'Asinimport',
            roles: ['sa'],
            priority: 0
        },
        {
            path: '/keywords',
            exact: true,
            component: Keywords,
            layout: 'dash',
            showInMenu: true,
            title: 'Keywords',
            roles: ['sa'],
            priority: 0,
            name: 'keywords'
        },

        {
            path: '/keywords',
            exact: true,
            component: Keywords,
            layout: 'dash',
            showInMenu: true,
            title: 'Keywords',
            roles: ['sa'],
            priority: 0,
            parent: 'keywords'
        },

        {
            path: '/keywords_group',
            exact: true,
            component: KeywordsGroup,
            layout: 'dash',
            showInMenu: true,
            title: 'Keywords Group',
            roles: ['sa'],
            priority: 0,
            parent: 'keywords'
        },

        
        {
            path: '/keyword_group',
            exact: true,
            component: KeywordGroup,
            layout: 'dash',
            showInMenu: false,
            title: 'Keyword Group',
            roles: ['sa'],
            priority: 0,
            parent: 'keywords'
        },

        {
            path: '/keyword_group/:id',
            exact: true,
            component: KeywordGroup,
            layout: 'dash',
            showInMenu: false,
            title: 'Keyword Group',
            roles: ['sa'],
            priority: 0
        },
        {

            path: '/analyse',
            exact: true,
            component: Analyse,
            layout: 'dash',
            showInMenu: true,
            title: 'Analyse',
            roles: ['sa'],
            priority: 0,
            parent: 'keywords'
        },

        {
            path: '/analyse2',
            exact: true,
            component: Analyse,
            layout: 'dash',
            showInMenu: true,
            title: 'Keyword Asin Rank',
            roles: ['sa'],
            priority: 0,
            parent: 'amazon'
        },

        {
            path: '/analyse4',
            exact: true,
            component: Analyse,
            layout: 'dash',
            showInMenu: true,
            title: 'Keyword Asin Rank Detail',
            roles: ['sa'],
            priority: 0,
            parent: 'amazon'
        },

       
        // {
        //     path: '/asin/add',
        //     exact: true,
        //     component: Asin,
        //     layout: 'dash',
        //     showInMenu: false,
        //     title: 'Asins',
        //     roles: ['sa'],
        //     priority: 0
        // },
        // {
        //     path: '/asin/:id',
        //     exact: true,
        //     component: Asin,
        //     layout: 'dash',
        //     showInMenu: false,
        //     title: 'Asins',
        // },

        {
            path: '/analyse6',
            exact: true,
            component: Analyse,
            layout: 'dash',
            showInMenu: true,
            title: 'Bulk Export',
            roles: ['sa'],
            priority: 0,
            parent: 'amazon'
        },

        {
            path: '/analyse7',
            exact: true,
            component: Analyse,
            layout: 'dash',
            showInMenu: true,
            title: 'Catalog Search',
            roles: ['sa'],
            priority: 0,
            parent: 'amazon'
        },

        {
            path: '/analyse8',
            exact: true,
            component: Analyse,
            layout: 'dash',
            showInMenu: true,
            title: 'Keyword Extractor',
            roles: ['sa'],
            priority: 0,
            parent: 'amazon'
        },
       

]

export default routes