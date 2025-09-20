import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const BackgroundContainer = styled(Box)(() => ({
  minHeight: "100vh",
  backgroundImage: "url(/texture.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 1,
  },
}));

const ContentContainer = styled(Container)(() => ({
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "600px !important",
}));

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <BackgroundContainer>
        <ContentContainer>
          <Box
            component="img"
            src="/logo.png"
            alt="Alivio"
            sx={{
              height: 200,
              mb: 4,
              objectFit: "contain",
            }}
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography component="h3" variant="h5" sx={{ mb: -2 }}>
              Registrate
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, selfAlign: "start" }}
            >
              Empieza gratis
            </Typography>{" "}
            <TextField label="Nombre" variant="outlined" />
            <TextField label="Correo electrónico" variant="outlined" />
            <TextField label="Teléfono" variant="outlined" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ height: 42 }}
            >
              CREAR CUENTA
            </Button>
          </Box>
        </ContentContainer>
      </BackgroundContainer>
    </>
  );
}
