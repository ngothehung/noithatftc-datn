import { lazy } from "react";

export const Routers = [
	{
		path: '/',
		exact: true,
		title: 'Home',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/home/HomeCakeShop" ) )
	},
	{
		path: '/home',
		exact: true,
		title: 'Home',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/home/HomeCakeShop" ) )
	},
	{
		path: '/shop',
		exact: true,
		title: 'ShopGridStandard',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/shop/ShopGridStandard" ) )
	},

	{
		path: '/product/:id',
		exact: true,
		title: 'ShopGridStandard',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/shop-product/Product" ) )
	},

	{
		path: '/blog-standard',
		exact: true,
		title: 'BlogStandard',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/blog/BlogStandard" ) )
	},

	{
		path: '/about',
		exact: true,
		title: 'About',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/About" ) )
	},

	{
		path: '/my-account',
		exact: true,
		title: 'my-account',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/MyAccount" ) )
	},

	{
		path: '/contact',
		exact: true,
		title: 'Contact',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/Contact" ) )
	},

	{
		path: '/auth/:type',
		exact: true,
		title: 'LoginRegister',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/LoginRegister" ) )
	},
	{
		path: '/auth/:type',
		exact: true,
		title: 'LoginRegister',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/LoginRegister" ) )
	},
	{
		path: '/cart',
		exact: true,
		title: 'LoginRegister',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/Cart" ) )
	},

	{
		path: '/cart',
		exact: true,
		title: 'LoginRegister',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/Checkout" ) )
	},

	{
		path: '/checkout',
		exact: true,
		title: 'LoginRegister',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/Checkout" ) )
	},

	{
		path: '/my-order',
		exact: true,
		title: 'MyOrder',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/MyOrder" ) )
	},

	{
		path: '/not-found',
		exact: true,
		title: 'not-found',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/NotFound" ) )
	},

	{
		path: '/payment/:type',
		exact: true,
		title: 'payment',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/PaymentStatus" ) )
	},

	{
		path: '/payment',
		exact: true,
		title: 'payment',
		redirectFrom: '/', 
		component: lazy( () => import( "../pages/other/PaymentStatus" ) )
	}
]