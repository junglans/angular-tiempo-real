// Puerto del servidor de express. 
// You should see that the value of PORT is undefined on your computer. 
// Cloud hosts like Heroku or Azure, however, use the PORT variable to tell 
// you on which port your server should listen for the routing to work.
export const SERVER_PORT: number = Number(process.env.PORT) || 3000;