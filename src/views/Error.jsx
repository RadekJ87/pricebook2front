import {Link, useRouteError} from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Container sx={{display: 'flex', justifyContent: 'center'}} maxWidth="xxl">
            <Box className='test' sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                maxWidth: "920px",
                width: "100%",
                lineHeight: 1.4,
                textAlign: "center",
                paddingLeft: "15px",
                paddingRight: "15px",
            }}>
                <Box sx={{
                    position: "absolute",
                    height: "100px",
                    top: "45%",
                    transform: `translateY(-50%)`,
                    zIndex: "-1",
                }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontFamily: 'Maven Pro',
                            color: "#ececec",
                            fontWeight: 900,
                            fontSize: {xs: "180px", md: "276px"},
                            margin: "0px",
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: `translate(-50%, -50%)`
                        }}
                    >404</Typography>
                </Box>
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                        fontFamily: 'Maven Pro',
                        fontSize: {xs: "24px", md: "46px"},
                        color: "#000",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        margin: "0px",
                    }}
                >Przepraszamy, nie znaleziono strony!</Typography>
                <Typography
                    variant="p"
                    component="p"
                    sx={{
                        fontFamily: 'Maven Pro',
                        fontSize: {xs: "12px", md: "16px"},
                        color: "#000",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        marginTop: "15px",
                    }}
                >Strona której szukasz mogła zostać usunięta, zmieniła nazwę lub jest tymczasowo
                    niedostępna</Typography>
                <Typography
                    variant="a"
                    component={Link}
                    to={`/`}
                    sx={{
                        fontFamily: 'Maven Pro',
                        fontSize: {xs: "10px", md: "14px"},
                        color: "#fff",
                        fontWeight: 400,
                        textDecoration: "none",
                        textTransform: "uppercase",
                        backgroundColor: "#189cf0",
                        display: "inlane-block",
                        padding: {xs: "8px 30px", md: "16px 38px"},
                        border: "2px solid transparent",
                        borderRadius: "40px",
                        transition: "0.2s all"
                    }}
                >Powrót do strony głównej</Typography>
            </Box>
        </Container>
    )
}

export default ErrorPage;