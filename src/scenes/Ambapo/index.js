// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createProject } from 'actions';
import { Button, FileDrop } from 'components';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import fileDownload from 'js-file-download';

type Props = {
  createProject: Function
};

class AmbapoPage extends Component<Props> {
  constructor(props) {
    super(props);
    const _this: any = this;
    _this.createProject = this.createProject.bind(this);
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({
      files
    });
    handleFileUpload(files);
  }

  createProject() {
    // this.props.createProject('');
  }

  render() {
    return (
      <div>
        <h1>Ambapo Page</h1>
        <section>
        <div className="dropzone">
          <Dropzone accept="text/csv" onDrop={this.onDrop.bind(this)}>
            <p>Drop file to convert here.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped file</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: bindActionCreators(createProject, dispatch)
  };
}

function handleFileUpload(files) {
  const file = files[0];
  const data = new FormData();

  data.append('ambapoFile', new Blob([file], { type: 'text/csv' }));
  data.append('typeOfConversion', 'latlongtoutm');

  axios.post('http://localhost:8080/Services/ambapo', data)
        .then(function (response) {
          fileDownload(response.data, 'report.csv');
        })
        .catch(function (error) {
          console.log(error);
        });
}



export default connect(mapStateToProps, mapDispatchToProps)(Radium(AmbapoPage));
