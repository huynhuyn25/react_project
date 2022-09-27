import React from 'react'
import Book from './Book'
export default function BookList({bookList,onDeleteBtnClick,onUpdateBtnClick}) {
  return (
    <div>
        {
          bookList.map((book) => (<Book key = {book.id} book ={book} onDeleteBtnClick = {onDeleteBtnClick} onUpdateBtnClick={onUpdateBtnClick}/>))}
    </div>
    
  );
}