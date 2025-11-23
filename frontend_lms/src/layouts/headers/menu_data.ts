interface DataType {
	id: number;
	title: string;
	link: string;
	has_dropdown?: boolean;
	sub_menus?: {
		link: string;
		title: string;
	}[];
}
// menu data
const menu_data: DataType[] = [
	{
		id: 1,
		title: "Home",
		link: "/",
	}, 
	{
		id: 2,
		title: "Courses",
		link: "/courses",
	},

	// {
	// 	id: 3,
	// 	title: "Pages",
	// 	link: "#",
	// 	has_dropdown: true,
	// 	sub_menus: [
	// 		{ link: "/grid-blog", title: "Grid Blog" },
	// 		{ link: "/standard-blog", title: "Standard Blog" },
	// 		{ link: "/blog-details", title: "Blog Details" },
	// 		{ link: "/cart", title: "Cart" },
	// 		{ link: "/checkout", title: "Checkout" },
	// 		{ link: "/login", title: "Login" },
	// 		{ link: "/register", title: "Register" },
	// 		{ link: "/about", title: "About" },
	// 		{ link: "/instructors", title: "Instructors" },
	// 		{ link: "/erorr", title: "404 || Error" },
	// 	],
	// },
	{
		id: 4,
		title: "Contact",
		link: "/contact",
		has_dropdown: false,
	},
];
export default menu_data;
