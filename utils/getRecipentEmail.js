export const getRecipentEmail = (userLoggedIn, users) =>
	users?.filter((user) => user !== userLoggedIn?.email)[0];
//async as we are using a hook
