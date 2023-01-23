import React from 'react';
import {Badge, Box, FormControlLabel, Input, Switch} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/material/styles";
import BadgeInput, {SmallCameraIconBadge} from "./BadgeInput";
import ActionsBox from "./ActionsBox";

// test
const avatar = "https://randomuser.me/api/portraits/men/75.jpg";
// const avatar = "https://picsum.photos/id/237/200/300";
const badge = "https://randomuser.me/api/portraits/thumb/men/76.jpg";


const BigAvatar = styled(Avatar)(({theme}) => ({
    width: 200,
    height: 200,
    backgroundSize: "cover",
    boxShadow: "4px 6px 15px 5px rgba(110,110,110,0.8)",
}));

const FormBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "10px",
    width: "55%",  //te dwa do skalowania
    height: "500px",
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

const WrapperBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    height: "85%",
}));

const ImageBox = styled(Box)(({theme}) => ({
    display: "flex",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
}));

const DataBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "left",
    flex: 3,
}));

const Inputs = styled(Box)(({theme}) => ({
    display: "flex",
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    gap: "24px",
    '&>: not(style)': {
        marginLeft: "10px",
        width: "70%"

    }
}));


const UserCreator = () => {
    return (
        <FormBox>
            <WrapperBox>
                <ImageBox>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "50%",
                    }}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            badgeContent={<BadgeInput badgeComponent={<SmallCameraIconBadge/>}/>}
                        >
                            <BigAvatar alt="" src={avatar}/>
                        </Badge>
                    </Box>
                </ImageBox>
                <DataBox>
                    <Inputs>
                        <Input name="username" placeholder="Nazwa użytkownika"/>
                        <Input name="email" placeholder="Adres email"/>
                        <Input name="password" placeholder="Hasło"/>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch checked={true} onChange={() => console.log('switch')} name="admin"/>
                                }
                                label="Czy dodać uprawienienia administratora?"
                            />
                        </Box>
                    </Inputs>
                </DataBox>
            </WrapperBox>
            <ActionsBox/>
        </FormBox>
    );
};

export default UserCreator;