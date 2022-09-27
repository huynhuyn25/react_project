import React from 'react'
import Button from '@atlaskit/button';
import styled  from 'styled-components';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle'
import EditorEditIcon from '@atlaskit/icon/glyph/editor/edit'
const ButtonStyled = styled(Button)`
    margin-top: 5px;
    text-align: left;

    &:hover{
        .icon {
            display:inline-block;
        }
    }
    
    .icon {
        display:none;
    }
   
    &:hover{
        background-color: #e2e2e2;
        border-radius: 3px;
    }

`;
export default function Book({book,onDeleteBtnClick,onUpdateBtnClick} ) {
  return<ButtonStyled 
    shouldFitContainer  
    iconAfter={
         (
        <div className='icon'>
            <span className='edit-icon' onClick={()=> onUpdateBtnClick(book.id)}>
                <EditorEditIcon primaryColor='#161414' />
            </span>
            
            <span className='check-icon' onClick={()=> onDeleteBtnClick(book.id)}>
                <CrossCircleIcon primaryColor='#ff0000'/>
            </span>
        </div>
        )}
    >{book.name}</ButtonStyled>;
}
