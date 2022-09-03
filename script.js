const fetchCategories = async() =>{
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories') ;
        const data = await res.json();
        return data.data.news_category;
    }
    catch(error){
        console.log(error);
        alert('Data not found');
    }
}

const showCategories= async () =>{
    const categories = document.getElementById('categories');
    const data = await fetchCategories();
    data.forEach(category => {
        const {category_id, category_name} =category;
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add("text-black", "p-2","text-gray-700", "hover:bg-indigo-50", "rounded-lg");
        categoryBtn.innerText = category_name;
        categoryBtn.addEventListener('click', function (){
            const  fetchedDetails = fetchDetails(category_id);
            showNews(fetchedDetails);
         });
        categories.appendChild(categoryBtn);
    })
}

const fetchDetails = async (id) => {
    try{
       const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`) ;
       const data = await res.json();
       return data.data;
   }
   catch(error){
       console.log(error);
       alert('Data not found');
   }
} 

const showNews = async (details) =>{
    const newsSec = document.getElementById('news-section');
    const detailNews = await details;
    detailNews.forEach(news => {
        console.log(news)
        const {title, details, total_view, thumbnail_url } = news;
    })
} 
showCategories();
