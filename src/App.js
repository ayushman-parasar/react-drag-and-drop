import React from 'react';

import './App.css';

class App extends React.Component{
  state = {
   tasks: [{name:"Learn Angular",category:"wip", bgcolor: "yellow"},
            {name:"React", category:"wip", bgcolor:"pink"},
            {name:"Vue", category:"complete", bgcolor:"skyblue"}]
  }
  
  onDragOver = (event)=>{
    event.preventDefault()
  }         
  onDrop =(event, category) =>{
    let id = event.dataTransfer.getData('id')
    let tasks = this.state.tasks.filter((task)=>{
      if(task.name == id){
        task.category = category
      }
      return task
    })
    this.setState({
      ...this.state,
    })
  }
  onDragStart = (event,name) =>{
    console.log("name dragStart", name)
    event.dataTransfer.setData("id",name)
  }
  render(){
    var tasks = {
      wip: [],
      complete: []
  }

  this.state.tasks.forEach ((t) => {
      tasks[t.category].push(
          <div key={t.name}
              onDragStart={(e)=>this.onDragStart(e, t.name)} //sending name as an unique value to idetify it .
              draggable
              className="draggable"
              style = {{backgroundColor: t.bgcolor,padding:"20px"}}>
              {t.name}
          </div>
      );
  });
    return(
      <>
      <h2>Drag and Drop</h2>
      <div className="container-drag" style={{display:"flex"}}>
        <div className="wip" 
          onDrop={(e)=>this.onDrop(e, "wip")}
          style={{marginRight:"10px"}}>
          <span>WIP</span>
          {tasks.wip}
        </div>
        <div className="droppable"
             onDragOver={(e)=>this.onDragOver(e)}
             onDrop={(e)=>this.onDrop(e, 'complete')}>
            <span>COMPLETED</span>
            {tasks.complete}
        </div>
      </div>
      </>
    )
  }
}

export default App;
