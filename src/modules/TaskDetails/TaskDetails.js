import React from 'react';
import FileViewer from 'react-file-viewer';
import {CustomErrorComponent} from 'custom-error';
import TextField from '@material-ui/core/TextField';
import './TaskDetails.css';
import CardContent from "@material-ui/core/CardContent/CardContent";
import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card/Card";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));





export default function TaskDetails(props) {
  const classes = useStyles();

  console.log('task details state **************', props.task.fileUrl);
  const file = '' + props.task.fileUrl;
  const type = file.split('.').pop();
  console.log('type ************************', type);

  function FilePreview() {
    return (
      <FileViewer
        fileType={type}
        filePath={file}
        errorComponent={CustomErrorComponent}
        onError={onError}/>
    );
  }

  function onError(e) {
    console.log(e, 'error in file-viewer');
  }

  return (<div className={'details'}>
      <Card className={'card'}>
        <CardContent className={'cardContent'}>
          <div className={'cardDetails'}>
            <h1>
              Task Details:
            </h1>
            <h2>
              Title:
            </h2>
            <p>
              {props.task.title}
            </p>
            <h2>
              Description:
            </h2>
            <p>
              {props.task.description}
            </p>
            <h2>
              Status:
            </h2>
            <p>
              {props.task.completed ? "Completed" : "Processing"}
            </p>
            <form className={classes.container} noValidate>
              <TextField
                id="date"
                label="Estimated end date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>

          <div className={'preview'}>
            <h2>
              Preview
            </h2>
            <a href={props.task.fileUrl}>Download File</a>
            <div className="filePreview">

              <FilePreview
                fileType={type}
                filePath={props.task.fileUrl}
                errorComponent={CustomErrorComponent}
                onError={onError}/>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

  );
}

