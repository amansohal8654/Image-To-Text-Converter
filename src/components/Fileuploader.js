import React from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Divider, LinearProgress } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import {useDropzone} from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import {makeStyles} from '@material-ui/core/Styles'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import CropImage from './CropImage';
import TesseractText from '../tesseract/TesseractText';
import GeneratingPDF from '../tesseract/GenratingPdf'
import FileTypeSelector from './FileTypeSelector'
import Snackbar from './Snackbar'
import {arrayToExcel} from '../tesseract/ArrayToExcel'
import '../index.css';

const useStyles = makeStyles((theme) => ({
    dropzoneContainer:{
        height:300,
        background:'#efefef',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderColor: '#aaa'
    },
    preview:{
        width: 300,
        height: 300,
        margin: 'auto',
        display: "block",
        marginBottom: theme.spacing(2),
        objectFit: "contain"
    },
}));

function Fileuploader() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [file, setUploadFile] = React.useState();
    const [preview, setPreview] = React.useState();
    const [percents, setPercents] = React.useState(0);
    const [selectedImageFile, setSelectedImageFile] = React.useState();
    const [text, setText] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [imageData, setImageData] = React.useState();
    const [fileType, setFileType] = React.useState("PDF");

    const handleSnackbar = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const handleFileType = (e) => {
        setFileType(e.target.value);
    }

    const handleFileDownload = () => {
        if(fileType === 'PDF'){
            GeneratingPDF(imageData.data.text, file.name.split(".")[0]);
        }
        if(fileType === 'EXCEL'){
            arrayToExcel.convertArrayToTable(imageData.data.lines, file.name.split(".")[0])
        }
    }

    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };

      const handleExtractDataFromFile = async () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            const data = await TesseractText(setPercents, file);
            setText(data.data.text);
            setImageData(data);
            //imageData.data.lines.map(m => console.log(m.words));
            setSuccess(true);
            setLoading(false);
        }
      };

    const classes = useStyles();
    const onDrop = React.useCallback(acceptedFiles => {
        const fileDropped = acceptedFiles[0]
        if(fileDropped['type'].split('/')[0] === 'image'){
            setSelectedImageFile(fileDropped)
            return;
        }
        handleSnackbar();
    })

    const {getRootProps, getInputProps} = useDropzone({multiple: false, onDrop})
    
    const {ref, ...rootProps} = getRootProps();

    const onCropSave=({file, preview})=>{
        setPreview(preview);
        setUploadFile(file);
        setSuccess(false); 
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '100%'}}>
            <Container maxWidth="md">
                <Paper elevation={4}>
                    <Grid container className="mainLayout" style = {{}}>
                        <Grid item xs={12}>
                            <Typography align="center" style={{padding:16}}>
                                <h3>File Upload</h3>
                            </Typography>
                            <Divider/>
                        </Grid>
                        <Grid item className="dragAndDrop" xs={12} sm={12} md={6} style={{padding:16}}>
                            <RootRef rootRef={ref}>
                                <Paper 
                                {...rootProps}
                                elevation={0}
                                className={classes.dropzoneContainer}
                                >
                                    <input {...getInputProps()}/>
                                    <p>Drag 'n' drop some file here, or click to select a file</p>
                                </Paper>
                            </RootRef>
                            <Divider />
                            {imageData && <Grid container style={{paddingTop: '20px'}}>
                                <Grid xs={8}>
                                    <FileTypeSelector handleFileType = {handleFileType}/>
                                </Grid>
                                <Grid xs={2} style={{paddingLeft:"10px"}}>
                                    <Button variant="contained" onClick={() => handleFileDownload()}>Download</Button>
                                </Grid>
                            </Grid>}
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} style={{padding:16}}>
                            <Typography>
                                Preview
                            </Typography>
                            
                            <img 
                                alt="Preview"
                                onLoad={() => URL.revokeObjectURL(preview)}
                                className={classes.preview}
                                src={preview || "https://via.placeholder.com/250"}
                            />
                            <Divider />
                            {file && <Grid container style={{marginTop:16}} alignItems="center">
                                <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ m: 1, position: 'relative' }}>
                                        <Fab
                                        aria-label="save"
                                        color="primary"
                                        style={buttonSx}
                                        disabled = {loading}
                                        onClick={handleExtractDataFromFile}
                                        >
                                        {success ? <CheckIcon /> : <CompareArrowsIcon />}
                                        </Fab>
                                        {loading && (
                                        <CircularProgress
                                            size={68}
                                            style={{
                                            color: green[500],
                                            position: 'absolute',
                                            top: -6,
                                            left: -6,
                                            zIndex: 1,
                                            }}
                                        />
                                        )}
                                    </Box>
                                </Grid>

                                <Grid item xs={10}>
                                    {file && <Typography variant="body"  style={{display: 'flex', justifyContent:"flex-start",marginLeft: "20px"}}>
                                        {file.name}
                                    </Typography>}
                                    <LinearProgress variant="determinate" value={percents} />
                                    <div>
                                        <Typography variant="body">{percents}%</Typography>
                                    </div>
                                </Grid>
                            </Grid>}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Container maxWidth="md">
                <Box
                    style={{
                        paddingTop: "20px",
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                        m: 1,
                        width: "100%",
                        height: 400,
                        },
                    }}
                    >
                    <Paper elevation={3}>
                    <Typography variant="h5" gutterBottom>
                       <div  style={{padding: "20px"}}>{text}</div> 
                    </Typography>
                    </Paper>
                </Box>
            </Container>
            <CropImage
                onSave={onCropSave}
                selectedFile={selectedImageFile}
            />
            <Snackbar 
            snackbarState = {open}
            handleClose = {handleClose}
            />
     </div>
    )
}

export default Fileuploader
