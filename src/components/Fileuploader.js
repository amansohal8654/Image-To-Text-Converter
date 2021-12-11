import React from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Divider, LinearProgress } from '@material-ui/core'
import {useDropzone} from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import {makeStyles} from '@material-ui/core/Styles'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CropImage from './CropImage';
import TesseractText from '../tesseract/TesseractText';
import GeneratingPDF from '../tesseract/GenratingPdf'

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
            const imageData = await TesseractText(setPercents, file);
            GeneratingPDF(imageData.data.text, file.name.split(".")[0]);
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
        console.log(acceptedFiles);
        setUploadFile(fileDropped);
    })

    const {getRootProps, getInputProps} = useDropzone({multiple: false, onDrop})
    
    const {ref, ...rootProps} = getRootProps();

    const onCropSave=({file, preview})=>{
        console.log(file, preview);
        setPreview(preview);
        setUploadFile(file);
        setSuccess(false); 
    }

    return (
        <div>
            <Container maxWidth="md">
                <Paper elevation={4}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography align="center" style={{padding:16}}>
                                <h3>File Upload</h3>
                            </Typography>
                            <Divider/>
                        </Grid>
                        <Grid item xs={6} style={{padding:16}}>
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
                        </Grid>
                        <Grid item xs={6} style={{padding:16}}>
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
                                        {success ? <CheckIcon /> : <CloudUpload />}
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
            
            <CropImage
                onSave={onCropSave}
                selectedFile={selectedImageFile}
            />
     </div>
    )
}

export default Fileuploader
