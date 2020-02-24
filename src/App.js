import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  Button, Form, FormGroup, Label, Input, FormText, Card, CardImg, CardText, CardBody,
  CardTitle,
} from 'reactstrap';

function App() {
  const [newTodo, setNewTodo]=useState('');
  const [todoList, setNewTodoList]=useState([]);
  const [completeTodoList, setNewCompleteTodoList]=useState([]);

  useEffect(()=>{
    let dataTodoList = JSON.parse(localStorage.getItem('todoList'));
    let dataCompletedTodoList = JSON.parse(localStorage.getItem('completeTodoList'));
    if ( dataTodoList != null && dataTodoList.length > 0 ){
      setNewTodoList(dataTodoList);
    }
    if ( dataCompletedTodoList != null && dataCompletedTodoList.length > 0 ){
      setNewCompleteTodoList(dataCompletedTodoList);
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todoList', JSON.stringify(todoList) );
  },[todoList])

  useEffect(()=>{
    localStorage.setItem('completeTodoList', JSON.stringify(completeTodoList) );
  },[completeTodoList])

  const handleNewTodoEntry = ( event ) => {
    setNewTodo(event.target.value);
  }

  const addTodoListWrapper = () => {
    let tempList= [...todoList] ;
    let newList={
      name: newTodo,
      completed: false
    }
    tempList.push(newList);
    setNewTodoList([...tempList]);
    setNewTodo('');
  }

  const handleAddTodoList = () => {
    if( newTodo === '' ){
      alert('enter list name');

    } else {
      if ( todoList.length === 0 ){
        addTodoListWrapper();
      } else {
        let exist= false;
        for ( let i=0; i<todoList.length; i++ ){
          if( todoList[i].name === newTodo ){
            exist = true;
            alert('already exist');
          }
        }
        if ( !exist ){
          addTodoListWrapper();
        }
      } 
    }
  }

  const handleCompleteCheckbox = ( item ) => {
    let tempCompleteList = [...completeTodoList];
    let tempTodoList = [ ...todoList ];
    let changeData = {
      name:item.name,
      completed: true
    }
    tempCompleteList.push(changeData);
    for( let i=0; i< tempTodoList.length; i++ ){
      if ( tempTodoList[i].name === item.name )
      tempTodoList.splice(i,1);
    }
    setNewTodoList([...tempTodoList]);
    setNewCompleteTodoList([...tempCompleteList]);
  }

  const handleUncompleteCheckbox = ( item ) => {
    let tempCompleteList = [...completeTodoList];
    let tempTodoList = [ ...todoList ];
    let changeData = {
      name:item.name,
      completed: false
    }
    tempTodoList.push(changeData);
    
    for( let i=0; i< tempCompleteList.length; i++ ){
      if ( tempCompleteList[i].name === item.name )
      tempCompleteList.splice(i,1);
    }
    setNewTodoList([...tempTodoList]);
    setNewCompleteTodoList([...tempCompleteList]);
  }

  const handleAllCompletedList = () => {
    setNewCompleteTodoList([]);
  }

  return (
    <div className="App">
      <div className='TodoEntryBlock' >
        <h3>MMT TODO APP</h3>
        <div>
          <FormGroup>
            <Input type="text" name="todo" id="todo" value={newTodo} onChange={ (event)=>{ handleNewTodoEntry(event) } } placeholder="Enter Todo List name" />
          </FormGroup>
          <Button color="info" onClick={()=> handleAddTodoList() } >Submit</Button>
        </div>
      </div>
      <div className='TodoEntryBlock' >
        <h4>Todo List Below : </h4>
        <div>
          <h5>Pending list :</h5>
          {
            todoList.map( (item, index)=>{
              return(
                <div key={'todoList'+index} >
                   <Card className='CardBack'>
                    <CardBody>
                      <CardTitle>{item.name}</CardTitle>
                      <FormGroup check>
                      <Label check>
                        <Input type="checkbox" id={'checkbox'+index} checked={item.completed} onClick={()=>{ handleCompleteCheckbox(item) }} />
                        Mark As Complete
                      </Label>
                    </FormGroup>
                    </CardBody>
                  </Card>
                </div>
              )
            })
          }
          {
            completeTodoList && completeTodoList.length >0 && <h5>Completed list :</h5>
          }
          {
            completeTodoList.map( (item, index)=>{
              return(
                <div key={'todoList'+index} >
                   <Card className='CardBack'>
                    <CardBody>
                      <CardTitle>{item.name}</CardTitle>
                      <FormGroup check>
                      <Label check>
                        <Input type="checkbox" id={'checkbox2'+index} checked={item.completed}  onClick={()=>{ handleUncompleteCheckbox(item) }} />
                        Mark As Complete
                      </Label>
                    </FormGroup>
                    </CardBody>
                  </Card>
                </div>
              )
            })
          }
        </div>
          {
            completeTodoList && completeTodoList.length > 0 &&
            <Button color="info" onClick={()=> handleAllCompletedList() } >Delete completed</Button>
          }
      </div>
    </div>
  );
}

export default App;
