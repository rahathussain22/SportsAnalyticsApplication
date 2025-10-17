import React, { useState } from 'react'
import '../assets/styles/AllArticles.css'
// const handlePageChange = (page) => {
//     const p = Math.max(1, Math.min(totalPages, page))
//     setCurrentPage(p)
// }
const AllArticles = ({ articles, onEdit }) => {
    const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const handlePageChange = (page) => {
    const p = Math.max(1, Math.min(totalPages, page))
    setCurrentPage(p)
  }


return (
    <div className="all-articles">
        <h2 className="section-title">All Articles</h2>


        <table className="articles-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article) => (
                    <tr key={article.id}>
                        <td className="title-cell">{article.title}</td>
                        <td>
                            <span className={`status-badge ${article.status.toLowerCase()}`}>
                                {article.status}
                            </span>
                        </td>
                        <td className="author-cell">{article.author}</td>
                        <td className="date-cell">{article.date}</td>
                        <td>
                            <button className="edit-button" onClick={() => onEdit(article.id)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>


        <div className="pagination">
            <button className="page-nav" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
            </button>


            <button className={`page-number ${currentPage === 1 ? 'active' : ''}`} onClick={() => handlePageChange(1)}>1</button>
            <button className={`page-number ${currentPage === 2 ? 'active' : ''}`} onClick={() => handlePageChange(2)}>2</button>
            <button className={`page-number ${currentPage === 3 ? 'active' : ''}`} onClick={() => handlePageChange(3)}>3</button>


<span className="page-ellipsis">...</span>


<button className={`page-number ${currentPage === totalPages ? 'active' : ''}`} onClick={() => handlePageChange(totalPages)}>{totalPages}</button>


<button className="page-nav" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
&gt;
</button>
</div>
</div>
)
}


export default AllArticles