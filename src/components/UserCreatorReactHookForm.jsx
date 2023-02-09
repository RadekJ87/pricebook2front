import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import newUserValidationSchema from "../config/newUserValidationSchema";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import storage from "../config/firebase";
import axios from "axios";
import {styled} from "@mui/material/styles";
import {
    Badge,
    Box,
    Checkbox,
    Fab,
    FormControlLabel,
    Switch,
    Tooltip,
    Avatar,
    Typography,
    TextField
} from "@mui/material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BadgeInput, {SmallCameraIconBadge} from "./BadgeInput";
import ActionsBox from "./ActionsBox";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import {BigAvatar, DataBox, FormBox, ImageBox, WrapperBox} from "./UserCreator";


const ControlledInputs = styled(Box)(({theme, hasUserProfileImage}) => ({
    display: "flex",
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up('xs')]: {
        gap: "0px",
        '&>: not(style)': {
            fontSize: "13px",
            width: "80%",
            margin: "0 auto"
        },
        '& > * .Mui-error, .MuiFormLabel-root': {
            fontSize: "13px"
        },
        '& > * .MuiInput-input': {
            font: 'revert',
        }
    },
    [theme.breakpoints.up('sm')]: {
        '&>: not(style)': {
            fontSize: "14px",
        },
        '& > * .Mui-error, .MuiFormLabel-root': {
            fontSize: "14px"
        },
    },
    [theme.breakpoints.up('md')]: {
        '&>: not(style)': {
            fontSize: "13px",
            width: "80%"
        },
        '& > * .Mui-error, .MuiFormLabel-root': {
            fontSize: "14px"
        },
    },
    [theme.breakpoints.up('lg')]: {
        '&>: not(style)': {
            fontSize: "16px",
            marginLeft: hasUserProfileImage ? "10px" : "none",
            width: "70%"
        },
    },
}));


const StyledFormBox = styled(FormBox)(({theme}) => ({
    [theme.breakpoints.up('xs')]: {
        width: "90%",
        height: "55vh",
    },
    [theme.breakpoints.up('md')]: {
        width: "70%",
        height: "35vh",
    },
    [theme.breakpoints.up('lg')]: {
        width: "55%",
        height: "55vh",
    },
}));

const StyledImageBox = styled(ImageBox)(({theme}) => ({
    flex: 1,
    [theme.breakpoints.up('xs')]: {
        marginBottom: "10px",
    },
    [theme.breakpoints.up('sm')]: {
        marginBottom: "15px",
    },
    [theme.breakpoints.up('md')]: {
        marginBottom: "0px",
    },
}));


