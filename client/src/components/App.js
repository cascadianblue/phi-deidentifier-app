import './App.css';
import { DeidentifiedNoteApi, ToolApi } from '../apis';
import { DeidentifyRequestFromJSON } from '../models';
import React from 'react';
import { Configuration } from '../runtime';
import { DeidentifiedText, deidentificationStates } from './DeidentifiedText';
import { DeidentificationConfigForm } from './DeidentificationConfigForm';
import { encodeString, decodeString } from '../stringSmuggler';
import { AppBar, Box, IconButton, Toolbar, Grid, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { InfoDialog } from './InfoDialog';
import Config from '../config';

const config = new Config()
const apiConfiguration = new Configuration({basePath: config.serverApiUrl()});
const deidentifiedNotesApi = new DeidentifiedNoteApi(apiConfiguration);
const toolApi = new ToolApi(apiConfiguration);

class App extends React.Component {
  constructor(props) {
    super(props);

    // Try loading state from URL
    const { location } = props;
    const queryInUrl = location.pathname.slice(1);
    let deidentifyRequest;
    let showInfo;
    if (queryInUrl) {
      deidentifyRequest = JSON.parse(decodeString(queryInUrl));
      showInfo = false;
    } else {
      deidentifyRequest = {
        deidentificationSteps: [{
          key: 0,
          confidenceThreshold: 20,
          maskingCharConfig: {maskingChar: "*"},
          annotationTypes: ["text_person_name", "text_physical_address", "text_date"]
        }],
        note: {
          text: "",
          noteType: "0000",  // FIXME: figure out whether and how to get this
          identifier: "0000",
          patientId: "0000"
        },
        keyMax: 0
      };
      showInfo = true;
    }

    this.state = {
      deidentifiedNoteText: deidentificationStates.EMPTY,
      deidentifyRequest: deidentifyRequest,
      showInfo: showInfo
    };

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
  }

  updateUrl = () => {
    const queryInUrl = "/" + encodeString(JSON.stringify(this.state.deidentifyRequest));
    this.props.history.push(queryInUrl);
  }

  deidentifyNote = () => {
    // Mark de-identified text as loading
    this.setState({deidentifiedNoteText: deidentificationStates.LOADING})

    // Build de-identification request
    let deidentifyRequest = new DeidentifyRequestFromJSON(this.state.deidentifyRequest);

    // Make de-identification request
    deidentifiedNotesApi.createDeidentifiedNotes({deidentifyRequest: deidentifyRequest})
      .then((deidentifyResponse) => {
        this.setState({
          deidentifiedNoteText: deidentifyResponse.deidentifiedNote.text
        });
      })
      .catch(() => {
        this.setState({
          deidentifiedNoteText: deidentificationStates.ERROR
        });
      });
  }

  replaceDeidentificationStep = (index, newStep) => {
    let deidentificationSteps = [...this.state.deidentifyRequest.deidentificationSteps];
    deidentificationSteps[index] = newStep;
    this.setState(
      {
        deidentifyRequest: {
          ...this.state.deidentifyRequest,
          deidentificationSteps: deidentificationSteps
        }
      },
      () => this.updateUrl()
    );
  }
  
  updateDeidentificationStep = (index, newSettings) => {
    const newStep = {
      ...this.state.deidentifyRequest.deidentificationSteps[index],
      ...newSettings
    };
    this.replaceDeidentificationStep(index, newStep);
  }

  handleTextAreaChange(event) {
    this.setState(
      {
        deidentifyRequest: {
          ...this.state.deidentifyRequest,
          note: {
            ...this.state.deidentifyRequest.note,
            text: event.target.value
          }
        }
      },
      () => this.updateUrl()
    );
  }

  addDeidStep = (event) => {
    let deidentificationSteps = [...this.state.deidentifyRequest.deidentificationSteps];
    const newDeidStep = {
      confidenceThreshold: 20,
      maskingCharConfig: {maskingChar: "*"},
      annotationTypes: ["text_person_name", "text_physical_address", "text_date"],
      key: this.state.deidentifyRequest.keyMax+1
    };
    deidentificationSteps.push(newDeidStep);
    this.setState(
      {
        deidentifyRequest: {
          ...this.state.deidentifyRequest,
          deidentificationSteps: deidentificationSteps,
          keyMax: this.state.deidentifyRequest.keyMax + 1
        }
      },
      () => this.updateUrl()
    );
  }

  redoDeidentificationStep = (index, oldKey, newKey, newValue) => {
    // Delete a key from a deid step, and add a new key, value pair to it
    let {[oldKey]: omitted, ...newDeidStep} = this.state.deidentifyRequest.deidentificationSteps[index];
    newDeidStep[newKey] = newValue;
    
    this.replaceDeidentificationStep(index, newDeidStep);
  }

  deleteDeidentificationStep = (index) => {
    let deidentificationSteps = [...this.state.deidentifyRequest.deidentificationSteps];
    deidentificationSteps.splice(index, 1);
    this.setState(
      {
        deidentifyRequest: {
          ...this.state.deidentifyRequest,
          deidentificationSteps: deidentificationSteps
        }
      },
      () => this.updateUrl()
    );
  }

  render() {
    return (
    <div className="App">
      <AppBar style={{ backgroundColor: "grey" }} position="static">
        <Toolbar>
          <Typography variant="h4" style={{ flex: 1 }} >NLP Sandbox PHI Deidentifier</Typography>
          <IconButton onClick={() => {this.setState({showInfo: true})}}><InfoIcon style={{ color: "white" }} /></IconButton>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid align="center" item xs={6}>
          <Box padding={2}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>Input note:</Typography>
          </Box>
          <textarea onChange={this.handleTextAreaChange} value={this.state.deidentifyRequest.note.text} />
          <br />
          <button className="deidentify-button" onClick={this.deidentifyNote}>De-identify Note</button>
          <br />
          {
            this.state.deidentifyRequest.deidentificationSteps.map((deidStep, index) => 
              <DeidentificationConfigForm
                deleteDeidStep={this.deleteDeidentificationStep}
                updateDeidStep={this.updateDeidentificationStep}
                redoDeidStep={this.redoDeidentificationStep}
                key={deidStep.key}
                index={index}
                {...deidStep}
              />
            )
          }
          <div className="deid-config-add" onClick={this.addDeidStep}>&#x002B;</div>
        </Grid>
        <Grid align="center" item xs={6}>
          <Box padding={2}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>Deidentified note:</Typography>
          </Box>
          <DeidentifiedText text={this.state.deidentifiedNoteText} />
        </Grid>
      </Grid>
      <InfoDialog
        open={this.state.showInfo}
        handleClose={() => {this.setState({showInfo: false})}}
        toolApi={toolApi}
      />
    </div>
    );
  }
}

export default App;
