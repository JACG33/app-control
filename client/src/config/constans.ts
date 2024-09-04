export const IMG_PlACEHOLDER = "/img/placeholder.png";

export const nullForm = {
	id: "",
	title: "",
	slug: "",
	excerpt: "",
	descrip: "<p></p>",
	statuspost: "Borrador",
	img: `http://localhost:5173${IMG_PlACEHOLDER}`,
	categories: "",
};

export const Reg_Exp = {
	title: /[\s\S]{10,60}/,
	descrip: /[\s\S]{32,}/,
};

export const FormCategories = {
	id: "",
	name: "",
	slug: "",
};

export const acceptedFiles = {
	accept: "image/, .jpeg, .jpg, .png, .gif",
	type: "image",
};

export const API_URL = "http://localhost:3000/api/";

