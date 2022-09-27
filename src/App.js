import BookList from './components/BookList';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import React,{useCallback, useState, useEffect} from "react";

import axios from "axios";

function App() {
  //state, props
  const[bookList,setBookList] = useState([]);
  const[textInput,setTextInput] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        
        const res = await axios.get(
          'http://localhost:3000/book/list'
        )
        console.log(res.data.result);
        
        setBookList(res.data.result);
      } catch (error) {
        console.log(error.message)
      }
    }
    getBooks()
  }, []);

  

  const onTextInputChange = useCallback((e) =>{
    setTextInput(e.target.value);
  },[]);

  const onAddBtnClick =   async () =>{
    let bookName = textInput;
    console.log(bookName);
    try {
      const res = await axios.post(
        'http://localhost:3000/book/add',
        {
          name:bookName
        }
      )
      setBookList([{id:res.data.result.insertId,name:bookName},...bookList]);
      setTextInput("");
      console.log(res.data.result.insertId)
    } catch (error) {
      console.log(error.message)
    }
  };


  const onDeleteBtnClick = async id  =>{
    try {
      await axios.delete(`http://localhost:3000/book/delete/${id}`)
      const newList = bookList.filter(book => book.id !== id)
      setBookList(newList)
    } catch (error) {
      console.log(error.message)
    }
  };

  const onUpdateBtnClick = async id_ud  =>{
    if(textInput!==""){
      let bookName = textInput;
      console.log(bookName);
      try {
        await axios.put(`http://localhost:3000/book/update/${id_ud}`,
        {
          name:bookName
        })
        const newList = bookList.filter(book => book.id !== id_ud);
        setBookList([{id:id_ud,name:bookName},...newList]);
        setTextInput("");
      } catch (error) {
        console.log(error.message)
      }
    }
    
  };
    
  return(
    <div>
      <h3>Danh sach sach</h3>
      <Textfield name = "add-book" placeholder="Them sach" elemAfterInput={
        <Button isDisabled={!textInput} appearance='primary' onClick={onAddBtnClick}>Them</Button>
      }
      css={{padding:"2px 4px 2px"}}
      value ={textInput}
      onChange={onTextInputChange}
      ></Textfield>
      <BookList bookList = {bookList} onDeleteBtnClick = {onDeleteBtnClick} onUpdateBtnClick= {onUpdateBtnClick}/>
    </div>
  );  
}

export default App;
