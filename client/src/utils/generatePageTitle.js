export const generatePageTitle = (pageTitle) => {
    const appName = process.env.REACT_APP_APP_NAME ? 
                    process.env.REACT_APP_APP_NAME : 
                    'Kiwibot Challenge'; 
   return (document.title = appName + ' | ' +pageTitle);
}
