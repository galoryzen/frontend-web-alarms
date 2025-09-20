import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";

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

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/verify");
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
              Iniciar sesión
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, selfAlign: "start" }}
            >
              Empieza de manera gratuita
            </Typography>{" "}
            <FormControl>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                fullWidth
                variant="outlined"
                label="Email"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
              sx={{
                flexDirection: "row-reverse",
                justifyContent: "left",
                marginLeft: 0,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ height: 42 }}
            >
              INICIAR SESIÓN
            </Button>
            <Link
              component={RouterLink}
              to="/signup"
              variant="body2"
              sx={{ alignSelf: "start" }}
            >
              ¿No tienes una cuenta? Regístrate
            </Link>
          </Box>
        </ContentContainer>
      </BackgroundContainer>
    </>
  );
}
