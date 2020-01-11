import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './TaskList.css';
import TaskDetails from "../TaskDetails/TaskDetails";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      tasks: [],
      task: {}
    };


    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.dir(e.target.offsetParent.id);
    if (e.target.offsetParent.id === 'backBtn') {
      window.open("/task-board/","_self")
    }
    let url = `http://my-json-server.typicode.com/anvictor/fakeJson/tasks/${e.target.offsetParent.id}`;
    console.log('url *************************', url);
    fetch(url)
      .then(response => response.json())
      .then(task => {
          console.log('handleClick task *******************', task);
          this.setState({
            task: task
          })
        }
      );
  }

  componentDidMount() {
    let localTasks = [];
    fetch('http://my-json-server.typicode.com/anvictor/fakeJson/tasks')
      .then(response => response.json())
      .then(tasks => {
          this.setState({data: tasks});
          localTasks = tasks.filter(task => task.userId === this.props.contact.id);
          console.log('localTasks ****************', localTasks);
          this.setState({
            tasks: localTasks,
            task: localTasks[0]
          });
        }
      );
  }

  render() {
    console.log('Task lists ******************* this.props', this.props);
    return <div className="TaskList">
      <Card className={'card'}>
        <CardMedia
          className="imgClass"
          component="img"
          alt={this.props.contact.name}
          height="140"
          image={this.props.contact.photo}
          title={`Tasks for ${this.props.contact.name}:`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`Tasks for ${this.props.contact.name}:`}
          </Typography>
          <ul>
            {this.state.tasks.map(task => <li key={task.id}>
              <Button size="small" color="primary"
                      onClick={this.handleClick} id={task.id}>
                {task.title}
              </Button>
            </li>)}
            <Button size="small" color="primary"
                    onClick={this.handleClick} id="backBtn">
              BACK To START
            </Button>
          </ul>
        </CardContent>
      </Card>
      <TaskDetails
        task={this.state.task}
      />
    </div>
  }
}

export default TaskList;
