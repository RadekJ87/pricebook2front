import React, {useState} from 'react';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import storage from "../config/firebase";
import axios from "axios";
import {styled} from "@mui/material/styles";
import {Badge, Box, Checkbox, Fab, FormControlLabel, Input, Switch, Tooltip, Avatar} from "@mui/material";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BadgeInput, {SmallCameraIconBadge} from "./BadgeInput";
import ActionsBox from "./ActionsBox";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

// test
// const avatar = "https://randomuser.me/api/portraits/men/75.jpg";
// const avatar = "https://picsum.photos/id/237/200/300";
// const badge = "https://randomuser.me/api/portraits/thumb/men/76.jpg";


export const BigAvatar = styled(Avatar)(({theme}) => ({
    backgroundSize: "cover",
    boxShadow: "4px 6px 15px 5px rgba(110,110,110,0.8)",
    [theme.breakpoints.up('xs')]: {
        width: 100,
        height: 100,
    },
    [theme.breakpoints.up('sm')]: {
        width: 135,
        height: 135,
    },
    [theme.breakpoints.up('md')]: {
        width: 155,
        height: 155,
    },
    [theme.breakpoints.up('lg')]: {
        width: 200,
        height: 200,
    },
}));

export const FormBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "rgba(7, 7, 12, 0.05)",
    border: "1px solid #cccccc",
    boxShadow: "2px 3px 10px 0px rgba(161,161,161,0.7)",
    transition: "all ease 0.2s",
    borderRadius: "5px",
    '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0px 10px 20px rgba(161,161,161,0.7)',
    }
}));

export const WrapperBox = styled(Box)(({theme}) => ({
    display: "flex",
    height: "85%",
    [theme.breakpoints.up('xs')]: {
        flexDirection: "column",
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: "row",
    },
}));

export const ImageBox = styled(Box)(({theme}) => ({
    display: "flex",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
}));

export const DataBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    flex: 3,
}));

export const Inputs = styled(Box)(({theme, hasUserProfileImage}) => ({
    display: "flex",
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up('xs')]: {
        gap: "16px",
        '&>: not(style)': {
            fontSize: "13px",
            width: "80%",
            margin: "0 auto"
        },
    },
    [theme.breakpoints.up('sm')]: {
        gap: "21px",
        '&>: not(style)': {
            fontSize: "16px",
        },
    },
    [theme.breakpoints.up('md')]: {
        gap: "18px",
        '&>: not(style)': {
            fontSize: "14px",
            width: "80%"
        },
    },
    [theme.breakpoints.up('lg')]: {
        gap: "22px",
        '&>: not(style)': {
            fontSize: "16px",
            marginLeft: hasUserProfileImage ? "10px" : "none",
            width: "70%"
        },
    },
}));


const UserCreator = ({onSuccessfulCreate}) => {

    //reducer koniecznie
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        admin: false,
        profilePic: ""
    });
    const [hasUserProfileImage, setHasUserProfileImage] = useState(false);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // console.log({
    //     "newUser": newUser,
    //     "hasUserProfileImage": hasUserProfileImage,
    //     "file": file,
    //     "progress": progress,
    //     "error": error,
    //     "isUploading": isUploading
    // })


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

    const handleUploadImage = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Chyba zapomniałeś dodać obraz...')
            return;
        }

        const name = `${new Date().toISOString().replace('-', '_').split('T')[0].replace('-', '_')}_${file?.name}`;
        // const storageRef = ref(storage, 'user-images/' + name);
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
                    setNewUser({
                        ...newUser,
                        ['profilePic']: downloadURL,
                    });
                });
            }
        );

    }

    const handleInputChange = (event) => {
        const isSwitchEvent = event.target.name === 'admin' ? true : false;
        const key = event.target.name;
        const value = isSwitchEvent ? !newUser.admin : event.target.value;

        setNewUser({
            ...newUser,
            [key]: value,
        });
    }

    const handleCreateNewUser = async (event) => {
        try {
            const res = await axios.post(`/auth/register`, newUser);
            console.log(res);
            onSuccessfulCreate();
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data);
        }
    }

    return (
        <FormBox className="form-box" sx={{
            width: {xs: "90%", md: "70%", lg: "55%"}, // wrapper do dodawania
            height: {xs: "55vh", md: "35vh", lg: "55vh"},
        }}>
            <WrapperBox className="wrapper-box">
                {hasUserProfileImage && <ImageBox className="image-box">
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
                </ImageBox>}

                <DataBox className="data-box">
                    <Inputs className="inputs-box">
                        <Input value={newUser.username} name="username" placeholder="Nazwa użytkownika" onChange={handleInputChange}/>
                        <Input value={newUser.email} name="email" placeholder="Adres email" onChange={handleInputChange}/>
                        <Input value={newUser.password} name="password" placeholder="Hasło" onChange={handleInputChange}/>
                        <Box className="switch-box">
                            <FormControlLabel
                                sx={{'& .MuiFormControlLabel-label': {fontSize: "0.8em"}}}
                                control={
                                    <Switch name="admin" checked={newUser.admin} onChange={handleInputChange}/>
                                }
                                label="Czy dodać uprawienienia administratora?"
                            />
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
                                        // disabled={isUploading}
                                        variant="extended"
                                        size="small"
                                        color="warning"
                                        sx={{
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
                    </Inputs>
                </DataBox>
            </WrapperBox>
            <ActionsBox errorMessage={error} onCreate={handleCreateNewUser} isDisabled={isUploading}/>
        </FormBox>
    );
};

export default UserCreator;