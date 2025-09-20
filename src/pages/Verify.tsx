import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Link from "@mui/material/Link";

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

const OTPInput = styled("input")(({ theme }) => ({
  width: 71,
  height: 61,
  fontSize: 18,
  fontWeight: 500,
  textAlign: "center",
  border: "none",
  borderRadius: 8,
  outline: "none",
  backgroundColor: "#E4F2FF",
  "&:focus": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
  },
  "&:disabled": {
    backgroundColor: "E4F2FF",
    color: theme.palette.text.disabled,
  },
}));

export default function Verify() {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>
      <CssBaseline />
      <BackgroundContainer>
        <ContentContainer>
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
              Verifica tu correo
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, selfAlign: "start" }}
            >
              Ingresa el código que fue enviado a tu correo
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              {otp.map((digit, index) => (
                <OTPInput
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </Box>
            <Box sx={{ alignSelf: "center", textAlign: "center" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0, selfAlign: "center", opacity: 0.75 }}
              >
                Enviamos un código de verificación a
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, selfAlign: "center", opacity: 0.75 }}
              >
                {" "}
                <strong>test@test.com</strong>
              </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ height: 42 }}
            >
              VERIFICAR
            </Button>
            <Link variant="body2" sx={{ alignSelf: "start" }}>
              Reenviar
            </Link>
          </Box>
        </ContentContainer>
      </BackgroundContainer>
    </>
  );
}
