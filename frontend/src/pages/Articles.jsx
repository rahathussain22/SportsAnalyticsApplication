import React from 'react'
import AllArticles from '../components/AllArticles'
import articlesData from '../data/articlesData'
import '../assets/styles/Articles.css'


const Articles = () => {
const handleNewArticle = () => {
console.log('Create new article')
}


const handleEdit = (id) => {
console.log('Edit article:', id)
}


return (
<div className="articles-container">
<div className="header">
<h1 className="main-title">Articles</h1>
<button className="new-article-button" onClick={handleNewArticle}>
<span className="plus-icon">+</span>
New Article
</button>
</div>


<AllArticles articles={articlesData} onEdit={handleEdit} />
</div>
)
}


export default Articles