const UserCreator = ({onSuccessfulCreate}) => {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(newUserValidationSchema)
    });

    // TODO - z pewnością do napisania reducer
    const [userProfileImageURL, setUserProfileImageURL] = useState(null);
    const [hasUserProfileImage, setHasUserProfileImage] = useState(false);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);


    const handleAddImageFile = (image) => {
        if (image.size > 819200) {
            setError('Dopuszczalny rozmiar zdjęcia 800KB');
            return;
        }
        if (error) {
            setError(null);
        }
        setFile(image);
    }

    const handleUploadImage = (event) => {
        event.preventDefault();

        if (!file) {
            setError('Chyba zapomniałeś dodać obraz...')
            return;
        }

        const name = `${new Date().toISOString().replace('-', '_').split('T')[0].replace('-', '_')}_${file?.name}`;
        const storageRef = ref(storage, 'user-images/' + name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setIsUploading(true);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
                console.log('Upload is ' + progress + '% done');
                setProgress(Number(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Przesyłanie do Firebase jest wstrzymane');
                        break;
                    case 'running':
                        console.log('Przesyłanie do Firebase jest w toku');
                        break;
                }
            },
            (error) => {
                console.log('Error Firebase', error)
                setError('Błąd przy dodawaniu obrazu do Firebase')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setIsUploading(false);
                    setUserProfileImageURL(downloadURL);
                });
            }
        );

    }

    const handleCreateNewUser = async (data) => {
        const newUser = {...data, profilePic: userProfileImageURL, hasUserProfileImage};
        try {
            const res = await axios.post(`${process.env.REACT_APP_WEBSERVICE_URL}/auth/register`, newUser);
            onSuccessfulCreate();
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data);
        }
    }

    return (
        <StyledFormBox className="styled-form-box">
            <WrapperBox className="wrapper-box">
                {
                    hasUserProfileImage &&
                    <StyledImageBox className="styled-image-box">
                        <Box className="wrapper-image-box" sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "50%",
                        }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                badgeContent={<BadgeInput onChange={handleAddImageFile}
                                                          badgeComponent={<SmallCameraIconBadge/>}/>}
                            >
                                <BigAvatar alt="" src={file ? URL.createObjectURL(file) : ""}/>
                            </Badge>
                        </Box>
                    </StyledImageBox>}
                <DataBox className="data-box" sx={{flex: {md: 2}}}>
                    <ControlledInputs
                        className="inputs-box"
                        sx={{justifyContent: "space-evenly"}}>
                        <TextField className="usernameTest"
                                   required
                                   id="username"
                                   name="username"
                                   label="Nazwa użytkownika"
                                   variant="standard"
                                   fullWidth
                                   {...register('username')}
                                   error={errors.username ? true : false}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.username?.message}
                        </Typography>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            variant="standard"
                            {...register('email')}
                            error={errors.email ? true : false}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.email?.message}
                        </Typography>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Hasło"
                            type="password"
                            fullWidth
                            variant="standard"
                            {...register('password')}
                            error={errors.password ? true : false}
                        />
                        <Typography variant="standard" color="textSecondary" sx={{fontSize: "0.8rem"}}>
                            {errors.password?.message}
                        </Typography>
                        <Box className="switch-box">
                            <FormControlLabel
                                sx={{'& .MuiFormControlLabel-label': {fontSize: "0.8em"}}}
                                control={
                                    <Controller
                                        control={control}
                                        name="admin"
                                        defaultValue="false"
                                        inputRef={register()}
                                        render={({field: {onChange}}) => (
                                            <Switch onChange={e => onChange(e.target.checked)}/>
                                        )}/>}
                                label="Czy dodać uprawienienia administratora?"/>
                        </Box>
                        <Box className="image-upload-box" sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <FormControlLabel
                                sx={{'& .MuiFormControlLabel-label': {fontSize: "0.8em"}}}
                                control={
                                    <Checkbox disabled={isUploading} name="user-image" checked={hasUserProfileImage}
                                              onChange={e => setHasUserProfileImage((prev) => !prev)}/>
                                }
                                label="Czy użytkownik będzie miał zdjęcie?"
                            />
                            {hasUserProfileImage &&
                            isUploading ? (<CircularProgressWithLabel value={progress}/>) : (
                                <Tooltip
                                    title="Prześlij zdjęcie do Firebase, zalecana maksymalna rozdzielczość 256x256 pikseli">
                                    <Fab
                                        variant="extended"
                                        size="small"
                                        color="warning"
                                        sx={{
                                            display: hasUserProfileImage ? 'inline-flex' : 'none',
                                            fontSize: {xs: "0.7em", md: "0.8em", xl: "0.85em"},
                                            width: {xs: "40px", sm: "45px", lg: "47px"},
                                            height: {xs: "40px", sm: "45px", lg: "47px"},
                                        }}
                                        onClick={handleUploadImage}
                                    >
                                        <LocalFireDepartmentIcon sx={{fontSize: {xs: "2em"}}}/>
                                    </Fab>
                                </Tooltip>)}
                        </Box>
                    </ControlledInputs>
                </DataBox>
            </WrapperBox>
            <ActionsBox errorMessage={error} onCreate={handleSubmit(handleCreateNewUser)} isDisabled={isUploading}/>
        </StyledFormBox>
    );
};

export default UserCreator;