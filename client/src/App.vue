<template>
  <div class="container">
    <h2 style="georgia" class="text-center mt-5"> <span class="ref">Todo List</span></h2>


    <div class="topnav" style="background-color:lightblue">
       <a class="navbar-brand" color="green" href="#">Add new task</a>
  <div class="search-container">
    
    <input v-model="currTodo" type="text" style="georgia" >
  
     <button @click="addTodo"><i class="fa fa-plus" aria-hidden="true" color="green"></i></button>
    
  </div>
</div>
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Your todos</th>
          <th scope="col">Edit todo</th>
          <th scope="col"  class="text-center">Delete todo</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(currTodo, index) in todos" :key="index">
          <td>
            <span :class="{'finished': currTodo.status === 'Finished'}">{{currTodo.name}}</span>
            </td>
         
          <td>
            <div class="text-center" @click="editTodo(index)">
              <i class="fas fa-user-edit"></i>
            </div>
          </td>
          <td>
            <div class="text-center" @click="removeTodo(index)">
            <i class="far fa-trash-alt"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    msg: String
  },
  data() {
    return {
      currTodo: '',
      todos: [],
      check:null
    }
  },
  mounted(){
      fetch('http://localhost:8081/')
      .then(response => response.json())
      .then(data => {
        this.todos = data;
      });
    },
  methods: {
    addTodo(){
      if(this.currTodo.length === 0) return;
      if(this.check === null){
        this.todos.push({
        name: this.currTodo,
      })
      fetch('http://localhost:8081/addTodo', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
           name: this.currTodo
        })
      })
      } else {
        this.todos[this.check].name = this.currTodo;
        console.log( 'index , currTodo' , this.check, this.currTodo)
        
        fetch('http://localhost:8081/editTodo', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            index: this.check,
            name: this.currTodo
          })
        });
        this.check = null;
      }
      
      this.currTodo = '';      
    },
    removeTodo(index){
      this.todos.splice(index, 1);
      
      fetch('http://localhost:8081/removeTodo', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          index: index
        })
      });
    },
    editTodo(index){
      this.currTodo = this.todos[index].name;
      this.check = index;
    },
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer {
  cursor:progress;
}
.finished {
  text-decoration:lawngreen;
}
#cont button {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50; /* Green */
}
table {
  width: 100%;
}

th {
  height: 70px;
}
tr:nth-child(even) {background-color: #f2f2f2;}
* {box-sizing: border-box;}

/* Style the navbar */
.topnav {
  overflow: hidden;
  background-color: #e9e9e9;
}

/* Navbar links */
.topnav a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Navbar links on mouse-over */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Active/current link */
.topnav a.active {
  background-color: #2196F3;
  color: white;
}

/* Style the input container */
.topnav .search-container {
  float: right;
}

/* Style the input field inside the navbar */
.topnav input[type=text] {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: none;
}

/* Style the button inside the input container */
.topnav .search-container button {
  float: right;
  padding: 6px;
  margin-top: 8px;
  margin-right: 16px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
}

.topnav .search-container button:hover {
  background: #ccc;
}

/* Add responsiveness - On small screens, display the navbar vertically instead of horizontally */
@media screen and (max-width: 600px) {
  .topnav .search-container {
    float: none;
  }
  .topnav a, .topnav input[type=text], .topnav .search-container button {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type=text] {
    border: 1px solid #ccc;
  }
}
ref::before {
  font-weight: bold;
  color: navy;
  content: "Reference ";
}
h2 {
margin: 1em 0 0.5em 0;
	font-weight: normal;
	position: relative;
	text-shadow: 0 -1px rgba(0,0,0,0.6);
	font-size: 28px;
	line-height: 40px;
	background: #355681;
	background: rgba(53,86,129, 0.8);
	border: 1px solid #fff;
	padding: 5px 15px;
	color: white;
	border-radius: 0 10px 0 10px;
	box-shadow: inset 0 0 5px rgba(53,86,129, 0.5);
	font-family: 'Muli', sans-serif;
}
</style>