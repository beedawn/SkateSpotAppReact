export const refreshPage = async (page) => {
    if(page!==undefined)
    window.location.replace("/spot/" + page);
    else
    window.location.replace("/spots/");
};